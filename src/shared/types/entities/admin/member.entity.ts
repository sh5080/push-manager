import { IRetrieveRestMbsCustRes } from "./newbest.entity";

export interface IMember {
  id: string;
  email?: string;
  name?: string;
  phoneNumber: string;
  permissions: {
    role: string;
    custom: Record<string, any>;
  };
  unifyId: string;
  ci: string;
  memNo: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  mbti?: string;
  mbtiCreatedAt?: Date;
  mbtiUpdatedAt?: Date;
}

export interface IMemberWithNewbestInfo extends IMember {
  newbestInfo: IRetrieveRestMbsCustRes;
}
