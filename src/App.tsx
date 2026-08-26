import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CampusSection } from './components/campus-section'
import { ExperienceBento } from './components/experience-bento'
import { EventsSection } from './components/events-section'
import { FormationPaths } from './components/formation-paths'
import { SiteFooter } from './components/footer'
import NavbarDemo from './components/navbar-menu-demo'
import { MulticampusSection } from './components/multicampus-section'
import { NewsListPage } from './components/news-list-page'
import { InstitutionalPage } from './components/institutional-page'
import { QuickAccessSection } from './components/quick-access'
import ThumbnailCarousel from './components/thumbnail-carousel'
import TopBar from './components/top-bar'
import { WhySantoto } from './components/why-santoto'
import { useDocumentMeta, BASE_DESCRIPTION } from './hooks/use-document-meta'
import { PAGE_ID_BY_ROUTE } from './lib/institutional-routes'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function HomePage() {
  useDocumentMeta({ title: '', description: BASE_DESCRIPTION })

  return (
    <>
      <h1 className="sr-only">Universidad Santo Tomás Seccional Bucaramanga</h1>
      <ThumbnailCarousel />
      <FormationPaths />
      <QuickAccessSection />
      <WhySantoto />
      <ExperienceBento />
      <EventsSection />
      <MulticampusSection />
      <CampusSection />
    </>
  )
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <div className="flex w-full flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/noticias" element={<NewsListPage />} />
          {Object.entries(PAGE_ID_BY_ROUTE).map(([path, pageId]) => (
            <Route key={path} path={path} element={<InstitutionalPage pageId={pageId} />} />
          ))}
          <Route path="/pagina/:id" element={<InstitutionalPage />} />
        </Routes>
      </div>
    </>
  )
}

export default function App() {
  return (
    <main id="main-content" tabIndex={-1}>
      <TopBar />
      <NavbarDemo>
        <AppRoutes />
      </NavbarDemo>
      <SiteFooter />
    </main>
  )
}
