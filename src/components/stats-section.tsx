import { ShieldCheck } from 'lucide-react'

type StatItem = {
  label: string
  value: string
  note: string
}

const stats: StatItem[] = [
  { label: 'Estudiantes activos', value: '—', note: 'Por confirmar' },
  { label: 'Graduados tomasinos', value: '—', note: 'Por confirmar' },
  { label: 'Programas académicos', value: '—', note: 'Por confirmar' },
  { label: 'Años de tradición tomasina', value: '440+', note: 'Orden de Predicadores' },
]

export function StatsSection() {
  return (
    <section aria-label="La Santoto en cifras" className="w-full bg-[#16003C] px-4 py-12 text-white sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ffdb00]">Impacto institucional</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
            La Santoto en cifras
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Indicadores referenciales de la Seccional Bucaramanga. Valores por confirmar con la fuente oficial.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex h-56 flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-6"
            >
              <p className="text-sm text-white/70">{stat.label}</p>
              <div>
                <div className="text-5xl font-bold leading-none text-[#ffdb00] lg:text-6xl">{stat.value}</div>
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/60">
                  <ShieldCheck aria-hidden="true" className="size-3.5 text-[#ffdb00]" />
                  {stat.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
