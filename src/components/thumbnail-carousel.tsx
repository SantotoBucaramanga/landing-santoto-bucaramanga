import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import bannerMatriculas from '@/assets/media/banners/banner-matriculas.png'
import bannerMaestriaDerecho from '@/assets/media/banners/banner-maestria-derecho.png'
import bannerImagenologiaOral from '@/assets/media/banners/banner-imagenologia-oral.jpg'
import bannerDerechoConstitucional from '@/assets/media/banners/banner-derecho-constitucional.png'
import bannerSumma from '@/assets/media/banners/banner-summa.jpg'
import bannerCirugiaOral from '@/assets/media/banners/banner-cirugia-oral.jpg'
import bannerVirtual from '@/assets/media/banners/banner-virtual.jpg'
import bannerDescuentosPlanes from '@/assets/media/banners/banner-descuentos-planes.png'
import bannerPosgrados from '@/assets/media/banners/banner-posgrados.png'

type CarouselItem = {
  id: number
  image: string
  alt: string
  href: string
}

const carouselItems: CarouselItem[] = [
  { id: 2, image: bannerMatriculas, alt: 'Banner USTA 2', href: 'https://admisiones.ustabuca.edu.co/index.php/matriculas' },
  { id: 3, image: bannerMaestriaDerecho, alt: 'Banner USTA 3', href: 'https://posgrados.ustabuca.edu.co/index.php/maestria-en-derecho' },
  { id: 4, image: bannerImagenologiaOral, alt: 'Banner USTA 4', href: 'https://pregrados.ustabuca.edu.co/index.php/odontologia' },
  { id: 5, image: bannerDerechoConstitucional, alt: 'Banner USTA 5', href: 'https://posgrados.ustabuca.edu.co/index.php/especializacion-en-derecho-constitucional' },
  { id: 6, image: bannerSumma, alt: 'Banner USTA 6', href: 'https://santotosumma.edu.co/' },
  { id: 7, image: bannerCirugiaOral, alt: 'Banner USTA 7', href: 'https://posgrados.ustabuca.edu.co/index.php/especializacion-en-cirugia-oral' },
  { id: 8, image: bannerVirtual, alt: 'Banner USTA 8', href: 'https://santotovirtual.edu.co/' },
  { id: 9, image: bannerDescuentosPlanes, alt: 'Banner USTA 9', href: 'https://admisiones.ustabuca.edu.co/index.php/aliados-financieros' },
  { id: 10, image: bannerPosgrados, alt: 'Banner USTA 10', href: 'https://www.ustabuca.edu.co/index.php/programas-academicos/presencial-y-a-distancia/posgrados-presenciales-new' },
]

export default function ThumbnailCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocusWithin, setIsFocusWithin] = useState(false)
  const [isPointerInteracting, setIsPointerInteracting] = useState(false)
  const reduceMotion = useReducedMotion()
  const swipeStartX = useRef<number | null>(null)
  const dragged = useRef(false)
  const activeItem = carouselItems[activeIndex]

  const selectItem = (index: number) => {
    setActiveIndex((index + carouselItems.length) % carouselItems.length)
  }

  useEffect(() => {
    if (reduceMotion || isHovered || isFocusWithin || isPointerInteracting) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % carouselItems.length)
    }, 4_000)

    return () => window.clearInterval(intervalId)
  }, [isFocusWithin, isHovered, isPointerInteracting, reduceMotion])

  useEffect(() => {
    if (!isPointerInteracting) return

    const endPointerInteraction = () => setIsPointerInteracting(false)
    window.addEventListener('pointerup', endPointerInteraction)
    window.addEventListener('pointercancel', endPointerInteraction)

    return () => {
      window.removeEventListener('pointerup', endPointerInteraction)
      window.removeEventListener('pointercancel', endPointerInteraction)
    }
  }, [isPointerInteracting])

  return (
    <section
      className="w-full pt-10 pb-4 sm:pb-6"
      aria-label="Image carousel"
      aria-live="off"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={(event) => setIsFocusWithin(event.currentTarget.contains(event.relatedTarget as Node | null))}
      onPointerDownCapture={() => setIsPointerInteracting(true)}
      onPointerUpCapture={() => setIsPointerInteracting(false)}
      onPointerCancelCapture={() => setIsPointerInteracting(false)}
    >
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="relative overflow-hidden rounded-b-[1.75rem] bg-slate-950 outline outline-1 outline-white/75 shadow-[0_24px_60px_rgba(15,23,42,0.22)] sm:rounded-b-[2.25rem]">
          <motion.div
            className="relative aspect-[1920/550] cursor-grab touch-pan-y select-none"
            drag="x"
            dragElastic={0.12}
              dragSnapToOrigin
              onPointerDown={(event) => {
                swipeStartX.current = event.clientX
                dragged.current = false
              }}
              onPointerUp={(event) => {
                if (swipeStartX.current === null) return

                const distance = event.clientX - swipeStartX.current
                swipeStartX.current = null
                dragged.current = Math.abs(distance) > 70
                if (distance > 70) selectItem(activeIndex - 1)
                if (distance < -70) selectItem(activeIndex + 1)
            }}
              onPointerCancel={() => {
                swipeStartX.current = null
                dragged.current = false
                setIsPointerInteracting(false)
              }}
            whileTap={{ cursor: 'grabbing' }}
            aria-roledescription="carousel"
            aria-label={`Slide ${activeIndex + 1} of ${carouselItems.length}: ${activeItem.alt}`}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.a
                  key={activeItem.id}
                  href={activeItem.href}
                  onClick={(event) => {
                    if (dragged.current) {
                      event.preventDefault()
                      dragged.current = false
                    }
                  }}
                  className="absolute inset-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#1856FF]"
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
                >
                  <img
                    src={activeItem.image}
                    alt={activeItem.alt}
                    draggable={false}
                    className="size-full object-contain"
                  />
                </motion.a>
              </AnimatePresence>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-3 sm:px-5">
            <button
              type="button"
              onClick={() => selectItem(activeIndex - 1)}
              className="pointer-events-auto grid size-11 place-items-center rounded-full border border-[#EFC623]/60 bg-[#EFC623] text-[#16003C] shadow-lg transition hover:bg-[#f3d257] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFC623] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              aria-label={`Show previous image, currently ${carouselItems[(activeIndex - 1 + carouselItems.length) % carouselItems.length].alt}`}
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => selectItem(activeIndex + 1)}
              className="pointer-events-auto grid size-11 place-items-center rounded-full border border-[#EFC623]/60 bg-[#EFC623] text-[#16003C] shadow-lg transition hover:bg-[#f3d257] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFC623] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              aria-label={`Show next image, currently ${carouselItems[(activeIndex + 1) % carouselItems.length].alt}`}
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        <div
          className="mt-3 flex items-center justify-center gap-1"
          role="group"
          aria-label="Seleccionar banner"
        >
          {carouselItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectItem(index)}
              aria-label={`Ir al banner ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className="grid size-8 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFC623] focus-visible:ring-offset-2"
            >
              <span
                aria-hidden="true"
                className={`block rounded-full transition-[width,height,background-color] ${
                  index === activeIndex ? 'size-3 bg-[#EFC623]' : 'size-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
