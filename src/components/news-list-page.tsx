import { useMemo, useState } from 'react'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { NewsImageFallback } from '@/components/ui/news-image-fallback'
import type { NewsEntry } from '@/lib/news'
import { NEWS_ITEMS, formatNewsDate } from '@/lib/news'
import { useDocumentMeta } from '@/hooks/use-document-meta'
import { wavePath } from '@/lib/wave-path'
import { cn } from '@/lib/utils'

const PAGE_SIZE = 12

function NewsCard({ item, delay }: { item: NewsEntry; delay: number }) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(0,31,79,0.08)] transition-transform',
        'hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,31,79,0.16)] focus-within:-translate-y-1 focus-within:shadow-[0_18px_45px_rgba(0,31,79,0.16)]',
        'outline-none focus-visible:ring-4 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50'
      )}
    >
      <Link
        to={`/noticias/${item.id}`}
        aria-label={item.title}
        className="block outline-none"
      >
        {item.image ? (
          <img
            src={item.image}
            alt=""
            loading="lazy"
            decoding="async"
            width={640}
            height={360}
            className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="transition-transform duration-700 group-hover:scale-105">
            <NewsImageFallback seed={item.id} />
          </div>
        )}
      </Link>
      <div className="flex grow flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="rounded-full bg-[#ffdb00]/90 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-[#16003C]">
            {item.category}
          </span>
          {item.date && (
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <CalendarDays aria-hidden="true" className="size-3.5" />
              <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
            </span>
          )}
        </div>
        <h2 className="font-bold leading-tight tracking-tight text-[#07559e] transition-colors group-hover:text-[#0699df]">
          <Link to={`/noticias/${item.id}`} className="outline-none after:absolute after:inset-0">
            {item.title}
          </Link>
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 line-clamp-3">{item.summary}</p>
      </div>
    </motion.article>
  )
}

/** Decorative wave band consistent with the multicampus section backdrop. */
function WaveBackdrop() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 240"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-40 h-[15rem] w-full sm:top-48"
    >
      <g className="animate-wave-flow">
        <path
          d={wavePath({ y0: 152, amp: 18, phase: 0 })}
          fill="none"
          stroke="#07559e"
          strokeOpacity="0.45"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeDasharray="14 10"
          vectorEffect="non-scaling-stroke"
        />
      </g>
      <g className="animate-wave-flow" style={{ animationDelay: '-2.4s' }}>
        <path
          d={wavePath({ y0: 167, amp: 14, phase: 1.4 })}
          fill="none"
          stroke="#ffdb00"
          strokeOpacity="0.85"
          strokeWidth="2.5"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}

export function NewsListPage() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const reduce = useReducedMotion()

  const news = NEWS_ITEMS
  const visibleNews = useMemo(() => news.slice(0, visibleCount), [news, visibleCount])

  useDocumentMeta({
    title: 'Noticias',
    description:
      'Mantente al día con las noticias de la Universidad Santo Tomás Seccional Bucaramanga: investigación, campus, comunidad y vida tomasina.',
  })

  return (
    <div className="relative overflow-hidden bg-slate-50 pb-20">
      <section aria-labelledby="news-list-title" className="relative px-4 pb-16 pt-32 sm:px-6 lg:px-10">
        <WaveBackdrop />
        <header className="relative mx-auto max-w-3xl text-center">
          <p aria-hidden="true" className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#ffdb00]" />
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#07559e]">Santoto al día</p>
          <h1
            id="news-list-title"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#07559e] sm:text-4xl lg:text-[2.6rem]"
          >
            Noticias
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Entérate de todo lo que pasa en la Universidad Santo Tomás Bucaramanga.
          </p>
        </header>

        <div className="relative mx-auto mt-12 grid max-w-[1440px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleNews.map((item, index) => (
            <NewsCard key={item.id} item={item} delay={reduce ? 0 : (index % PAGE_SIZE) * 0.08} />
          ))}
        </div>

        {visibleCount < news.length && (
          <div className="relative mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#16003C] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(22,0,60,0.35)] transition hover:bg-[#0699df] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
            >
              Cargar más noticias
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
            <p className="mt-3 text-sm text-slate-500">
              Mostrando {visibleNews.length} de {news.length} noticias
            </p>
          </div>
        )}

        <div className="relative mx-auto mt-12 max-w-2xl text-center">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[#07559e] outline-none transition hover:text-[#0699df] focus-visible:ring-2 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  )
}
