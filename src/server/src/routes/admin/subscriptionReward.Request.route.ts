import { Router } from "express";
import { SubscriptionRewardRequestController } from "../../controllers/admin/subscriptionRewardRequest.controller";
import { SubscriptionRewardRequestService } from "../../services/admin/subscriptionRewardRequest.service";
import { SubscriptionRewardRequestRepository } from "../../repositories/admin/subscriptionRewardRequest.repository";

const router = Router();
const subscriptionRewardRequestService = new SubscriptionRewardRequestService(
  new SubscriptionRewardRequestRepository()
);
const subscriptionRewardRequestController =
  new SubscriptionRewardRequestController(subscriptionRewardRequestService);

router.get(
  "/",
  subscriptionRewardRequestController.getSubscriptionRewardRequests
);

export const subscriptionRewardRequestRoutes = router;
