import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type FormationPathItem = {
  id: string
  category: string
  title: string
  description: string
  cta: string
  href: string
  src: string
  alt: string
}

const formationItems: FormationPathItem[] = [
  {
    id: '01',
    category: 'Pregrados',
    title: 'Pregrados',
    description: '10 semestres · presencial',
    cta: 'Ver pregrados',
    href: 'https://pregrados.ustabuca.edu.co/',
    src: 'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Estudiantes de pregrado en un aula de la Universidad Santo Tomás',
  },
  {
    id: '02',
    category: 'Posgrados',
    title: 'Posgrados',
    description: 'Especializaciones y maestrías',
    cta: 'Ver posgrados',
    href: 'https://posgrados.ustabuca.edu.co/',
    src: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Libros de consulta para la profundización académica',
  },
  {
    id: '03',
    category: 'Programas virtuales',
    title: 'Virtuales',
    description: 'Modalidad virtual y a distancia',
    cta: 'Ver virtuales',
    href: 'https://santotovirtual.edu.co/',
    src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Estudiante virtual estudiando con su computador',
  },
  {
    id: '04',
    category: 'Educación continua',
    title: 'SUMMA',
    description: 'Cursos, diplomados y seminarios',
    cta: 'Ver SUMMA',
    href: 'https://santotosumma.edu.co/',
    src: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Seminario de educación continua para profesionales',
  },
]

export function FormationPaths() {
  const [activeId, setActiveId] = useState<string>('01')
  const shouldReduceMotion = useReducedMotion()
  const motionClass = shouldReduceMotion
    ? 'transition-none'
    : 'transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]'

  return (
    <section
      aria-label="Explora por formación"
      className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-2xl">
          <p aria-hidden="true" className="mb-4 h-1 w-12 rounded-full bg-[#ffdb00]" />
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#07559e] sm:text-4xl lg:text-[2.6rem]">
            Explora por formación
          </h2>
          <p className="mt-3 text-xl font-semibold leading-snug text-[#07559e]/85 sm:text-2xl">
            Una ruta para cada etapa de tu vida
          </p>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Desde tu primer pregrado hasta tu crecimiento profesional continuo.
          </p>
        </div>
      </div>

      {/* Container: Fixed height on mobile/desktop to ensure animation stability */}
      <div className="mx-auto mt-10 flex h-[560px] w-full max-w-6xl flex-col gap-2 px-4 sm:mt-12 sm:px-6 md:h-[620px] md:flex-row md:gap-4 lg:px-0">
        {formationItems.map((item) => {
          const isActive = activeId === item.id

          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              className={cn(
                'relative cursor-pointer overflow-hidden rounded-2xl border',
                // Layout & Flex Transition
                motionClass,
                // Flex Logic: active takes 4 parts, inactive 1 part (accordion effect)
                isActive ? 'flex-[4]' : 'flex-[1]',
                // Brightness logic for focus
                isActive ? 'brightness-100' : 'brightness-50 hover:brightness-75',
                // Brand border emphasis
                isActive ? 'border-[#ffdb00]/80' : 'border-neutral-200'
              )}
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 size-full">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className={cn(
                    'size-full object-cover',
                    shouldReduceMotion ? 'transition-none' : 'transition-transform duration-1000',
                    // Subtle zoom on active
                    isActive ? 'scale-100' : 'scale-110'
                  )}
                />
                {/* Gradient Overlay for Text Readability */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent',
                    shouldReduceMotion ? 'transition-none' : 'transition-opacity duration-500',
                    isActive ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </div>

              {/* Content Container */}
              <div className="absolute inset-x-0 bottom-0 flex h-full flex-col justify-end p-4 md:p-8">
                {/* Active Content: Category, Title & CTA */}
                <div
                  className={cn(
                    'flex flex-col gap-2',
                    shouldReduceMotion ? 'transition-none' : 'transition-all duration-500',
                    isActive
                      ? 'translate-y-0 opacity-100 delay-200'
                      : 'translate-y-12 opacity-0'
                  )}
                >
                  <span className="w-fit rounded-full bg-[#ffdb00] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#16003C] md:px-3 md:text-xs">
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-black uppercase leading-none text-white md:text-4xl lg:text-5xl">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-white/90 md:text-base">
                    {item.description}
                  </p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.cta}, se abre en una pestaña nueva`}
                    className="mt-2 flex w-fit items-center gap-2 rounded-full text-xs font-bold uppercase tracking-widest text-white outline-none transition-colors hover:text-[#ffdb00] focus-visible:outline-4 focus-visible:outline-[#ffdb00] focus-visible:outline-offset-4 md:mt-4 md:text-sm"
                  >
                    {item.cta}
                    <ArrowUpRight aria-hidden="true" className="size-3 md:size-4" />
                  </a>
                </div>

                {/* Inactive Content: Vertical Text (Desktop) / Short Label (Mobile) */}
                <div
                  className={cn(
                    'absolute',
                    // Position logic
                    'bottom-4 left-1/2 -translate-x-1/2 md:bottom-8',
                    shouldReduceMotion ? 'transition-none' : 'transition-all duration-500',
                    // Hide when active
                    isActive ? 'opacity-0 scale-50' : 'opacity-100 delay-500'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="hidden whitespace-nowrap text-xl font-bold uppercase tracking-widest text-white [writing-mode:vertical-rl] md:block"
                  >
                    {item.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="block text-xs font-bold text-white md:hidden"
                  >
                    {item.id}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
