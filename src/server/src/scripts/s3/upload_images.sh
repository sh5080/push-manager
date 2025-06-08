#!/bin/bash

# CloudFront Distribution ID
CLOUDFRONT_DISTRIBUTION_ID=""
S3_BASE_PATH=""
S3_BASE_URL_FOR_INVALIDATION=""
AWS_PROFILE_NAME=""

echo "--- AWS S3 업로드 및 CloudFront 무효화 자동화 스크립트 ---"

# 1. 로컬 이미지 디렉토리 선택
DEFAULT_IMAGES_DIR="images"
LOCAL_SOURCE_DIR=""
IMAGE_EXTENSIONS=("jpg" "jpeg" "png" "gif" "webp" "mp4") # 확장자 목록

# 현재 스크립트가 있는 디렉토리
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
DEFAULT_IMAGES_PATH="${SCRIPT_DIR}/${DEFAULT_IMAGES_DIR}"

# 기본 images 디렉토리 확인
if [ -d "$DEFAULT_IMAGES_PATH" ]; then
    echo "기본 'images' 디렉토리 (${DEFAULT_IMAGES_PATH})를 확인합니다..."
    FOUND_IMAGES=0
    for ext in "${IMAGE_EXTENSIONS[@]}"; do
        if compgen -G "${DEFAULT_IMAGES_PATH}/*.${ext}" > /dev/null; then
            FOUND_IMAGES=1
            break
        fi
    done

    if [ "$FOUND_IMAGES" -eq 1 ]; then
        LOCAL_SOURCE_DIR="$DEFAULT_IMAGES_PATH"
        echo "'images' 디렉토리에서 이미지 파일을 찾았습니다. 이 디렉토리를 사용합니다."
    else
        echo "'images' 디렉토리는 존재하지만, 이미지 파일이 없습니다."
    fi
else
    echo "기본 'images' 디렉토리 (${DEFAULT_IMAGES_PATH})를 찾을 수 없습니다."
fi

# 이미지 디렉토리가 아직 선택되지 않았다면 사용자에게 입력 요청
while [ -z "$LOCAL_SOURCE_DIR" ]; do
    read -p "업로드할 이미지 파일이 있는 로컬 디렉토리 이름을 입력하세요 (예: 'images' 디렉토리 또는 현재 디렉토리인 경우 '.'): " INPUT_DIR_NAME

    if [ -z "$INPUT_DIR_NAME" ]; then
        echo "디렉토리 이름을 입력해야 합니다."
        continue
    fi

    if [ "$INPUT_DIR_NAME" == "." ]; then
        CHECK_DIR="${SCRIPT_DIR}"
    else
        CHECK_DIR="${SCRIPT_DIR}/${INPUT_DIR_NAME}"
    fi
    
    if [ ! -d "$CHECK_DIR" ]; then
        echo "오류: '$CHECK_DIR' 디렉토리가 존재하지 않습니다. 다시 입력해주세요."
        continue
    fi

    FOUND_IMAGES=0
    for ext in "${IMAGE_EXTENSIONS[@]}"; do
        if compgen -G "${CHECK_DIR}/*.${ext}" > /dev/null; then
            FOUND_IMAGES=1
            break
        fi
    done

    if [ "$FOUND_IMAGES" -eq 1 ]; then
        LOCAL_SOURCE_DIR="$CHECK_DIR"
        echo "'${INPUT_DIR_NAME}' 디렉토리에서 이미지 파일을 찾았습니다."
    else
        echo "'${INPUT_DIR_NAME}' 디렉토리 (${CHECK_DIR})에는 이미지 파일이 없습니다. 다시 입력해주세요."
    fi
done

echo "최종 선택된 로컬 디렉토리: ${LOCAL_SOURCE_DIR}"

