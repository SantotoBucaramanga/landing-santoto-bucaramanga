import type { LucideIcon } from 'lucide-react'
import {
  Award,
  BookOpen,
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
import { cn } from '@/lib/utils'

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

type QuickAccessCardProps = {
  item: QuickAccessItem
}

export function QuickAccessCard({ item }: QuickAccessCardProps) {
  const Icon = item.icon
  const isInclusion = item.variant === 'inclusion'

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.ariaLabel}
      className={cn(
        'group relative flex h-32 flex-col items-center justify-center gap-2 rounded-[1.25rem] border p-4 text-center outline-none transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out hover:-translate-y-1 active:translate-y-0 focus-visible:ring-4 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16003C]',
        isInclusion
          ? 'border-white/25 bg-purple-800 text-white shadow-[0_2px_6px_rgba(43,10,68,0.3),0_20px_40px_rgba(43,10,68,0.45)] hover:shadow-[0_2px_8px_rgba(43,10,68,0.35),0_28px_52px_rgba(43,10,68,0.5)]'
          : 'border-white bg-white text-[#16003C] shadow-[0_2px_6px_rgba(0,31,79,0.16),0_20px_40px_rgba(0,31,79,0.32)] hover:shadow-[0_2px_8px_rgba(0,31,79,0.2),0_28px_52px_rgba(0,31,79,0.4)]',
      )}
    >
      <span
        className={cn(
          'grid size-10 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-105 group-active:scale-95',
          isInclusion ? 'bg-white text-purple-800' : 'bg-[#ffdb00] text-[#16003C]',
        )}
      >
        <Icon aria-hidden="true" className="size-5" strokeWidth={2.25} />
      </span>
      <span className="line-clamp-3 text-sm font-bold leading-[1.15] tracking-tight sm:text-base">{item.title}</span>
      <ExternalLink
        aria-hidden="true"
        className="absolute right-3 top-3 size-3.5 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        strokeWidth={2.25}
      />
    </a>
  )
}

export function QuickAccessSection() {
  return (
    <section
      aria-label="Accesos rápidos"
      className="w-full overflow-hidden bg-[#16003C] px-6 py-6 text-white outline-none sm:px-8 sm:py-7 lg:px-10 lg:py-8"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-2xl text-center">
          <p aria-hidden="true" className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#ffdb00]" />
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]">
            Accesos rápidos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
            Enlaces directos a los servicios y trámites más utilizados de la Santoto Bucaramanga.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {quickAccessItems.map((item) => (
            <QuickAccessCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
