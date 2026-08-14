import { ArrowRight, MapPin } from 'lucide-react'

type CampusCard = {
  name: string
  location: string
  description: string
  image: string
  alt: string
}

const campuses: CampusCard[] = [
  {
    name: 'Campus Bucaramanga',
    location: 'Bucaramanga, Santander',
    description: 'Sede principal con la oferta académica más amplia y servicios institucionales.',
    image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Campus Bucaramanga de la Universidad Santo Tomás',
  },
  {
    name: 'Campus Floridablanca',
    location: 'Floridablanca, Santander',
    description: 'Espacios académicos y de bienestar para la comunidad estudiantil.',
    image: 'https://images.pexels.com/photos/289494/pexels-photo-289494.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Campus Floridablanca de la Universidad Santo Tomás',
  },
  {
    name: 'Campus Piedecuesta',
    location: 'Piedecuesta, Santander',
    description: 'Presencia institucional que extiende la Santoto a toda el área metropolitana.',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Campus Piedecuesta de la Universidad Santo Tomás',
  },
]

export function CampusSection() {
  return (
    <section aria-label="Nuestros campus" className="w-full bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-2xl">
          <p aria-hidden="true" className="mb-4 h-1 w-12 rounded-full bg-[#ffdb00]" />
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#07559e]">Nuestros campus</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#07559e] sm:text-4xl lg:text-[2.6rem]">
            Conoce nuestros campus
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Tres sedes para vivir la experiencia tomasina en el área metropolitana de Bucaramanga.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {campuses.map((campus) => (
            <article
              key={campus.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(14,27,60,0.14)]"
            >
              <img
                src={campus.image}
                alt={campus.alt}
                loading="lazy"
                decoding="async"
                className="h-44 w-full object-cover"
              />
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="text-xl font-bold text-[#07559e]">{campus.name}</h3>
                <p className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin aria-hidden="true" className="size-4" />
                  {campus.location}
                </p>
                <p className="text-sm leading-relaxed text-slate-600">{campus.description}</p>
                <a
                  href="#"
                  className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-bold text-[#07559e] outline-none transition hover:text-[#0699df] focus-visible:ring-2 focus-visible:ring-[#07559e] focus-visible:ring-offset-2"
                >
                  Cómo llegar
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
