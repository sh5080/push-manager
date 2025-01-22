import type { Sequelize } from "sequelize";

import { SubscriptionRewardRequest as _SubscriptionRewardRequest } from "../admin/SubscriptionRewardRequest";
import type {
  SubscriptionRewardRequestAttributes,
  SubscriptionRewardRequestCreationAttributes,
} from "../admin/SubscriptionRewardRequest";

export { _SubscriptionRewardRequest as SubscriptionRewardRequest };

export type {
  SubscriptionRewardRequestAttributes,
  SubscriptionRewardRequestCreationAttributes,
};

export function initAdminModels(sequelize: Sequelize) {
  const SubscriptionRewardRequest =
    _SubscriptionRewardRequest.initModel(sequelize);
  return {
    SubscriptionRewardRequest: SubscriptionRewardRequest,
  };
}