# 실제 업로드될 이미지 파일 목록 확인 (옵션)
echo "이 디렉토리에서 다음 이미지 파일들을 찾았습니다:"
UPLOAD_FILE_COUNT=0
for ext in "${IMAGE_EXTENSIONS[@]}"; do
    for file in "${LOCAL_SOURCE_DIR}"/*.${ext}; do
        if [ -e "$file" ]; then
            echo "  - $(basename "$file")"
            ((UPLOAD_FILE_COUNT++))
        fi
    done
done
if [ "$UPLOAD_FILE_COUNT" -eq 0 ]; then
    echo "오류: 업로드할 이미지 파일이 없습니다."
    exit 1
fi
echo "총 $UPLOAD_FILE_COUNT 개의 이미지 파일이 발견되었습니다."


# S3 업로드 경로 입력
echo ""
read -p "'$S3_BASE_PATH' 이후의 업로드할 폴더 경로를 입력하세요 (예: 2025/06/19/roulette-event/): " RELATIVE_S3_PATH_INPUT
if [ -z "$RELATIVE_S3_PATH_INPUT" ]; then
    echo "오류: 업로드 경로를 입력해야 합니다."
    exit 1
fi

# 경로 마지막에 '/' 추가 (만약 없다면)
if [[ "${RELATIVE_S3_PATH_INPUT: -1}" != "/" ]]; then
    RELATIVE_S3_PATH_INPUT="${RELATIVE_S3_PATH_INPUT}/"
fi

TARGET_S3_PATH="${S3_BASE_PATH}${RELATIVE_S3_PATH_INPUT}"
CLOUDFRONT_INVALIDATION_TARGET="${S3_BASE_URL_FOR_INVALIDATION}${RELATIVE_S3_PATH_INPUT}*"

echo ""
echo "최종 S3 업로드 경로: $TARGET_S3_PATH"
echo "예상 CloudFront 무효화 경로: $CLOUDFRONT_INVALIDATION_TARGET"

read -p "위 정보로 업로드를 진행하시겠습니까? (y/n): " CONFIRM_UPLOAD
if [ "$CONFIRM_UPLOAD" != "y" ]; then
    echo "작업이 취소되었습니다."
    exit 0
fi

# 2. 입력한 업로드 경로에 기존 파일명과 동일한지 확인
echo ""
echo "--- S3 기존 파일 확인 중 ---"
EXISTING_S3_FILENAMES=()
# S3에 이미 존재하는 파일 목록을 가져옵니다.
# --recursive를 사용하면 하위 경로까지 모두 가져오지만, 여기서는 현재 타겟 경로만 관심.
# awsk cli의 ls는 디렉토리를 포함할 수 있으므로, 파일만 추출해야 합니다.
# grep -E "(${IMAGE_EXTENSIONS// /|})$" 로 확장자로 필터링
S3_LS_OUTPUT=$(aws s3 ls "${TARGET_S3_PATH}" --recursive 2>/dev/null | awk '{print $4}')

OVERLAPPING_FILES_COUNT=0
for ext in "${IMAGE_EXTENSIONS[@]}"; do
    for local_file_full_path in "${LOCAL_SOURCE_DIR}"/*.${ext}; do
        LOCAL_FILENAME=$(basename "$local_file_full_path")
        # S3_LS_OUTPUT에 LOCAL_FILENAME이 포함되어 있는지 확인
        if echo "$S3_LS_OUTPUT" | grep -q "${RELATIVE_S3_PATH_INPUT}${LOCAL_FILENAME}"; then
            if [ "$OVERLAPPING_FILES_COUNT" -eq 0 ]; then
                echo "**경고: 다음 파일들은 S3 대상 경로에 이미 존재합니다!**"
            fi
            echo "  - $LOCAL_FILENAME"
            ((OVERLAPPING_FILES_COUNT++))
        fi
    done
done

PERFORM_INVALIDATION="false"
if [ "$OVERLAPPING_FILES_COUNT" -gt 0 ]; then
    echo ""
    read -p "동일한 이름의 파일이 이미 있습니다. CloudFront 캐시를 무효화하시겠습니까? (y/n): " READ_INVALIDATE_CHOICE
    if [ "$READ_INVALIDATE_CHOICE" = "y" ]; then
        PERFORM_INVALIDATION="true"
        echo "CloudFront 무효화가 예정되었습니다."
    else
        echo "CloudFront 무효화는 진행하지 않습니다. (새로운 내용이 반영되지 않을 수 있습니다)"
    fi
else
    echo "S3 대상 경로에 중복되는 파일이 없습니다."
fi


# 3. 업로드 실행
echo ""
echo "--- S3 업로드 진행 중 ---"

# --exclude "*" 후 --include "*.ext" 방식으로 이미지 파일만 업로드
EXCLUDE_DS_STORE="--exclude '*.DS_Store' --exclude '.DS_Store' --exclude '*/.DS_Store'"
INCLUDE_IMAGES=""
for ext in "${IMAGE_EXTENSIONS[@]}"; do
    INCLUDE_IMAGES+=" --include \"*.${ext}\""
done

# aws s3 cp 명령의 옵션을 동적으로 구성
# 참고: ${LOCAL_SOURCE_DIR}/ 로 슬래시를 붙여 디렉토리임을 명확히 합니다.
AWS_CP_COMMAND="aws s3 cp \"${LOCAL_SOURCE_DIR}/\" \"${TARGET_S3_PATH}\" \
    --cache-control \"max-age=0,s-maxage=31536000\" \
    --recursive \
    --profile ${AWS_PROFILE_NAME} \
    --exclude \"*\" ${INCLUDE_IMAGES} ${EXCLUDE_DS_STORE}"

echo "실행될 명령어: $AWS_CP_COMMAND"
eval "$AWS_CP_COMMAND" # eval을 사용하여 동적으로 생성된 명령 실행

if [ $? -ne 0 ]; then
    echo "S3 업로드 실패!"
    exit 1
fi
echo "S3 업로드 성공."

# 4. CloudFront 무효화 진행
if [ "$PERFORM_INVALIDATION" = "true" ]; then
    echo ""
    echo "--- CloudFront 무효화 진행 중 ---"
    aws cloudfront create-invalidation \
        --profile ${AWS_PROFILE_NAME} \
        --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
        --paths "$CLOUDFRONT_INVALIDATION_TARGET"

    if [ $? -ne 0 ]; then
        echo "CloudFront 무효화 요청 실패!"
        exit 1
    fi
    echo "CloudFront 무효화 요청 성공."
    echo "**CloudFront 무효화는 완료되기까지 시간이 걸릴 수 있습니다. CloudFront 콘솔에서 상태를 확인하세요.**"
    echo "**참고: CloudFront 무효화에는 과금이 발생합니다.**"
else
    echo ""
    echo "CloudFront 무효화는 진행하지 않습니다."
fi

echo ""
echo "--- 스크립트 실행 완료 ---"