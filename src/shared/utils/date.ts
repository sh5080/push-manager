/**
 * 날짜와 시간 문자열을 Date 객체로 변환하는 함수 (KST 기준)
 * @param dateTimeStr 'YYYY-MM-DD HH:MM' 형식의 문자열
 * @returns Date 객체 (로컬 시간 기준)
 */
export const parseDateTime = (dateTimeStr: string): Date => {
  const [datePart, timePart] = dateTimeStr.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);
  const seconds = 0;

  // 로컬 시간 기준으로 Date 객체 생성 (KST)
  const dateTime = new Date(year, month - 1, day, hours, minutes, seconds);

  return dateTime;
};
