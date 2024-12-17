import { NextResponse } from "next/server";
import { pushController } from "@/server/controllers/pushController";
const pushService = pushController.getPushService();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await pushService.createBulkPush(
      data.identifyArray,
      data.pushData
    );
    return NextResponse.json({ success: true, campaignCode: result });
  } catch (error) {
    console.error("푸시 생성 실패:", error);
    return NextResponse.json(
      { success: false, error: "푸시 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const limit = Number(searchParams.get("limit")) || 10;
    const page = Number(searchParams.get("page")) || 1;

    switch (action) {
      case "recent":
        const recentPushes = await pushService.getRecentPushes(limit);
        return NextResponse.json({ success: true, data: recentPushes });

      case "history":
        const history = await pushService.getPushHistory(page, limit);
        return NextResponse.json({ success: true, data: history });

      case "stats":
        const stats = await pushService.getPushStats();
        return NextResponse.json({ success: true, data: stats });

      default:
        return NextResponse.json(
          { success: false, error: "잘못된 요청입니다." },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("푸시 조회 실패:", error);
    return NextResponse.json(
      { success: false, error: "푸시 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
