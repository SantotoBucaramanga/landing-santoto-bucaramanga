import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  CreditCard,
  Database,
  ExternalLink,
  GraduationCap,
  HandHeart,
  Monitor,
  ReceiptText,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

type QuickAccessVariant = 'institutional' | 'inclusion'
type CardPosition = 'previous' | 'active' | 'next'

export type QuickAccessItem = {
  title: string
  url: string
  icon: LucideIcon
  variant: QuickAccessVariant
  ariaLabel: string
}

const quickAccessItems: QuickAccessItem[] = [
  { title: 'Admisiones', url: 'https://admisiones.ustabuca.edu.co/', icon: GraduationCap, variant: 'institutional', ariaLabel: 'Abrir Admisiones en una pestaña nueva' },
  { title: 'Programas Académicos', url: 'https://www.ustabuca.edu.co/index.php/programas-academicos', icon: BookOpen, variant: 'institutional', ariaLabel: 'Abrir Programas Académicos en una pestaña nueva' },
  { title: 'Campus Virtual', url: 'https://campusvirtual.ustabuca.edu.co/', icon: Monitor, variant: 'institutional', ariaLabel: 'Abrir Campus Virtual en una pestaña nueva' },
  { title: 'Educación Continua SUMMA', url: 'https://santotosumma.edu.co/', icon: Award, variant: 'institutional', ariaLabel: 'Abrir Educación Continua SUMMA en una pestaña nueva' },
  { title: 'Género e Inclusión', url: 'https://inclusion.usta.edu.co/', icon: HandHeart, variant: 'inclusion', ariaLabel: 'Abrir Género e Inclusión en una pestaña nueva' },
  { title: 'Sistema Académico – SAC', url: 'https://oas.usta.edu.co/sgacampus/', icon: ClipboardList, variant: 'institutional', ariaLabel: 'Abrir Sistema Académico SAC en una pestaña nueva' },
  { title: 'Pagos en Línea PSE', url: 'https://pagosenlinea.usantotomas.edu.co/', icon: CreditCard, variant: 'institutional', ariaLabel: 'Abrir Pagos en Línea PSE en una pestaña nueva' },
  { title: 'Recibos Pecuniarios', url: 'https://pecuniarios.usantotomas.edu.co/', icon: ReceiptText, variant: 'institutional', ariaLabel: 'Abrir Recibos Pecuniarios en una pestaña nueva' },
  { title: 'Sistema de Gestión Académica – SIGA', url: 'https://siga.ustabuca.edu.co/', icon: Database, variant: 'institutional', ariaLabel: 'Abrir Sistema de Gestión Académica SIGA en una pestaña nueva' },
  { title: 'SIAC en Línea', url: 'https://ugicu.ustabuca.edu.co/index.php/siac-en-linea', icon: CircleHelp, variant: 'institutional', ariaLabel: 'Abrir SIAC en Línea en una pestaña nueva' },
]

const positionClasses: Record<CardPosition, string> = {
  previous: 'z-10 translate-x-[calc(-50%-64vw)] scale-[0.84] opacity-55 md:translate-x-[calc(-50%-42vw)] lg:translate-x-[calc(-50%-25rem)] lg:scale-[0.82]',
  active: 'z-20 -translate-x-1/2 scale-100 opacity-100',
  next: 'z-10 translate-x-[calc(-50%+64vw)] scale-[0.84] opacity-55 md:translate-x-[calc(-50%+42vw)] lg:translate-x-[calc(-50%+25rem)] lg:scale-[0.82]',
}

const activeCardClasses: Record<QuickAccessVariant, string> = {
  institutional: 'border-[#07559e] bg-[#07559e] text-white shadow-[0_20px_42px_rgba(0,31,79,0.25)]',
  inclusion: 'border-purple-800 bg-purple-800 text-white shadow-[0_20px_42px_rgba(43,10,68,0.25)]',
}

