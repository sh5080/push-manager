import type { Sequelize } from "sequelize";

import { SubscriptionRewardRequest as _SubscriptionRewardRequest } from "../admin/SubscriptionRewardRequest";
import type {
  SubscriptionRewardRequestAttributes,
  SubscriptionRewardRequestCreationAttributes,
} from "../admin/SubscriptionRewardRequest";
import { Member as _Member } from "../admin/Member";
import type {
  MemberAttributes,
  MemberCreationAttributes,
} from "../admin/Member";

export {
  _SubscriptionRewardRequest as SubscriptionRewardRequest,
  _Member as Member,
};
export type {
  SubscriptionRewardRequestAttributes,
  SubscriptionRewardRequestCreationAttributes,
  MemberAttributes,
  MemberCreationAttributes,
};

export function initAdminModels(sequelize: Sequelize) {
  const SubscriptionRewardRequest =
    _SubscriptionRewardRequest.initModel(sequelize);
  const Member = _Member.initModel(sequelize);
  return {
    SubscriptionRewardRequest: SubscriptionRewardRequest,
    Member: Member,
  };
}
