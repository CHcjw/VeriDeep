type VeriDeepMarkProps = {
  size?: number
  className?: string
  animated?: boolean
}

export function VeriDeepMark({ size = 22, className = '', animated = false }: VeriDeepMarkProps) {
  const pulseClass = animated ? 'animate-pulse' : ''

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5.5 8.5L12.9 25.5L16 17.2L19.1 25.5L26.5 8.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9.5C12.5 7.1 19.5 7.1 22 9.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M8 5.8C12.4 2.8 19.6 2.8 24 5.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity=".55"
      />
      <circle cx="16" cy="14.5" r="2.1" fill="currentColor" className={pulseClass} />
      <path
        d="M12.5 29H19.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity=".7"
      />
    </svg>
  )
}
