import { formatDateToKSTString, ExcelHandler } from "@push-manager/shared";
import { IFunctionService } from "../../interfaces/admin/function.interface";
import { ReservationRepository } from "../../repositories/admin/reservation.repository";
import { aes, base64ToBytes, bytesToUtf8 } from "../../utils/crypto.util";

export class FunctionService implements IFunctionService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async getAllReservations() {
    const reservations = await this.reservationRepository.getAllReservations();

    // 날짜 형식 변환 및 필요한 데이터 구조 변환 처리
    const formattedReservations = reservations.map((item) => {
      // memNo 복호화 처리
      let decryptedMemNo = "";
      if (item.member?.memNo) {
        try {
          const decryptedBytes = aes().decrypt(
            base64ToBytes(item.member.memNo)
          );
          decryptedMemNo = bytesToUtf8(decryptedBytes);
        } catch (error) {
          console.error(`Failed to decrypt memNo: ${item.member.memNo}`, error);
          decryptedMemNo = item.member.memNo; // 복호화 실패 시 원본 값 사용
        }
      }

      // timeSlot의 정보를 포함하여 필요한 모든 필드를 합쳐서 새 객체 생성
      const formattedReservation = {
        ...item.reservation,
        memNo: decryptedMemNo,
        // 날짜 필드들 KST로 변환
        createdAt: item.reservation.createdAt
          ? formatDateToKSTString(new Date(item.reservation.createdAt))
          : "",
        updatedAt: item.reservation.updatedAt
          ? formatDateToKSTString(new Date(item.reservation.updatedAt))
          : "",
        // timeSlot 관련 정보 추가
        timeSlotStartAt: item.reservationTimeSlot?.startAt
          ? formatDateToKSTString(new Date(item.reservationTimeSlot.startAt))
          : null,
        // 타입 오류 해결: timeSlotId는 string이 되도록 빈 문자열로 기본값 설정
        timeSlotId: item.reservationTimeSlot?.id || "",
      };

      return formattedReservation;
    });

    return formattedReservations;
  }

  async exportReservationsToExcel(fileName?: string): Promise<string> {
    const reservations = await this.getAllReservations();
    return await ExcelHandler.exportReservations(reservations, fileName);
  }
}
