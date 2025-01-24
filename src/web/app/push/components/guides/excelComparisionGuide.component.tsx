interface GuideItem {
  label: string;
  color: string;
  description: string;
  subDescription?: string;
}

export function ExcelComparisonGuideContent() {
  const guideItems: GuideItem[] = [
    {
      label: "엑셀",
      color: "blue",
      description: "업로드한 엑셀 파일의 총 식별자 수",
    },
    {
      label: "예약 대기",
      color: "green",
      description: "현재 예약 대기열에 있는 총 식별자 수",
    },
    {
      label: "기 등록",
      color: "purple",
      description: "엑셀과 예약 대기열에 모두 존재하는 식별자 수",
      subDescription: "(중복 식별자 제거)",
    },
    {
      label: "예약 누락",
      color: "red",
      description: "엑셀에는 있지만 예약 대기열에는 없는 식별자 수",
      subDescription: "(추가 예약이 필요한 대상)",
    },
    {
      label: "엑셀 누락",
      color: "orange",
      description: "예약 대기열에는 있지만 엑셀에는 없는 식별자 수",
      subDescription: "(예약이 잘못 등록된 대상일 수 있음)",
    },
  ];

  return (
    <>
      <p className="font-medium mb-2">비교 결과 안내</p>
      <ul className="space-y-2">
        {guideItems.map((item) => (
          <li key={item.label} className="flex items-center">
            <span
              className={`
                inline-flex items-center px-2.5 py-1 rounded-full text-sm 
                font-medium bg-${item.color}-100 text-${item.color}-800 
                w-[100px] justify-center
              `}
            >
              {item.label}
            </span>
            <span className="text-gray-200 ml-2 text-sm">
              {item.description}
              {item.subDescription && (
                <>
                  <br />
                  {item.subDescription}
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
