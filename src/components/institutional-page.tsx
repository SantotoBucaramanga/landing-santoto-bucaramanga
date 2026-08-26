import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import pagesData from '@/data/pages.json'
import { useDocumentMeta } from '@/hooks/use-document-meta'
import { pathForPageId } from '@/lib/institutional-routes'

export type PageEntry = {
  id: number
  title: string
  alias: string
  summary: string
  html: string
}

const pages = pagesData as PageEntry[]

function PageBlock({ children, delay }: { children: React.ReactNode; delay: number }) {
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

export function InstitutionalPage({ pageId }: { pageId?: number }) {
  const params = useParams<{ id?: string }>()
  const id = pageId ?? Number(params.id)

  const page = useMemo(() => pages.find((entry) => entry.id === id), [id])
  const friendlyPath = page ? pathForPageId(page.id) : null

  useDocumentMeta({
    title: page?.title ?? 'Página no encontrada',
    description: page?.summary,
  })

  if (!page) {
    return (
      <div className="flex flex-col items-center gap-6 bg-slate-50 px-4 pb-20 pt-40 text-center">
        <p aria-hidden="true" className="h-1 w-12 rounded-full bg-[#ffdb00]" />
        <h1 className="text-3xl font-bold tracking-tight text-[#07559e]">Contenido no disponible</h1>
        <p className="max-w-xl text-slate-600">No encontramos el contenido solicitado. Te invitamos a volver al inicio.</p>
        <Link
          to="/"
          className="inline-flex min-h-11 items-center rounded-full bg-[#16003C] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0699df] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2"
        >
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 pb-20">
      <header className="border-b border-slate-200 bg-white px-4 pb-10 pt-32 sm:px-6 sm:pb-12 lg:px-10">
        <PageBlock delay={0}>
          <div className="mx-auto max-w-5xl">
            <p aria-hidden="true" className="mb-4 h-1 w-12 rounded-full bg-[#ffdb00]" />
            {friendlyPath && (
              <nav aria-label="Ruta de navegación" className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Inicio /{' '}
                <Link
                  to={friendlyPath}
                  className="text-[#07559e] outline-none hover:text-[#0699df] focus-visible:ring-2 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2"
                >
                  {page.title}
                </Link>
              </nav>
            )}
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#07559e] sm:text-4xl">{page.title}</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{page.summary}</p>
          </div>
        </PageBlock>
      </header>

      <section aria-label={page.title} className="px-4 pt-10 sm:px-6 lg:px-10">
        <PageBlock delay={0.08}>
          <article
            className="article-content mx-auto max-w-3xl"
            // Content comes from the CMS export pipeline, already sanitized
            // (scripts/styles/handlers stripped) by scripts/export-content.mjs.
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        </PageBlock>

        <footer className="mx-auto mt-14 max-w-3xl border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-500">
            Consulta esta página en el sitio institucional:{' '}
            <a
              href={`https://www.ustabuca.edu.co/index.php?option=com_content&view=article&id=${page.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#07559e] underline decoration-2 underline-offset-4 outline-none transition-colors hover:text-[#0699df] focus-visible:ring-2 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2"
            >
              ustabuca.edu.co — {page.alias}, se abre en una pestaña nueva
            </a>
          </p>
        </footer>
      </section>
    </div>
  )
}
