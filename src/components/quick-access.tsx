import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from 'react'
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
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type PanInfo,
} from 'motion/react'

type QuickAccessVariant = 'institutional' | 'inclusion'

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

const count = quickAccessItems.length

const activeCardClasses: Record<QuickAccessVariant, string> = {
  institutional: 'border-white bg-white text-[#07559e] shadow-[0_2px_6px_rgba(0,31,79,0.16),0_20px_40px_rgba(0,31,79,0.32)]',
  inclusion: 'border-white/25 bg-purple-800 text-white shadow-[0_2px_6px_rgba(43,10,68,0.24),0_20px_40px_rgba(43,10,68,0.42)]',
}

const inactiveCardClasses: Record<QuickAccessVariant, string> = {
  institutional: 'border-[#88b2d8] bg-[#82abd0] text-[#07559e] shadow-[0_10px_24px_rgba(0,31,79,0.16)]',
  inclusion: 'border-white/20 bg-purple-800 text-white shadow-[0_10px_24px_rgba(43,10,68,0.28)]',
}

const cardBaseClasses =
  'absolute left-1/2 top-3 flex h-[13.5rem] w-[76vw] max-w-[23rem] -translate-x-1/2 select-none flex-col items-center justify-center overflow-hidden rounded-[1.5rem] border px-8 py-6 text-center will-change-transform md:h-[14rem] md:w-[52vw] lg:top-5 lg:h-[13.5rem] lg:w-[23rem]'

const springSettle = { type: 'spring' as const, stiffness: 280, damping: 30, mass: 0.9 }

function useCardGap(containerRef: RefObject<HTMLDivElement | null>) {
  const gap = useMotionValue(320)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const update = () => {
      const width = node.getBoundingClientRect().width
      gap.set(Math.round(Math.min(400, Math.max(232, width * 0.42))))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [containerRef, gap])

  return gap
}

type StackCardProps = {
  item: QuickAccessItem
  index: number
  isActive: boolean
  progress: MotionValue<number>
  gap: MotionValue<number>
}

