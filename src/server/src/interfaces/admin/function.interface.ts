import { reservation } from "../../db/migrations/schema";

// 예약 목록 응답에 추가될 타입 정의
export type ReservationWithTimeSlotInfo = typeof reservation.$inferSelect & {
  timeSlotStartAt: string | null;
};

export interface IFunctionService {
  getAllReservations(): Promise<ReservationWithTimeSlotInfo[]>;
}
