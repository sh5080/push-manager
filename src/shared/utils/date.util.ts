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
  offset: string = "+09:00", // 기본값은 KST
  dateAdjust?: string // 예: "+1d", "-1d"
): string => {
  if (!date) return "";

  // 문자열인 경우 Date 객체로 변환
  let dateObj = typeof date === "string" ? new Date(date) : date;

  // 유효한 날짜인지 확인
  if (isNaN(dateObj.getTime())) {
    return "";
  }

  // dateAdjust 처리
  if (dateAdjust) {
    const value = parseInt(dateAdjust.slice(0, -1));
    const unit = dateAdjust.slice(-1);

    switch (unit) {
      case "d":
        dateObj = new Date(dateObj.setDate(dateObj.getDate() + value));
        break;
      case "m":
        dateObj = new Date(dateObj.setMonth(dateObj.getMonth() + value));
        break;
      case "y":
        dateObj = new Date(dateObj.setFullYear(dateObj.getFullYear() + value));
        break;
    }
  }

  // offset 파싱 (예: "+09:00" -> 9, "-05:00" -> -5)
  const hours = parseInt(offset.slice(0, 3));
  const offsetMs = hours * 60 * 60 * 1000;

  // offset 적용
  dateObj = new Date(dateObj.getTime() - offsetMs);

  // YYYY-MM-DD HH:mm 형식으로 변환
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours24 = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours24}:${minutes}`;
};

export const formatDateString = (date: string) => {
  if (date.length > 9)
    return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(
      6,
      8
    )} ${date.slice(8, 10)}:${date.slice(10, 12)}`;
  else return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
};

export const convertKSTtoUTC = (kstDateTimeString: string): string => {
  // "2025-02-26T11:28" 형식의 문자열을 Date 객체로 변환
  const kstDate = new Date(kstDateTimeString);

  // KST는 UTC+9이므로 9시간을 빼서 UTC로 변환
  const utcTime = new Date(kstDate.getTime() - 9 * 60 * 60 * 1000);

  // ISO 형식으로 변환 (YYYY-MM-DDTHH:MM:SS.sssZ)
  return utcTime.toISOString();
};

export const formatDateToKSTString = (date: Date): string => {
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Seoul",
    hour12: false // 24시간 형식으로 표시 (오전/오후 표시 없음)
  });
};
