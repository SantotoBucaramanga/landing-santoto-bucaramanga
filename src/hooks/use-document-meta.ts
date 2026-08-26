import { useEffect } from 'react'

const BASE_TITLE = 'Universidad Santo Tomás Seccional Bucaramanga'
const BASE_DESCRIPTION =
  'Universidad Santo Tomás Seccional Bucaramanga: programas de pregrado y posgrado, campus, servicios institucionales y acceso a la red tomasina.'

/**
 * Per-page SEO: updates document title/meta description while mounted,
 * restoring the site defaults on unmount so every page controls its own metadata.
 */
export function useDocumentMeta({ title, description }: { title?: string; description?: string } = {}) {
  useEffect(() => {
    const previousTitle = document.title
    const previousDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null

    if (title) {
      const suffix = ` | ${BASE_TITLE}`
      document.title = title.endsWith(suffix) || title === BASE_TITLE ? title : `${title}${suffix}`
    }
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }

    return () => {
      document.title = previousTitle
      if (previousDescription !== null) {
        document.querySelector('meta[name="description"]')?.setAttribute('content', previousDescription)
      }
    }
  }, [title, description])
}

export { BASE_TITLE, BASE_DESCRIPTION }
