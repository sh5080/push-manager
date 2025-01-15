import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HiChevronUp } from "react-icons/hi";

interface StatProps {
  label: string;
  value: number;
}

const StatItem = ({ label, value }: StatProps) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-1">{value}명</p>
  </div>
);

interface DeviceStats {
  sent: number;
  opened: number;
  failed: number;
  appdel: number;
}

interface PushStatsProps {
  detail: {
    deviceType: string;
    sent: number;
    opened: number;
    failed: number;
    appdel: number;
  }[];
}

const DEVICE_TYPES = [
  { type: "A", label: "Android" },
  { type: "I", label: "iOS" },
] as const;

const STAT_ITEMS = [
  { key: "sent" as const, label: "발송 성공" },
  { key: "opened" as const, label: "오픈 수" },
  { key: "failed" as const, label: "발송 실패" },
  { key: "appdel" as const, label: "앱 삭제" },
];

export function PushStats({ detail }: PushStatsProps) {
  const getStatsByDevice = (deviceType: "A" | "I"): DeviceStats => {
    const deviceData = detail.filter((d) => d.deviceType === deviceType);
    return {
      sent: deviceData.reduce((sum, d) => sum + (d.sent || 0), 0),
      opened: deviceData.reduce((sum, d) => sum + (d.opened || 0), 0),
      failed: deviceData.reduce((sum, d) => sum + (d.failed || 0), 0),
      appdel: deviceData.reduce((sum, d) => sum + (d.appdel || 0), 0),
    };
  };

  const deviceStats = {
    A: getStatsByDevice("A"),
    I: getStatsByDevice("I"),
  };

  const totalStats = {
    sent: deviceStats.A.sent + deviceStats.I.sent,
    opened: deviceStats.A.opened + deviceStats.I.opened,
    failed: deviceStats.A.failed + deviceStats.I.failed,
    appdel: deviceStats.A.appdel + deviceStats.I.appdel,
  };

  return (
    <div className="border-t pt-4 space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {STAT_ITEMS.map((item) => (
          <StatItem
            key={item.key}
            label={`전체 ${item.label}`}
            value={totalStats[item.key]}
          />
        ))}
      </div>

      {DEVICE_TYPES.map(({ type, label }) => (
        <Disclosure key={type} defaultOpen={false}>
          {({ open }) => (
            <div className="border-t pt-4">
              <DisclosureButton className="flex w-full justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-700">
                  {label} 통계
                </h4>
                <HiChevronUp
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-gray-500 transition-transform duration-200`}
                />
              </DisclosureButton>

              <DisclosurePanel>
                <div className="grid grid-cols-4 gap-4">
                  {STAT_ITEMS.map((item) => (
                    <StatItem
                      key={item.key}
                      label={item.label}
                      value={deviceStats[type][item.key]}
                    />
                  ))}
                </div>
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
