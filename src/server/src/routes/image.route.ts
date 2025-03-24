import { Router } from "express";
import { ImageController } from "../controllers/image.controller";
import { S3Service } from "../services/s3.service";

const router = Router();

const imageController = new ImageController(new S3Service());

router.get("/presigned-url", imageController.getPresignedUrl);

export const imageRoutes = router;
