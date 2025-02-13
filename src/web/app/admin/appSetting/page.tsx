"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@commonComponents/layout/pageHeader.component";
import { appSettingApi } from "app/apis/admin/appSetting.api";
import {
  IAppSettingWithMaintenance,
  INoticeBar,
  IFooter,
  IAppSetting,
} from "@push-manager/shared";
import { Toast } from "app/utils/toast.util";
import { NoticeBar } from "./components/noticeBar.component";
import { Footer } from "./components/footer.component";
import { Maintenance } from "./components/maintenance.component";

export default function AppSettingPage() {
  const [settings, setSettings] = useState<IAppSettingWithMaintenance | null>(
    null
  );

  const fetchSettings = async () => {
    try {
      const response = await appSettingApi.getAppSettings();
      setSettings(response);
    } catch (error: any) {
      Toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const noticeBar = settings?.appSettings.find(
    (setting): setting is IAppSetting & { value: INoticeBar } =>
      setting.key === "NOTICE_BAR"
  );

  const footer = settings?.appSettings.find(
    (setting): setting is IAppSetting & { value: IFooter } =>
      setting.key === "FOOTER"
  );

  return (
    <div className="min-h-screen py-8 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <PageHeader
          title="앱 설정 관리"
          description="노티스바, 푸터 등 앱 설정을 관리할 수 있습니다."
        />

        <div className="space-y-6">
          {noticeBar && <NoticeBar noticeBar={noticeBar} />}
          {footer && <Footer footer={footer} />}

          {settings?.maintenances && (
            <Maintenance maintenances={settings.maintenances} />
          )}
        </div>
      </div>
    </div>
  );
}
