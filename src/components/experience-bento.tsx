import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import bento256541 from '@/assets/media/bento/bento-256541.webp'
import bento4226140 from '@/assets/media/bento/bento-4226140.webp'
import bento1190298 from '@/assets/media/bento/bento-1190298.webp'
import bento1552242 from '@/assets/media/bento/bento-1552242.webp'
import bento256247 from '@/assets/media/bento/bento-256247.webp'
import bento159711 from '@/assets/media/bento/bento-159711.webp'
import bento8199562 from '@/assets/media/bento/bento-8199562.webp'

type ExperienceItem = {
  tag: string
  caption: string
  src: string
  alt: string
  className: string
  delay: number
}

const experienceItems: ExperienceItem[] = [
  {
    tag: 'Campus',
    caption: 'Campus El Bosque',
    src: bento256541,
    alt: 'Campus El Bosque de la Universidad Santo Tomás',
    className: 'md:col-span-2 md:row-span-2',
    delay: 0,
  },
  {
    tag: 'Laboratorios',
    caption: 'Prácticas en salud',
    src: bento4226140,
    alt: 'Prácticas de laboratorio en salud',
    className: 'md:col-span-2',
    delay: 0.1,
  },
  {
    tag: 'Cultura',
    caption: 'Grupos artísticos',
    src: bento1190298,
    alt: 'Grupos artísticos de la comunidad tomasina',
    className: 'md:col-span-2',
    delay: 0.15,
  },
  {
    tag: 'Deporte',
    caption: 'Escenarios deportivos',
    src: bento1552242,
    alt: 'Escenarios deportivos universitarios',
    className: 'md:col-span-2',
    delay: 0.2,
  },
  {
    tag: 'Investigación',
    caption: 'Semilleros',
    src: bento256247,
    alt: 'Semilleros de investigación',
    className: 'md:col-span-2',
    delay: 0.25,
  },
  {
    tag: 'Biblioteca',
    caption: 'CRAI — Centro de Recursos para el Aprendizaje y la Investigación',
    src: bento159711,
    alt: 'Biblioteca CRAI de la Universidad Santo Tomás',
    className: 'md:col-span-3',
    delay: 0.3,
  },
  {
    tag: 'Vida universitaria',
    caption: 'Comunidad tomasina',
    src: bento8199562,
    alt: 'Comunidad estudiantil de la Universidad Santo Tomás',
    className: 'md:col-span-3',
    delay: 0.35,
  },
]

export function ExperienceBento() {
  const reduce = useReducedMotion()

  return (
    <section aria-label="Experiencia Santo Tomás" className="w-full bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-3xl text-center">
          <p aria-hidden="true" className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#ffdb00]" />
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#07559e]">Experiencia Santo Tomás</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#07559e] sm:text-4xl lg:text-[2.6rem]">
            La vida universitaria en imágenes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Campus, laboratorios, cultura, deporte e investigación: así se vive la Santoto en Bucaramanga.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[200px]">
          {experienceItems.map((item) => (
            <motion.article
              key={item.caption}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm',
                item.className
              )}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: item.delay }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#16003C]/85 via-[#16003C]/10 to-transparent" />
              <span className="absolute left-3 top-3 z-10 rounded-full bg-[#ffdb00] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#16003C]">
                {item.tag}
              </span>
              <span className="absolute bottom-3 left-3 z-10 max-w-[calc(100%-1.5rem)] text-sm font-semibold leading-snug text-white drop-shadow">
                {item.caption}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
