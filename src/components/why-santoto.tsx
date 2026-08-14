import { Building2, FlaskConical, Globe, HeartHandshake, ShieldCheck, Users, type LucideIcon } from 'lucide-react'

type ReasonItem = {
  icon: LucideIcon
  title: string
  description: string
}

const reasons: ReasonItem[] = [
  {
    icon: ShieldCheck,
    title: 'Calidad y acreditación',
    description: 'Programas con acreditación de alta calidad y una trayectoria de más de 440 años de la tradición tomasina.',
  },
  {
    icon: FlaskConical,
    title: 'Investigación con impacto',
    description: 'Grupos y semilleros que generan conocimiento y soluciones para Santander y el país.',
  },
  {
    icon: Globe,
    title: 'Internacionalización',
    description: 'Convenios y movilidad académica para que tu formación tenga alcance global.',
  },
  {
    icon: HeartHandshake,
    title: 'Bienestar integral',
    description: 'Acompañamiento en salud, cultura, deporte y crecimiento personal durante toda tu vida universitaria.',
  },
  {
    icon: Building2,
    title: 'Infraestructura',
    description: 'Campus en Bucaramanga, Floridablanca y Piedecuesta con espacios para el aprendizaje y la convivencia.',
  },
  {
    icon: Users,
    title: 'Comunidad y empleabilidad',
    description: 'Red de graduados, aliados financieros y proyección profesional que te acompañan más allá del aula.',
  },
]

export function WhySantoto() {
  return (
    <section aria-label="Por qué estudiar en la Santoto" className="w-full bg-slate-50 px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-2xl text-center">
          <p aria-hidden="true" className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#ffdb00]" />
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#07559e]">Razones para elegirnos</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#07559e] sm:text-4xl lg:text-[2.6rem]">
            Por qué estudiar en la Santoto
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            No es solo un título: es una formación integral que combina excelencia académica, fe y servicio.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <article
                key={reason.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-700 -skew-y-[2deg] grayscale hover:-translate-y-1 hover:skew-y-0 hover:grayscale-0 hover:border-[#07559e]/25 hover:shadow-[0_18px_44px_rgba(14,27,60,0.14)]"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-[#ffdb00]/25 text-[#16003C] transition-colors duration-700 group-hover:bg-[#ffdb00]">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={2.25} />
                </span>
                <div className="mt-4">
                  <h3 className="text-lg font-bold leading-snug text-[#07559e]">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{reason.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