function StackCard({ item, index, isActive, progress, gap }: StackCardProps) {
  const Icon = item.icon
  const distance = useTransform(progress, (latest) => latest - index)
  const x = useTransform(() => distance.get() * gap.get())
  const y = useTransform(() => -Math.abs(distance.get()) * 8)
  const scale = useTransform(() => 1 - Math.min(1, Math.abs(distance.get())) * 0.16)
  const rotate = useTransform(() => Math.max(-1, Math.min(1, distance.get())) * 2.5)
  const opacity = useTransform(distance, [-1.6, -1, 0, 1, 1.6], [0, 0.55, 1, 0.55, 0])
  const zIndex = useTransform(distance, (latest) => Math.max(0, 20 - Math.round(Math.abs(latest)) * 5))

  const contentX = useTransform(x, (latest) => latest * 0.3)
  const contentScale = useTransform(scale, (latest) => 1 + (latest - 1) * 0.45)

  const surface = isActive ? activeCardClasses[item.variant] : inactiveCardClasses[item.variant]
  const chip = isActive
    ? item.variant === 'inclusion'
      ? 'bg-white text-purple-800 shadow-[0_6px_14px_rgba(43,10,68,0.28)]'
      : 'bg-[#0699df] text-white shadow-[0_6px_14px_rgba(6,153,223,0.35)]'
    : 'bg-[#0799dc]/18 text-[#078cd0]'

  return (
    <motion.div
      aria-hidden={!isActive}
      style={{ x, y, scale, rotate, opacity, zIndex }}
      className={`${cardBaseClasses} ${surface} ${isActive ? 'group' : ''}`}
    >
      <motion.div
        style={{ x: contentX, scale: contentScale }}
        className="pointer-events-none flex flex-col items-center"
      >
        <span
          className={`grid size-14 place-items-center rounded-2xl transition-transform duration-300 ease-out ${chip} ${isActive ? 'group-hover:scale-105 group-active:scale-95' : ''}`}
        >
          <Icon aria-hidden="true" className="size-7" strokeWidth={2.25} />
        </span>
        <span
          className={`mt-5 line-clamp-3 text-center font-bold leading-[1.1] tracking-tight ${isActive ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}
        >
          {item.title}
        </span>
        <ExternalLink
          aria-hidden="true"
          className={`absolute right-5 top-5 size-4 transition-opacity duration-300 ${isActive ? 'opacity-65 group-hover:opacity-100' : 'opacity-50'}`}
          strokeWidth={2.25}
        />
      </motion.div>
      {isActive && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.ariaLabel}
          draggable={false}
          className="absolute inset-0 cursor-pointer rounded-[inherit] focus-visible:outline-4 focus-visible:outline-[#ffdb00] focus-visible:outline-offset-4"
        >
          <span className="sr-only">{item.title}</span>
        </a>
      )}
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
      className={`absolute top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#ffdb00] text-[#07559e] shadow-[0_6px_16px_rgba(0,31,79,0.28)] transition-[transform,background-color] hover:scale-105 hover:bg-[#f3d257] focus-visible:outline-4 focus-visible:outline-white focus-visible:outline-offset-4 active:scale-95 sm:size-12 ${isPrevious ? 'left-3 sm:left-5 lg:left-[max(1.25rem,calc(50%-37rem))]' : 'right-3 sm:right-5 lg:right-[max(1.25rem,calc(50%-37rem))]'}`}
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
            aria-label={`Mostrar acceso ${index + 1} de ${count}: ${item.title}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => onSelect(index)}
            className={`group grid size-11 place-items-center rounded-full focus-visible:outline-4 focus-visible:outline-white focus-visible:outline-offset-2 ${isActive ? '' : 'hover:bg-white/15'}`}
          >
            <span aria-hidden="true" className={`block rounded-full transition-[width,height,background-color] ${isActive ? 'size-3 bg-[#ffdb00]' : 'size-2.5 bg-white/75 group-hover:bg-white'}`} />
          </button>
        )
      })}
    </div>
  )
}

export function QuickAccessCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const isReduced = shouldReduceMotion === true

  const deckRef = useRef<HTMLDivElement>(null)
  const gap = useCardGap(deckRef)
  const progress = useMotionValue(activeIndex)
  const dragX = useMotionValue(0)
  const indexRef = useRef(0)
  const draggedRef = useRef(false)
  const dragStartX = useRef<number | null>(null)

  const goTo = (target: number) => {
    const next = ((target % count) + count) % count
    if (next === indexRef.current) return
    indexRef.current = next
    setActiveIndex(next)
    if (isReduced) {
      progress.jump(next)
      dragX.jump(0)
      return
    }
    animate(progress, next, springSettle)
    animate(dragX, 0, springSettle)
  }

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    const distance = info.offset.x
    const velocity = info.velocity.x
    draggedRef.current = Math.abs(distance) > 6 || Math.abs(velocity) > 240

    const shouldAdvance = Math.abs(distance) > 56 || Math.abs(velocity) > 480
    if (shouldAdvance) {
      const delta = Math.abs(distance) > 56 ? (distance < 0 ? 1 : -1) : velocity < 0 ? 1 : -1
      goTo(indexRef.current + delta)
    } else if (!isReduced) {
      animate(dragX, 0, springSettle)
    }
  }

  const preventLinkAfterDrag = () => {
    const prevent = draggedRef.current
    draggedRef.current = false
    return prevent
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(activeIndex - 1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(activeIndex + 1)
    }
  }

  return (
    <section
      aria-label="Accesos rápidos"
      aria-roledescription="carrusel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full overflow-hidden bg-[#07559e] px-6 py-12 text-white outline-none focus-visible:ring-4 focus-visible:ring-[#ffdb00] focus-visible:ring-inset sm:px-8 sm:py-14 lg:px-10 lg:py-16"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
        <div className="max-w-xl">
          <p aria-hidden="true" className="mb-4 h-1 w-10 rounded-full bg-[#ffdb00]" />
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]">
            Accesos rápidos
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
            Enlaces directos a los servicios y trámites más utilizados de la Universidad Santo Tomás, Seccional Bucaramanga.
          </p>
        </div>
        <div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Acceso {activeIndex + 1} de {count}: {quickAccessItems[activeIndex].title}
          </p>
          <div ref={deckRef} className="relative mx-auto h-[15.75rem] max-w-[75rem] md:h-[16.5rem] lg:h-[17rem]">
            <motion.div
              className="absolute inset-0 z-10 cursor-grab touch-pan-y select-none active:cursor-grabbing"
              style={{ x: dragX, touchAction: 'pan-y' }}
              drag={isReduced ? false : 'x'}
              dragMomentum={false}
              onPointerDownCapture={(event) => {
                draggedRef.current = false
                dragStartX.current = event.clientX
              }}
              onPointerUpCapture={(event) => {
                if (dragStartX.current !== null) {
                  if (Math.abs(event.clientX - dragStartX.current) > 6) {
                    draggedRef.current = true
                  }
                  dragStartX.current = null
                }
              }}
              onPointerCancelCapture={() => {
                dragStartX.current = null
                draggedRef.current = false
              }}
              onDragStart={() => {
                draggedRef.current = false
              }}
              onDragEnd={handleDragEnd}
              onClickCapture={(event) => {
                if (preventLinkAfterDrag()) {
                  event.preventDefault()
                  event.stopPropagation()
                }
              }}
            >
              {quickAccessItems.map((item, index) => (
                <StackCard
                  key={item.title}
                  item={item}
                  index={index}
                  isActive={index === activeIndex}
                  progress={progress}
                  gap={gap}
                />
              ))}
            </motion.div>
            <CarouselArrow direction="previous" onClick={() => goTo(activeIndex - 1)} />
            <CarouselArrow direction="next" onClick={() => goTo(activeIndex + 1)} />
          </div>
          <CarouselPagination activeIndex={activeIndex} onSelect={goTo} />
        </div>
      </div>
    </section>
  )
}

export function QuickAccessSection() {
  return <QuickAccessCarousel />
}
