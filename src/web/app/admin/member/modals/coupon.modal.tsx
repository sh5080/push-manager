import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { memberApi } from "app/apis/admin/member.api";
import {
  IMembershipAppCoupon,
  INewbestCommonCoupons,
  INewbestObsCoupons,
} from "@push-manager/shared/types/entities/admin/coupon.entity";
import { Toast } from "app/utils/toast.util";
import { GetMemberCouponsDto } from "@push-manager/shared";
import { CouponType } from "@push-manager/shared/dist/types/newbest.type";
import { AppCouponList } from "./couponList/app.component";
import { CommonCouponList } from "./couponList/common.component";
import { ObsCouponList } from "./couponList/obs.component";
import { Button } from "@commonComponents/inputs/button.component";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  memNo: string;
}

export function CouponModal({ isOpen, onClose, memNo }: CouponModalProps) {
  const [appCoupons, setAppCoupons] = useState<IMembershipAppCoupon[]>([]);
  const [commonCoupons, setCommonCoupons] =
    useState<INewbestCommonCoupons | null>(null);
  const [obsCoupons, setObsCoupons] = useState<INewbestObsCoupons | null>(null);
  const [selectedType, setSelectedType] = useState<CouponType>("app");

  useEffect(() => {
    if (isOpen) {
      loadCoupons(selectedType);
    }
  }, [isOpen, selectedType]);

  const loadCoupons = async (type: CouponType) => {
    try {
      const dto = { memNo, type } as GetMemberCouponsDto;
      const data = await memberApi.getMemberCoupons(dto);

      switch (type) {
        case "app":
          setAppCoupons(data as IMembershipAppCoupon[]);
          break;
        case "common":
          setCommonCoupons(data as INewbestCommonCoupons);
          break;
        case "obs":
          setObsCoupons(data as INewbestObsCoupons);
          break;
      }
    } catch (error: any) {
      Toast.error(error.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max bg-white rounded-xl p-6">
          <DialogTitle className="text-lg font-semibold mb-4">
            보유 쿠폰 목록
          </DialogTitle>

          <div className="mb-4 flex space-x-2">
            <Button
              variant={selectedType === "app" ? "square-solid" : "square-line"}
              size="32"
              onClick={() => setSelectedType("app")}
            >
              앱 쿠폰
            </Button>
            <Button
              variant={
                selectedType === "common" ? "square-solid" : "square-line"
              }
              size="32"
              onClick={() => setSelectedType("common")}
            >
              일반 쿠폰
            </Button>
            <Button
              variant={selectedType === "obs" ? "square-solid" : "square-line"}
              size="32"
              onClick={() => setSelectedType("obs")}
            >
              OBS 쿠폰
            </Button>
          </div>

          <div className="overflow-x-auto">
            {selectedType === "app" && <AppCouponList coupons={appCoupons} />}
            {selectedType === "common" && (
              <CommonCouponList coupons={commonCoupons!} />
            )}
            {selectedType === "obs" && <ObsCouponList coupons={obsCoupons!} />}
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="square-line" size="32" onClick={onClose}>
              닫기
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
