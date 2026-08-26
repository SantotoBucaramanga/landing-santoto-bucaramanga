import newsData from '@/data/news.json'

export type NewsEntry = {
  id: number
  title: string
  summary: string
  html: string
  date: string | null
  alias: string
  image: string | null
  category: string
  url: string
}

const NEWS_DATA = newsData as NewsEntry[]

export const NEWS_ITEMS = NEWS_DATA

export function findNewsById(id: number): NewsEntry | undefined {
  return NEWS_DATA.find((entry) => entry.id === id)
}

/**
 * Defense-in-depth guard for legacy CMS artifacts ({slider} blocks etc.)
 * that may survive the export pipeline; stripped before rendering raw HTML.
 */
export function stripLegacyArtifacts(html: string): string {
  return html.replace(/\{\/?\s*slider[^}]*\}/gi, '')
}

export function formatNewsDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
}
