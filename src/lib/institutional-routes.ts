/**
 * Friendly routes for institutional CMS articles. Pages without a friendly
 * route fall back to /pagina/:id.
 */
export const PAGE_ID_BY_ROUTE: Record<string, number> = {
  '/nuestra-institucion/presentacion': 218,
  '/nuestra-institucion/documentos-institucionales': 276,
  '/nuestra-institucion/derechos-pecuniarios': 341,
  '/nuestra-institucion/secretaria-general': 291,
  '/nuestra-institucion/organigrama-general': 223,
  '/nuestra-institucion/organigrama-seccional': 222,
  '/programas/posgrados': 340,
  '/programas/division-cecac': 324,
}

export function pathForPageId(id: number): string | null {
  return Object.entries(PAGE_ID_BY_ROUTE).find(([, pageId]) => pageId === id)?.[0] ?? null
}
