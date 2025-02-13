import { IAppSetting, IFooter } from "@push-manager/shared";

interface FooterProps {
  footer: IAppSetting & { value: IFooter };
}

export function Footer({ footer }: FooterProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-medium mb-4">푸터 설정</h2>
      <div
        className="prose max-w-none text-sm"
        dangerouslySetInnerHTML={{ __html: footer?.value.html || "" }}
      />
    </div>
  );
}
