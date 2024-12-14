import { ExcelUploader } from "@/app/push/components/ExcelUploader";
import PushBaseForm from "@/app/push/components/PushBaseForm";

export default function TargetPushPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">타겟 푸시 발송</h1>
      <div className="max-w-3xl mx-auto">
        <ExcelUploader />
        <PushBaseForm />
      </div>
    </div>
  );
}
