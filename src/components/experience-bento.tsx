import { ArrowRight, CalendarDays } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import newsInterdisciplinariedad from '@/assets/media/news/news-interdisciplinariedad.webp'
import newsSaludVisual from '@/assets/media/news/news-salud-visual.webp'
import newsInvestigacion from '@/assets/media/news/news-investigacion.webp'

type NewsItem = {
  category: string
  title: string
  description: string
  date: string
  author: string
  image: string
  alt: string
  className: string
  delay: number
}

const newsItems: NewsItem[] = [
  {
    category: 'Academia',
    title: 'La interdisciplinariedad como eje de la formación en la Santoto',
    description:
      'Estudiantes y docentes integran saberes para responder a los retos reales de la región con una mirada integral.',
    date: '12 de agosto, 2026',
    author: 'Dirección de Comunicaciones',
    image: newsInterdisciplinariedad,
    alt: 'Estudiantes y docentes en un espacio de aprendizaje colaborativo',
    className: 'md:col-span-4 md:row-span-2',
    delay: 0,
  },
  {
    category: 'Proyección social',
    title: 'Una alianza que transforma vidas a través de la salud visual',
    description:
      'La Santoto y aliados regionales acercan la salud visual a comunidades con menos acceso.',
    date: '9 de agosto, 2026',
    author: 'Dirección de Comunicaciones',
    image: newsSaludVisual,
    alt: 'Jornada de salud visual con la comunidad',
    className: 'md:col-span-2',
    delay: 0.1,
  },
  {
    category: 'Investigación',
    title: 'El diálogo entre investigadores fortalece la construcción de conocimiento',
    description:
      'Encuentros académicos que conectan grupos y semilleros de la Seccional.',
    date: '5 de agosto, 2026',
    author: 'Dirección de Comunicaciones',
    image: newsInvestigacion,
    alt: 'Investigadores en diálogo académico',
    className: 'md:col-span-2',
    delay: 0.2,
  },
]

export function ExperienceBento() {
  const reduce = useReducedMotion()

  return (
    <section aria-label="Noticias" className="w-full bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-3xl text-center">
          <p aria-hidden="true" className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#ffdb00]" />
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#07559e]">Santoto al día</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#07559e] sm:text-4xl lg:text-[2.6rem]">
            Noticias
          </h2>
          <Link
            to="/noticias"
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[#07559e] outline-none transition hover:text-[#0699df] focus-visible:ring-2 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2"
          >
            Ver todas las noticias
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[220px]">
          {newsItems.map((item) => (
            <motion.article
              key={item.title}
              className={cn(
                'group relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm',
                item.className,
              )}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: item.delay }}
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#16003C]/90 via-[#16003C]/25 to-transparent" />
              <div className="relative z-10 flex flex-col gap-2 p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#ffdb00] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#16003C]">
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/85">
                    <CalendarDays aria-hidden="true" className="size-3.5" />
                    {item.date}
                  </span>
                </div>
                <h3
                  className={cn(
                    'font-bold leading-tight tracking-tight text-white drop-shadow',
                    item.className.includes('row-span-2') ? 'text-2xl sm:text-3xl' : 'text-lg',
                  )}
                >
                  {item.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
