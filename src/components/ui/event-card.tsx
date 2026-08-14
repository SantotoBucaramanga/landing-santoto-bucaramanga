import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface EventCardProps {
  icon: ReactNode
  title: string
  date: string
  startTime: string
  endTime?: string
  locationIcon: ReactNode
  location: string
  modality: string
  modalityClassName?: string
  description?: string
  className?: string
}

export function EventCard({
  icon,
  title,
  date,
  startTime,
  endTime,
  locationIcon,
  location,
  modality,
  modalityClassName,
  description,
  className,
}: EventCardProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={cn(
        'flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-6 text-[#16003C] shadow-sm',
        className
      )}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0px 10px 20px -5px rgba(7, 85, 158, 0.25)',
      }}
      aria-label={`${title}, detalles del evento`}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#07559e]/10 text-[#07559e]">
            {icon}
          </div>
          <h3 className="text-lg font-bold leading-snug text-[#07559e]">{title}</h3>
        </div>

        {description ? <p className="text-sm leading-relaxed text-slate-600">{description}</p> : null}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <span className="text-slate-400">el</span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 font-semibold text-slate-600">{date}</span>
          <span className="text-slate-400">de</span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 font-semibold text-slate-600">{startTime}</span>
          {endTime ? (
            <>
              <span className="text-slate-400">a</span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1 font-semibold text-slate-600">{endTime}</span>
            </>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <span className="text-slate-400">en</span>
          <div className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1 font-semibold text-slate-600">
            {locationIcon}
            <span>{location}</span>
          </div>
          <span
            className={cn(
              'rounded-md px-2.5 py-1 font-semibold',
              modalityClassName ?? 'bg-slate-100 text-slate-600'
            )}
          >
            {modality}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
