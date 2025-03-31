import { BadRequestException, envConfig } from "@push-manager/shared";

export function transformDbToEntity<T extends Record<string, any>>(
  data: { [key: string]: any },
  EntityClass: new () => T
): T {
  const entity = new EntityClass() as { [key: string]: any };
  const snakeToCamel = (str: string) =>
    str.toLowerCase().replace(/_([a-z0-9])/g, (g) => g[1].toUpperCase());

  Object.keys(data).forEach((key) => {
    const camelKey = snakeToCamel(key);
    entity[camelKey] = data[key];
  });

  return entity as T;
}

/**
 * 지정된 날짜 문자열을 Oracle SYSDATE 기반 표현식으로 변환합니다.
 * @param dateString 'YYYY-MM-DD HH:mm' 형식의 날짜 문자열
 * @returns 'SYSDATE' 또는 'SYSDATE + n/24/60' 형식의 문자열
 * @throws {Error} 유효하지 않은 날짜 형식이거나 과거 시간인 경우
 */
export function convertToSysdate(dateString: string): string {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  if (!dateFormatRegex.test(dateString)) {
    throw new BadRequestException(
      `유효하지 않은 날짜 형식입니다. 'YYYY-MM-DD HH:MM' 형식이어야 합니다: ${dateString}`
    );
  }
  // 입력된 날짜 문자열을 명시적으로 한국 시간으로 파싱
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  // 한국 시간 기준으로 Date 객체 생성
  const targetDate = new Date(Date.UTC(year, month - 1, day, hour - 9, minute));
  const currentDate = new Date();

  // 유효성 검사
  if (isNaN(targetDate.getTime())) {
    throw new BadRequestException(
      `유효하지 않은 날짜 형식입니다: ${dateString}`
    );
  }

  // 현재 시간과의 차이 계산 (분)
  const minutesDiff = Math.ceil(
    (targetDate.getTime() - currentDate.getTime()) / (1000 * 60)
  );

  // 과거 시간 체크
  if (minutesDiff < 0) {
    throw new BadRequestException("발송 시간은 현재 시간보다 이후여야 합니다.");
  }

  // 현재 시간인 경우 SYSDATE 반환
  if (minutesDiff === 0) {
    return "SYSDATE";
  }

  // SYSDATE + 분/24*60 형식으로 반환
  return `SYSDATE + ${minutesDiff}/1440`;
}
export const convertAppIdToAppName = (value: string): string => {
  switch (value) {
    case envConfig.push.keyFreed:
      return "프리디";
    case envConfig.push.keyFreed2:
      return "통테";
    case envConfig.push.keyPrd:
      return "운영";
    default:
      return "확인 필요";
  }
};
