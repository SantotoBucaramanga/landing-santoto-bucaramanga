import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { NewsImageFallback } from '@/components/ui/news-image-fallback'
import { useDocumentMeta } from '@/hooks/use-document-meta'
import { findNewsById, formatNewsDate, stripLegacyArtifacts } from '@/lib/news'

function ArticleBlock({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export function NewsDetailPage() {
  const params = useParams<{ id: string }>()
  const id = Number(params.id)

  const item = useMemo(() => (Number.isFinite(id) ? findNewsById(id) : undefined), [id])
  const cleanHtml = useMemo(() => stripLegacyArtifacts(item?.html ?? ''), [item])

  useDocumentMeta({ title: item?.title ?? 'Noticia no encontrada', description: item?.summary })

  if (!item) {
    return (
      <div className="flex flex-col items-center gap-6 bg-slate-50 px-4 pb-20 pt-40 text-center">
        <p aria-hidden="true" className="h-1 w-12 rounded-full bg-[#ffdb00]" />
        <h1 className="text-3xl font-bold tracking-tight text-[#07559e]">Noticia no encontrada</h1>
        <p className="max-w-xl text-slate-600">No encontramos la noticia solicitada. Te invitamos a explorar las demás publicaciones.</p>
        <Link
          to="/noticias"
          className="inline-flex min-h-11 items-center rounded-full bg-[#16003C] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0699df] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2"
        >
          Volver a noticias
        </Link>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-slate-50 pb-20">
      <header className="border-b border-slate-200 bg-white px-4 pb-10 pt-32 sm:px-6 sm:pb-12 lg:px-10">
        <ArticleBlock delay={0}>
          <div className="mx-auto max-w-3xl">
            <p aria-hidden="true" className="mb-4 h-1 w-12 rounded-full bg-[#ffdb00]" />
            <nav aria-label="Ruta de navegación" className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Inicio /{' '}
              <Link
                to="/noticias"
                className="text-[#07559e] outline-none transition-colors hover:text-[#0699df] focus-visible:ring-2 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2"
              >
                Noticias
              </Link>{' '}
              / <span aria-current="page">{item.category}</span>
            </nav>
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
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#07559e] sm:text-4xl">{item.title}</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{item.summary}</p>
          </div>
        </ArticleBlock>
      </header>

      <section aria-label={item.title} className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl">
          {item.image ? (
            <ArticleBlock delay={0}>
              <figure className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(0,31,79,0.08)]">
                <img
                  src={item.image}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="mx-auto max-h-[32rem] w-full object-contain"
                />
              </figure>
            </ArticleBlock>
          ) : (
            <ArticleBlock delay={0}>
              <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 shadow-[0_10px_30px_rgba(0,31,79,0.08)]">
                <NewsImageFallback seed={item.id} />
              </div>
            </ArticleBlock>
          )}

          <ArticleBlock delay={0.08}>
            <article
              className="article-body mx-auto mt-8 max-w-3xl"
              // Content comes from the CMS export pipeline, already sanitized
              // (scripts/styles/handlers stripped) by scripts/export-content.mjs,
              // plus a legacy-artifact guard in stripLegacyArtifacts().
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            />
          </ArticleBlock>

          <footer className="mx-auto mt-14 max-w-3xl border-t border-slate-200 pt-6">
            <p className="text-xs text-slate-500">
              Consulta esta página en el sitio institucional:{' '}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#07559e] underline decoration-2 underline-offset-4 outline-none transition-colors hover:text-[#0699df] focus-visible:ring-2 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2"
              >
                ustabuca.edu.co — {item.alias}, se abre en una pestaña nueva
              </a>
            </p>
            <Link
              to="/noticias"
              className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[#07559e] outline-none transition-colors hover:text-[#0699df] focus-visible:ring-2 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Volver a noticias
            </Link>
          </footer>
        </div>
      </section>
    </div>
  )
}

