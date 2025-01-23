import Image from "next/image";

export function ExcelGuideContent() {
  return (
    <>
      <p className="font-medium mb-2">엑셀 입력 방법 안내</p>
      <ul className="list-disc pl-4 space-y-1 mb-3">
        <li>엑셀 파일의 첫 번째 열에 식별자를 입력해주세요.</li>
        <li>
          헤더(제목) 행에 identify를 꼭 입력해주세요. <br />
          식별자는 두 번째 행부터 읽습니다.
        </li>
        <li>
          전송시 name등 다른 필드는 읽지 않으므로 편하게 입력하셔도 됩니다.
        </li>
        <li>지원 형식: .xlsx, .xls, .csv</li>
        <li>빈 셀이나 중복된 값은 자동으로 제외됩니다.</li>
      </ul>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-300 mb-1">▼ 올바른 엑셀 형식 예시</p>
          <Image
            src="/images/excel-guide/excel-guide-1.png"
            alt="엑셀 가이드 이미지 1"
            width={300}
            height={150}
            className="rounded border border-gray-700"
          />
        </div>
      </div>
    </>
  );
}
