import { PresignedUrlDto } from "@push-manager/shared/dtos/common.dto";
import { commonApi } from "../apis/common.api";

/**
 * 파일명을 URL 친화적으로 정리합니다.
 * @param fileName 원본 파일명
 * @returns 정리된 파일명
 */
function sanitizeFileName(fileName: string): string {
  // 파일 확장자 추출
  const extension = fileName.split(".").pop() || "";
  const baseName = fileName.substring(0, fileName.lastIndexOf("."));

  // 1. 공백을 언더스코어로 변경
  let sanitized = baseName.replace(/\s+/g, "_");

  // 2. 특수문자 제거 (영문, 숫자, 언더스코어, 하이픈만 허용)
  sanitized = sanitized.replace(/[^\w\-]/g, "");

  const timestamp = new Date().getTime();

  return `${sanitized}_${timestamp}.${extension}`;
}

/**
 * S3 URL을 올바르게 인코딩합니다.
 * @param url 원본 URL
 * @returns 인코딩된 URL
 */
export function encodeS3Url(url: string): string {
  try {
    // URL 객체 생성
    const urlObj = new URL(url);

    // 경로 부분만 추출
    const pathParts = urlObj.pathname.split("/");

    // 마지막 부분(파일명)만 인코딩
    const lastIndex = pathParts.length - 1;
    pathParts[lastIndex] = encodeURIComponent(pathParts[lastIndex]);

    // 새 경로 생성
    urlObj.pathname = pathParts.join("/");

    return urlObj.toString();
  } catch (error) {
    console.error("URL 인코딩 오류:", error);
    return url;
  }
}

export async function uploadImage(file: File, path: string) {
  const sanitizedFileName = sanitizeFileName(file.name);
  const sanitizedFile = new File([file], sanitizedFileName, {
    type: file.type,
  });

  const dto: PresignedUrlDto = {
    fileName: sanitizedFileName,
    path: path,
    contentType: file.type,
  };

  const { uploadUrl, accessUrl } = await commonApi.getPresignedUrl(dto);

  if (!uploadUrl || !accessUrl) {
    throw new Error("Upload URL or Access URL is not valid");
  }

  const response = await fetch(uploadUrl, {
    method: "PUT",
    body: sanitizedFile,
    headers: {
      "Content-Type": file.type,
      "Cache-Control": "max-age=0,s-maxage=31536000",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Upload failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  // URL 인코딩 확인
  const encodedAccessUrl = encodeS3Url(accessUrl);

  // 성공 시 인코딩된 URL 반환
  return encodedAccessUrl;
}
/**
 * 이미지 파일인지 확인하는 함수
 * @param file 확인할 파일
 * @returns 이미지 파일 여부
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

/**
 * 파일 크기 제한을 확인하는 함수 (MB 단위)
 * @param file 확인할 파일
 * @param maxSizeMB 최대 파일 크기 (MB)
 * @returns 파일 크기 제한 내 여부
 */
export function isFileSizeValid(file: File, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}
