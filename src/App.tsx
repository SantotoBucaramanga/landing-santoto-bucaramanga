import NavbarDemo from './components/navbar-menu-demo'
import { QuickAccessSection } from './components/quick-access'
import ThumbnailCarousel from './components/thumbnail-carousel'
import TopBar from './components/top-bar'

export default function App() {
  return (
    <main id="main-content" tabIndex={-1}>
      <TopBar />
      <NavbarDemo>
        <div className="flex w-full flex-col">
          <ThumbnailCarousel />
          <QuickAccessSection />
        </div>
      </NavbarDemo>
    </main>
  )
}
