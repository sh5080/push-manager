export function formatDate(date: Date | undefined) {
  if (!date) return '-';
  return new Date(date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export function getStatusStyle(step?: string) {
  switch(step) {
    case 'C': return 'bg-green-50 text-green-700';
    case 'F': return 'bg-red-50 text-red-700';
    default: return 'bg-gray-50 text-gray-700';
  }
}

export function getStatusDotStyle(step?: string) {
  switch(step) {
    case 'C': return 'bg-green-400';
    case 'F': return 'bg-red-400';
    default: return 'bg-gray-400';
  }
}

export function getStatusText(step?: string) {
  switch(step) {
    case 'C': return '완료';
    case 'F': return '실패';
    default: return '대기';
  }
} 