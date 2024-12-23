import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";

interface PushDetailProps {
    push: IPushStsMsg;
    onClose: () => void;
  }
  
  export function PushDetail({ push, onClose }: PushDetailProps) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          {/* 헤더 */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800">푸시 상세 정보</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
  
          <div className="space-y-6">
            {/* 기본 정보 */}
            <Section title="기본 정보">
              <DetailItem label="IDX" value={push.idx} bold />
              <DetailItem label="제목" value={push.title} />
              <DetailItem label="메시지" value={push.tmpMessage} className="whitespace-pre-line" />
              <DetailItem label="발송자" value={push.userId} />
              <DetailItem label="앱 ID" value={push.appid} />
            </Section>
  
            {/* 시간 정보 */}
            <Section title="시간 정보">
              <DetailItem label="발송 시간" value={push.senddate} isDate />
              <DetailItem label="결과 시간" value={push.resultdate} isDate />
              <DetailItem label="Cron 시간" value={push.crondate} isDate />
              <DetailItem label="Cron 완료 시간" value={push.cronComplatedate} isDate />
              <DetailItem label="생성 시간" value={push.wdate} isDate />
              <DetailItem label="수정 시간" value={push.udate} isDate />
            </Section>
  
            {/* 상태 정보 */}
            <Section title="상태 정보">
              <DetailItem 
                label="단계" 
                value={push.step} 
                badge 
                badgeColor={getStepColor(push.step)}
              />
              <DetailItem 
                label="발송 상태" 
                value={push.sendStat}
                badge
                badgeColor={getSendStatColor(push.sendStat)}
              />
              <DetailItem label="재시도 횟수" value={push.retry} />
              <DetailItem label="발송 속도" value={push.sendspeed} />
            </Section>
  
            {/* 플랫폼 정보 */}
            <Section title="플랫폼 정보">
              <DetailItem label="Android 지원" value={push.isandroid} isBoolean />
              <DetailItem label="iOS 지원" value={push.isios} isBoolean />
              <DetailItem label="Android 발송 수" value={push.andSendCount} />
              <DetailItem label="iOS 발송 수" value={push.iosSendCount} />
              <DetailItem label="Android 우선순위" value={push.andPriority} />
            </Section>
  
            {/* 알림 설정 */}
            <Section title="알림 설정">
              <DetailItem label="Android 소리" value={push.androidSound} />
              <DetailItem label="Android 뱃지" value={push.androidBadge} />
              <DetailItem label="iOS 소리" value={push.iosSound} />
              <DetailItem label="iOS 뱃지" value={push.iosBadge} />
              <DetailItem label="이미지" value={push.fname} isUrl />
              <DetailItem label="링크" value={push.link} isUrl />
            </Section>
  
            {/* 에러 정보 */}
            <Section title="에러 정보" isLast>
              <DetailItem label="Android 에러" value={push.andErrormessage} isError />
              <DetailItem label="iOS 에러" value={push.iosErrormessage} isError />
              <DetailItem label="일반 에러" value={push.errormessage} isError />
            </Section>
          </div>
        </div>
      </div>
    );
  }
  
  // 헬퍼 컴포넌트
  function Section({ title, children, isLast = false }: { 
    title: string; 
    children: React.ReactNode;
    isLast?: boolean;
  }) {
    return (
      <section className={`${!isLast ? 'border-b pb-4' : ''}`}>
        <h3 className="font-bold text-lg text-gray-700 mb-3">{title}</h3>
        <div className="space-y-2">
          {children}
        </div>
      </section>
    );
  }
  
  function DetailItem({ 
    label, 
    value, 
    isDate, 
    isError,
    isUrl,
    isBoolean,
    badge,
    badgeColor,
    bold,
    className = ''
  }: DetailItemProps) {
    if (value === null || value === undefined) return null;
  
    let displayValue = value;
    if (isDate && value) {
      displayValue = new Date(value).toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    }
    if (isBoolean) {
      displayValue = value === 'Y' ? '예' : '아니오';
    }
  
    return (
      <div className="grid grid-cols-4 gap-4 items-center">
        <div className="text-sm text-gray-500">{label}</div>
        <div className={`col-span-3 ${isError ? 'text-red-500' : ''} ${bold ? 'font-semibold' : ''} ${className}`}>
          {badge ? (
            <span className={`px-2 py-1 rounded-full text-sm ${badgeColor}`}>
              {displayValue}
            </span>
          ) : isUrl ? (
            <a 
              href={value} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 hover:underline"
            >
              {value}
            </a>
          ) : (
            displayValue
          )}
        </div>
      </div>
    );
  }
  
  // 헬퍼 함수
  function getStepColor(step?: string) {
    switch(step) {
      case 'C': return 'bg-green-100 text-green-800';
      case 'F': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
  
  function getSendStatColor(sendStat?: string) {
    switch(sendStat) {
      case '0001': return 'bg-blue-100 text-blue-800';
      case '0002': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
  
  interface DetailItemProps {
    label: string;
    value: any;
    isDate?: boolean;
    isError?: boolean;
    isUrl?: boolean;
    isBoolean?: boolean;
    badge?: boolean;
    badgeColor?: string;
    bold?: boolean;
    className?: string;
  }