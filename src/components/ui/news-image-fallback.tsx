import { wavePath } from '@/lib/wave-path'
import { cn } from '@/lib/utils'

type FallbackVariant = {
  waveA: { y0: number; amp: number; phase: number }
  waveB: { y0: number; amp: number; phase: number }
  gradient: { x1: number; y1: number; x2: number; y2: number }
}

const VARIANTS: FallbackVariant[] = [
  {
    waveA: { y0: 150, amp: 20, phase: 0 },
    waveB: { y0: 172, amp: 14, phase: 1.6 },
    gradient: { x1: 0, y1: 0, x2: 480, y2: 270 },
  },
  {
    waveA: { y0: 118, amp: 24, phase: 2.2 },
    waveB: { y0: 146, amp: 16, phase: 0.8 },
    gradient: { x1: 480, y1: 0, x2: 0, y2: 270 },
  },
  {
    waveA: { y0: 176, amp: 18, phase: 3.1 },
    waveB: { y0: 200, amp: 12, phase: 2.0 },
    gradient: { x1: 240, y1: 270, x2: 240, y2: 0 },
  },
]

/**
 * Decorative placeholder for news items without an image. Rotates between
 * three wave compositions keyed by item id so consecutive cards differ,
 * following the multicampus-style dashed-wave language on dark institutional navy.
 */
export function NewsImageFallback({ seed }: { seed: number }) {
  const index = ((seed % VARIANTS.length) + VARIANTS.length) % VARIANTS.length
  const variant = VARIANTS[index]

  return (
    <div aria-hidden="true" className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-[#16003C]">
      <svg viewBox="0 0 480 270" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`news-fallback-gradient-${index}`} x1={variant.gradient.x1} y1={variant.gradient.y1} x2={variant.gradient.x2} y2={variant.gradient.y2} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#16003C" />
            <stop offset="1" stopColor="#07559e" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <rect width="480" height="270" fill={`url(#news-fallback-gradient-${index})`} />
        <g className="animate-wave-flow">
          <path
            d={wavePath(variant.waveA)}
            fill="none"
            stroke="#07559e"
            strokeOpacity="0.75"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeDasharray="12 9"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g className="animate-wave-flow" style={{ animationDelay: '-2.4s' }}>
          <path
            d={wavePath(variant.waveB)}
            fill="none"
            stroke="#ffdb00"
            strokeOpacity="0.85"
            strokeWidth="2"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
      <span className={cn('relative rounded-full border border-white/25 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white')}>
        Santoto al día
      </span>
    </div>
  )
}
