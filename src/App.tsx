import { CampusSection } from './components/campus-section'
import { ExperienceBento } from './components/experience-bento'
import { EventsSection } from './components/events-section'
import { SiteFooter } from './components/footer'
import { FormationPaths } from './components/formation-paths'
import NavbarDemo from './components/navbar-menu-demo'
import { MulticampusSection } from './components/multicampus-section'
import { NewsSection } from './components/news-section'
import { QuickAccessSection } from './components/quick-access'
import ThumbnailCarousel from './components/thumbnail-carousel'
import TopBar from './components/top-bar'
import { WhySantoto } from './components/why-santoto'

export default function App() {
  return (
    <main id="main-content" tabIndex={-1}>
      <TopBar />
      <NavbarDemo>
        <div className="flex w-full flex-col">
          <ThumbnailCarousel />
          <FormationPaths />
          <QuickAccessSection />
          <WhySantoto />
          <ExperienceBento />
          <NewsSection />
          <EventsSection />
          <MulticampusSection />
          <CampusSection />
        </div>
      </NavbarDemo>
      <SiteFooter />
    </main>
  )
}
