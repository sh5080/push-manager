import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import { ContentViewer } from "app/common/components/detail/contentViewer.component";

interface PushDetailProps {
  push: IPushStsMsg;
}

export function PushStatsDetail({ push }: PushDetailProps) {
  return (
    <ContentViewer
      buttonText="자세히"
      title="통계 상세"
      content={push.tmpMessage!}
    />
  );
}
