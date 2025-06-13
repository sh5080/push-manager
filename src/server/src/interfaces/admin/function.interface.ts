// 예약 목록 응답에 추가될 타입 정의
export type ReservationWithDetailInfo = {
  예약신청일시: string;
  예약번호: string;
  회원번호: string;
  회원명: string;
  "회원 등급 (신청 당시)": string;
  연락처: string;
  호스트: string;
  공간: string;
  콘텐츠: string;
  인원수: string;
  이용일시: string;
};

export interface IFunctionService {
  getAllReservations(): Promise<ReservationWithDetailInfo[]>;
}