type QuickAccessCardProps = {
  item: QuickAccessItem
  position: CardPosition
  shouldReduceMotion: boolean | null
  onDragStart: (event: PointerEvent<HTMLDivElement>) => void
  onDragEnd: (event: PointerEvent<HTMLDivElement>) => void
  onPreventLink: () => boolean
}

export function QuickAccessCard({
  item,
  position,
  shouldReduceMotion,
  onDragStart,
  onDragEnd,
  onPreventLink,
}: QuickAccessCardProps) {
  const Icon = item.icon
  const isActive = position === 'active'
  const activeClasses = activeCardClasses[item.variant]
  const cardClasses = isActive
    ? activeClasses
    : 'border-slate-200 bg-white text-[#07559e] shadow-[0_12px_28px_rgba(0,31,79,0.1)]'

  const content = (
    <>
      <span className={`grid size-14 place-items-center rounded-2xl ${isActive && item.variant === 'inclusion' ? 'bg-white text-purple-800' : isActive ? 'bg-[#ffdb00] text-[#16003C]' : 'bg-[#07559e]/10 text-[#07559e]'}`}>
        <Icon aria-hidden="true" className="size-7" strokeWidth={2.25} />
      </span>
      <span className="mt-5 line-clamp-3 text-center text-lg font-bold leading-[1.1] tracking-tight sm:text-xl">{item.title}</span>
      {isActive && <ExternalLink aria-hidden="true" className="absolute right-5 top-5 size-4 opacity-65" strokeWidth={2.25} />}
    </>
  )

  const sharedClasses = `absolute left-1/2 top-3 flex h-[13.5rem] w-[76vw] max-w-[23rem] select-none flex-col items-center justify-center overflow-hidden rounded-[1.35rem] border px-8 py-6 text-center will-change-transform md:h-[14rem] md:w-[52vw] lg:top-5 lg:h-[13.5rem] lg:w-[23rem] ${positionClasses[position]} ${shouldReduceMotion ? 'transition-none' : 'transition-[transform,opacity] duration-500 ease-out'} ${cardClasses}`

  if (!isActive) {
    return (
      <motion.div
        aria-hidden="true"
        animate={{ opacity: shouldReduceMotion ? undefined : 0.55 }}
        className={sharedClasses}
        transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
      >
        {content}
      </motion.div>
    )
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={sharedClasses}
      onPointerDown={onDragStart}
      onPointerUp={onDragEnd}
      onPointerCancel={onDragEnd}
      onClickCapture={(event) => {
        if (onPreventLink()) {
          event.preventDefault()
          event.stopPropagation()
        }
      }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
    >
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.ariaLabel}
        className="absolute inset-0 rounded-[inherit] focus-visible:outline-4 focus-visible:outline-[#ffd900] focus-visible:outline-offset-4"
      >
        <span className="sr-only">{item.title}</span>
      </a>
      <span aria-hidden="true" className="pointer-events-none flex flex-col items-center">{content}</span>
    </motion.div>
  )
}

type CarouselArrowProps = {
  direction: 'previous' | 'next'
  onClick: () => void
}

export function CarouselArrow({ direction, onClick }: CarouselArrowProps) {
  const isPrevious = direction === 'previous'
  const Icon = isPrevious ? ChevronLeft : ChevronRight

  return (
    <button
      type="button"
      aria-label={isPrevious ? 'Acceso anterior' : 'Acceso siguiente'}
      onClick={onClick}
      className={`absolute top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#ffdb00] text-[#07559e] shadow-[0_6px_16px_rgba(0,31,79,0.2)] transition-transform hover:scale-105 focus-visible:outline-4 focus-visible:outline-[#07559e] focus-visible:outline-offset-4 active:scale-95 sm:size-12 ${isPrevious ? 'left-3 sm:left-5 lg:left-[max(1.25rem,calc(50%-37rem))]' : 'right-3 sm:right-5 lg:right-[max(1.25rem,calc(50%-37rem))]'}`}
    >
      <Icon aria-hidden="true" className="size-7" strokeWidth={2.75} />
    </button>
  )
}

