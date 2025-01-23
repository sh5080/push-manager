type TimeZone = "UTC" | "KST";
/**
 * 날짜와 시간 문자열을 Date 객체로 변환하는 함수 (KST 기준)
 * @param dateTimeStr 'YYYY-MM-DD HH:MM' 형식의 문자열
 * @returns Date 객체 (로컬 시간 기준)
 */
export const parseDateTime = (dateTimeStr: string): Date => {
  const [datePart, timePart = "00:00"] = dateTimeStr.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);
  const seconds = 0;

  // 로컬 시간 기준으로 Date 객체 생성 (KST)
  const dateTime = new Date(year, month - 1, day, hours, minutes, seconds);

  return dateTime;
};

export const formatDate = (
  date: Date | string,
  timezone: TimeZone = "KST"
): string => {
  if (!date) return "";

  // 문자열인 경우 Date 객체로 변환
  let dateObj = typeof date === "string" ? new Date(date) : date;

  // 유효한 날짜인지 확인
  if (isNaN(dateObj.getTime())) {
    return "";
  }

  /*
  KST인 경우 9시간 전으로 돌려야함
  push DB 시간은 KST 기준
  admin DB 시간은 UTC 기준
  new Date()는 각자의 시간대 반영하고 있어 강제로 9시간을 더하고 있으므로 
  push DB에 저장된 시간을 출력할 경우 -9 해줘야함
  */

  if (timezone === "KST") {
    dateObj = new Date(dateObj.getTime() - 9 * 60 * 60 * 1000);
  }
  // YYYY-MM-DD HH:mm 형식으로 변환
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
/**
 * 날짜를 엑셀 형식(yyyy.mm.dd h:mm:ss AM/PM)으로 변환
 * @param date Date 객체 또는 날짜 문자열
 * @param timezone 시간대 (UTC 또는 KST)
 * @returns 'yyyy.mm.dd h:mm:ss AM/PM' 형식의 문자열
 */
export const formatDateForExcel = (
  date: Date | string,
  timezone: TimeZone = "KST"
): string => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  // KST인 경우 9시간 추가
  const targetDate =
    timezone === "KST"
      ? new Date(dateObj.getTime() + 9 * 60 * 60 * 1000)
      : dateObj;

  const year = targetDate.getUTCFullYear();
  const month = targetDate.getUTCMonth() + 1;
  const day = targetDate.getUTCDate();
  const hours = targetDate.getUTCHours();
  const minutes = targetDate.getUTCMinutes();
  const seconds = targetDate.getUTCSeconds();

  // AM/PM 변환
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${year}.${month}.${day} ${hour12}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")} ${period}`;
};
