import { useState } from 'react'
import bogota1 from '@/assets/media/sedes/sede-bogota-1.webp'
import bogota2 from '@/assets/media/sedes/sede-bogota-2.webp'
import tunja1 from '@/assets/media/sedes/sede-tunja-1.webp'
import tunja2 from '@/assets/media/sedes/sede-tunja-2.webp'
import villavicencio1 from '@/assets/media/sedes/sede-villavicencio-1.webp'
import villavicencio2 from '@/assets/media/sedes/sede-villavicencio-2.webp'
import duad1 from '@/assets/media/sedes/sede-duad-1.webp'
import duad2 from '@/assets/media/sedes/sede-duad-2.webp'

type CampusSite = {
  name: string
  href?: string
  image?: { base: string; hover: string }
}

const sites: CampusSite[] = [
  {
    name: 'Bogotá',
    href: 'https://www.usta.edu.co/',
    image: { base: bogota1, hover: bogota2 },
  },
  {
    name: 'Tunja',
    href: 'https://www.santototunja.edu.co/',
    image: { base: tunja1, hover: tunja2 },
  },
  {
    name: 'Villavicencio',
    href: 'https://www.ustavillavicencio.edu.co/',
    image: { base: villavicencio1, hover: villavicencio2 },
  },
  {
    name: 'Abierta y a distancia',
    href: 'https://usantotomas.edu.co/centros-de-atencion-universitaria',
    image: { base: duad1, hover: duad2 },
  },
]

const arcOffsets = ['mt-0', 'mt-0', 'mt-0', 'mt-0']

function wavePath(opts: { y0: number; amp: number; phase: number }) {
  const { y0, amp, phase } = opts
  const start = -290
  const end = 1450
  const period = 145
  const waves = (end - start) / period
  const steps = 220
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = start + (end - start) * t
    const y = y0 + amp * Math.sin(t * waves * 2 * Math.PI + phase)
    d += (i === 0 ? 'M ' : ' L ') + x.toFixed(1) + ' ' + y.toFixed(1)
  }
  return d
}

function SiteCard({ site, arc }: { site: CampusSite; arc: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={site.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${site.name}, se abre en una pestaña nueva`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
        className={`block outline-none transition hover:-translate-y-1 hover:drop-shadow-[0_12px_28px_rgba(14,27,60,0.25)] focus-visible:ring-4 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${arc}`}
    >
      <img
        src={hovered ? site.image!.hover : site.image!.base}
        alt=""
        aria-hidden="true"
        width={200}
        height={188}
        loading="lazy"
        draggable={false}
        className="h-[188px] w-[200px] max-w-full object-contain transition-opacity duration-300"
      />
    </a>
  )
}

export function MulticampusSection() {
  return (
    <section aria-label="Sistema multicampus" className="relative w-full overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-2xl text-center">
          <p aria-hidden="true" className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#ffdb00]" />
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#07559e]">Sistema multicampus</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#07559e] sm:text-4xl lg:text-[2.6rem]">
            Una universidad, múltiples territorios
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            La Santoto hace presencia nacional. Desde Bucaramanga, conectamos con toda la red institucional.
          </p>
        </div>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1200 240"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-36 h-[15rem] w-full sm:top-40 lg:top-44"
      >
        <g className="animate-wave-flow">
          <path
            d={wavePath({ y0: 152, amp: 18, phase: 0 })}
            fill="none"
            stroke="#07559e"
            strokeOpacity="0.45"
            strokeWidth="4"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g className="animate-wave-flow">
          <path
            d={wavePath({ y0: 167, amp: 14, phase: 1.4 })}
            fill="none"
            stroke="#ffdb00"
            strokeOpacity="0.85"
            strokeWidth="2.5"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>

      <div className="relative mx-auto mt-4 max-w-[1440px]">
        <div className="relative flex flex-wrap items-start justify-center gap-4">
          {sites.map((site, i) => (
            <SiteCard key={site.name} site={site} arc={arcOffsets[i] ?? 'mt-0'} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px]">
        <p className="mt-6 text-center text-sm text-slate-500">
          Conoce las demás sedes y seccionales de la Universidad Santo Tomás.
        </p>
      </div>
    </section>
  )
}
