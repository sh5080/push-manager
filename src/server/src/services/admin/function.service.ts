import { ExcelHandler, formatDateToKSTString } from "@push-manager/shared";
import { IFunctionService } from "../../interfaces/admin/function.interface";
import { ReservationRepository } from "../../repositories/admin/reservation.repository";
import { aes, base64ToBytes, bytesToUtf8 } from "../../utils/crypto.util";
import i18next from "i18next";
import { parsePhoneNumber } from "awesome-phonenumber";

export class FunctionService implements IFunctionService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async getAllReservations() {
    const reservations = await this.reservationRepository.getAllReservations();

    // 날짜 형식 변환 및 필요한 데이터 구조 변환 처리
    return reservations.map((item) => {
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

      const formattedReservation = {
        예약신청일시: item.createdAt
          ? formatDateToKSTString(new Date(item.createdAt))
          : "",
        예약번호: item.sn,
        "예약 상태": i18next.t(`ReservationStatus.${item.status}`),
        "예약 상태 변경 사유":
          item.hists?.length > 0
            ? i18next.t(
                `ReservationStatusReasonCode.${item.hists[0].reasonCode}`
              )
            : "",

        회원번호: decryptedMemNo ?? "",
        회원명: item.member?.name ?? "",
        "회원 등급 (신청 당시)": item.gradeAtIssue
          ? i18next.t(`MembershipGrade.${item.gradeAtIssue}`)
          : "",
        연락처:
          parsePhoneNumber(item.phoneNumber, { regionCode: "KR" }).number
            ?.national ?? "",
        호스트: item.timeSlot.content.host.name,
        공간: item.timeSlot.content.space?.name ?? "",
        콘텐츠: item.timeSlot.content.name,
        인원수: String(item.groupSize),
        이용일시: formatDateToKSTString(new Date(item.timeSlot.startAt)),
      };

      return formattedReservation;
    });
  }

  async exportReservationsToExcel(fileName?: string): Promise<string> {
    const reservations = await this.getAllReservations();
    return await ExcelHandler.convertDataToExcel(reservations, fileName);
  }

  async updateContactInfo(id: string, contactInfo: string) {
    return await this.reservationRepository.updateContactInfo(id, contactInfo);
  }
}
