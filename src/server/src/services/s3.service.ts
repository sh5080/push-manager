import { envConfig, IPresignedUrl } from "@push-manager/shared";
import { S3 } from "aws-sdk";

export class S3Service {
  private s3: S3;
  private readonly bucketName: string;
  private readonly basePath: string;
  private readonly cdnDomain: string;

  constructor() {
    this.bucketName = "harmony-dev-static";
    this.basePath = "lg/events";
    this.cdnDomain = "harmony-static-dev.travelflan.com";

    this.s3 = new S3({
      region: "ap-northeast-2",
      credentials: {
        accessKeyId: envConfig.aws.accessKeyId,
        secretAccessKey: envConfig.aws.secretAccessKey,
      },
    });
  }

  /**
   * 파일 업로드를 위한 Presigned URL을 생성합니다.
   * @param path 파일이 저장될 경로 (basePath 이후의 경로)
   * @param fileName 파일 이름
   * @param contentType 파일 타입 (MIME 타입)
   * @param expiresIn URL 만료 시간 (초 단위, 기본 300초)
   * @returns Presigned URL 및 파일 접근 URL
   */
  async generatePresignedUrl(
    path: string,
    fileName: string,
    contentType: string,
    expiresIn: number = 300
  ): Promise<IPresignedUrl> {
    const key = `${this.basePath}/${path}/${fileName}`;

    const params = {
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
      CacheControl: "max-age=0,s-maxage=31536000",
      Expires: expiresIn,
    };

    const presignedUrl = await this.s3.getSignedUrlPromise("putObject", params);
    const fileUrl = `https://${this.cdnDomain}/${key}`;

    return { uploadUrl: presignedUrl, accessUrl: fileUrl };
  }
}
