import { PushHistoryTable } from "@/push/components/PushHistoryTable";
import { pushController } from "@/server/controllers/pushController";

export default async function PushHistoryPage({
  params,
}: {
  params: { type: "target" | "all" };
}) {
  const pushService = pushController.getPushService();
  //   const history = await pushService.getPushHistory(params.type);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">
        {params.type === "target" ? "타겟 푸시" : "전체 푸시"} 발송 이력
      </h1>
      {/* <PushHistoryTable history={history} /> */}
    </div>
  );
}
