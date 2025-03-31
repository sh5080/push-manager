export interface IAdmin {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  twoFas: Record<string, any>;
  permissions: {
    role: string;
    custom: Record<string, any>;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  requiresPasswordChange: boolean;
}
