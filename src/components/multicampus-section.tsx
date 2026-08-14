import { Building2, MapPin, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'

type CampusSite = {
  name: string
  icon: React.ReactNode
  here?: boolean
}

const sites: CampusSite[] = [
  { name: 'Bogotá', icon: <Building2 aria-hidden="true" className="size-5" /> },
  { name: 'Bucaramanga', icon: <MapPin aria-hidden="true" className="size-5" />, here: true },
  { name: 'Tunja', icon: <Building2 aria-hidden="true" className="size-5" /> },
  { name: 'Medellín', icon: <Building2 aria-hidden="true" className="size-5" /> },
  { name: 'Villavicencio', icon: <Building2 aria-hidden="true" className="size-5" /> },
  { name: 'Abierta y a distancia', icon: <Monitor aria-hidden="true" className="size-5" /> },
]

export function MulticampusSection() {
  return (
    <section aria-label="Sistema multicampus" className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
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

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {sites.map((site) => (
            <a
              key={site.name}
              href="#"
              className={cn(
                'flex flex-col items-center gap-3 rounded-2xl border p-5 text-center text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(14,27,60,0.12)]',
                site.here
                  ? 'border-[#07559e] bg-[#07559e] text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-[#07559e]/40 hover:text-[#07559e]'
              )}
            >
              <span
                className={cn(
                  'grid size-11 place-items-center rounded-full',
                  site.here ? 'bg-[#ffdb00] text-[#16003C]' : 'bg-slate-100 text-[#07559e]'
                )}
              >
                {site.icon}
              </span>
              {site.name}
            </a>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          La Seccional Bucaramanga es tu protagonista; los enlaces anteriores te llevan a las demás sedes y seccionales.
        </p>
      </div>
    </section>
  )
}