type CarouselPaginationProps = {
  activeIndex: number
  onSelect: (index: number) => void
}

export function CarouselPagination({ activeIndex, onSelect }: CarouselPaginationProps) {
  return (
    <div className="mt-5 flex justify-center gap-2" aria-label="Seleccionar acceso rápido">
      {quickAccessItems.map((item, index) => {
        const isActive = index === activeIndex
        return (
          <button
            key={item.title}
            type="button"
            aria-label={`Mostrar acceso ${index + 1} de ${quickAccessItems.length}: ${item.title}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => onSelect(index)}
            className={`grid size-11 place-items-center rounded-full focus-visible:outline-4 focus-visible:outline-[#07559e] focus-visible:outline-offset-2 ${isActive ? '' : 'hover:bg-slate-100'}`}
          >
            <span aria-hidden="true" className={`block rounded-full transition-[width,height,background-color] ${isActive ? 'size-3 bg-[#ffdb00]' : 'size-2.5 bg-slate-300 hover:bg-slate-400'}`} />
          </button>
        )
      })}
    </div>
  )
}

export function QuickAccessCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const dragStartX = useRef<number | null>(null)
  const shouldPreventLink = useRef(false)

  const select = (index: number) => setActiveIndex((index + quickAccessItems.length) % quickAccessItems.length)
  const previousIndex = (activeIndex - 1 + quickAccessItems.length) % quickAccessItems.length
  const nextIndex = (activeIndex + 1) % quickAccessItems.length

  const beginDrag = (event: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX
    shouldPreventLink.current = false
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return
    const distance = event.clientX - dragStartX.current
    dragStartX.current = null

    if (Math.abs(distance) < 36) return
    shouldPreventLink.current = true
    select(distance > 0 ? activeIndex - 1 : activeIndex + 1)
  }

  const preventLinkAfterDrag = () => {
    const prevent = shouldPreventLink.current
    shouldPreventLink.current = false
    return prevent
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      select(activeIndex - 1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      select(activeIndex + 1)
    }
  }

  return (
    <section
      aria-label="Accesos rápidos"
      aria-roledescription="carrusel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full overflow-hidden bg-white px-6 py-12 text-[#07559e] outline-none focus-visible:ring-4 focus-visible:ring-[#ffdb00] focus-visible:ring-inset sm:px-8 sm:py-14 lg:px-10 lg:py-16"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
        <div className="max-w-xl">
          <p aria-hidden="true" className="mb-4 h-1 w-10 rounded-full bg-[#ffdb00]" />
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]">
            Accesos rápidos
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
            Enlaces directos a los servicios y trámites más utilizados de la Universidad Santo Tomás, Seccional Bucaramanga.
          </p>
        </div>
        <div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Acceso {activeIndex + 1} de {quickAccessItems.length}: {quickAccessItems[activeIndex].title}
          </p>
          <div className="relative mx-auto h-[15.75rem] max-w-[75rem] md:h-[16.5rem] lg:h-[17rem]">
          {[
            { index: previousIndex, position: 'previous' as const },
            { index: activeIndex, position: 'active' as const },
            { index: nextIndex, position: 'next' as const },
          ].map(({ index, position }) => (
            <QuickAccessCard
              key={index}
              item={quickAccessItems[index]}
              position={position}
              shouldReduceMotion={shouldReduceMotion}
              onDragStart={beginDrag}
              onDragEnd={endDrag}
              onPreventLink={preventLinkAfterDrag}
            />
          ))}
          <CarouselArrow direction="previous" onClick={() => select(activeIndex - 1)} />
          <CarouselArrow direction="next" onClick={() => select(activeIndex + 1)} />
        </div>
          <CarouselPagination activeIndex={activeIndex} onSelect={select} />
        </div>
      </div>
    </section>
  )
}

export function QuickAccessSection() {
  return <QuickAccessCarousel />
}
