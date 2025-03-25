import { PresignedUrlDto } from "@push-manager/shared/dtos/common.dto";
import { commonApi } from "../apis/common.api";

export async function uploadImage(file: File, path: string) {
  const dto: PresignedUrlDto = {
    fileName: file.name,
    path: path,
    contentType: file.type,
  };

  const { uploadUrl, accessUrl } = await commonApi.getPresignedUrl(dto);

  if (!uploadUrl || !accessUrl) {
    throw new Error("Upload URL or Access URL is not valid");
  }

  await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
      "Cache-Control": "max-age=0,s-maxage=31536000",
    },
  });

  // 3. 최종 접근 URL 반환 (CLI 방식과 동일한 URL)
  return accessUrl;
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
