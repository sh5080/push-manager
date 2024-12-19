interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    white: 'text-white'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`
        animate-spin rounded-full 
        border-2 border-current 
        border-r-transparent 
        ${sizeClasses[size]} 
        ${colorClasses[color]}
      `}>
        <span className="sr-only">로딩중...</span>
      </div>
    </div>
  );
} 