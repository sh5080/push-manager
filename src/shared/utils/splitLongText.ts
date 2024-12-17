export const splitLongText = (text: string): string[] => {
  const maxByteLength = 4000;
  const result: string[] = [];
  let start = 0;
  if (Buffer.byteLength(text, "utf8") > maxByteLength * 1) {
    throw new Error(
      "현재 본문은 최대 4000 bytes를 넘을 수 없습니다. 롱텍스트에 대한 자세한 확인이 필요합니다."
    );
  }

  if (Buffer.byteLength(text, "utf8") > maxByteLength * 4) {
    throw new Error("본문은 최대 16000 bytes를 넘을 수 없습니다.");
  }

  while (start < text.length) {
    let end = start + 1;

    while (
      end <= text.length &&
      Buffer.byteLength(text.substring(start, end), "utf8") <= maxByteLength
    ) {
      end++;
    }

    if (end > text.length) {
      end = text.length;
    } else {
      end--;
    }

    result.push(text.substring(start, end));
    start = end;

    if (result.length > 4) {
      throw new Error("본문은 최대 4개의 조각으로 나누어야 합니다.");
    }
  }

  return result;
};
