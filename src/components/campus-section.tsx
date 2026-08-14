import { ArrowRight, MapPin } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import campusBucaramanga from '@/assets/media/campus/Fachada-Campus-Bucaramanga.jpg'
import campusFloridablanca from '@/assets/media/campus/Campus de Floridablanca.jpg'
import campusPiedecuesta from '@/assets/media/campus/Campus de Piedecuesta.jpg'
import campusLimonal from '@/assets/media/campus/Campus El Limonal.jpg'

type CampusCard = {
  name: string
  location: string
  description: string
  image: string
  alt: string
  maps: string
}

const campuses: CampusCard[] = [
  {
    name: 'Campus Bucaramanga',
    location: 'Bucaramanga, Santander',
    description: 'Sede principal con la oferta académica más amplia y servicios institucionales.',
    image: campusBucaramanga,
    alt: 'Campus Bucaramanga de la Universidad Santo Tomás',
    maps: 'https://www.google.com/maps/place/Universidad+Santo+Tom%C3%A1s/@7.1369751,-73.1280768,1119m/data=!3m1!1e3!4m15!1m8!3m7!1s0x8e681573fd5ea711:0xca68b376bbb1898e!2sCra.+18+%239-27,+Bucaramanga,+Santander!3b1!8m2!3d7.1369792!4d-73.1280684!16s%2Fg%2F11bw4jbzqr!3m5!1s0x8e681573fd5ea711:0x6a7ba348a3e0e953!8m2!3d7.1369759!4d-73.1280767!16s%2Fg%2F1tcygj3t?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'Campus Floridablanca',
    location: 'Floridablanca, Santander',
    description: 'Espacios académicos y de bienestar para la comunidad estudiantil.',
    image: campusFloridablanca,
    alt: 'Campus Floridablanca de la Universidad Santo Tomás',
    maps: 'https://www.google.com/maps/place/Universidad+Santo+Tom%C3%A1s+Sede+Floridablanca/@7.0660056,-73.0952298,1119m/data=!3m1!1e3!4m14!1m7!3m6!1s0x8e683f7c5c19bb7b:0x6d3895cf1cab3737!2sCentro+de+Recursos+para+el+Aprendizaje+y+la+Investigaci%C3%B3n+CRAI-USTA!8m2!3d7.0660056!4d-73.0952298!16s%2Fg%2F11h71hq8hw!3m5!1s0x8e683f6496e11757:0x2d2b21fdb49d0e9!8m2!3d7.0641821!4d-73.0952086!16s%2Fg%2F1tdygpby?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'Campus Piedecuesta',
    location: 'Piedecuesta, Santander',
    description: 'Presencia institucional que extiende la Santoto a toda el área metropolitana.',
    image: campusPiedecuesta,
    alt: 'Campus Piedecuesta de la Universidad Santo Tomás',
    maps: 'https://www.google.com/maps/dir//Universidad+Santo+Tom%C3%A1s+Campus+Piedecuesta,+45A,+Piedecuesta,+La+Mata,+Piedecuesta,+Santander/@7.1315118,-73.1231582,4475m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x8e68473926629bb7:0x20eafc71daaf0c0b!2m2!1d-73.0596099!2d7.0226997?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'Campus El Limonal',
    location: 'Autopista Piedecuesta, km 14',
    description: 'Espacios académicos y de bienestar para la comunidad tomasina.',
    image: campusLimonal,
    alt: 'Campus El Limonal de la Universidad Santo Tomás',
    maps: 'https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDQgBEC4YrwEYxwEYgAQyCggAEAAY4wIYgAQyDQgBEC4YrwEYxwEYgAQyBggCEEUYOTIICAMQABgWGB4yCAgEEAAYFhgeMggIBRAAGBYYHjIICAYQABgWGB4yCggHEAAYChgWGB4yCAgIEAAYFhgeMgcICRAAGO8F0gEINDcyN2owajSoAgOwAgHxBRJAWWAstmvU&um=1&ie=UTF-8&fb=1&gl=co&sa=X&geocode=KVPpcW8aR2iOMYGVvkvzP10d&daddr=Piedecuesta,+Santander',
  },
]

export function CampusSection() {
  const reduce = useReducedMotion()

  return (
    <section aria-label="Nuestros campus" className="w-full bg-slate-50 px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-3xl text-center">
          <p aria-hidden="true" className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#ffdb00]" />
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#07559e]">Nuestros campus</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#07559e] sm:text-4xl lg:text-[2.6rem]">
            Conoce nuestros campus
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Cuatro sedes para vivir la experiencia tomasina en el área metropolitana de Bucaramanga.
          </p>
        </div>

        <motion.div
          className="mt-10 grid gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-4"
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {campuses.map((campus) => (
            <motion.article
              key={campus.name}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(14,27,60,0.14)]"
            >
              <img
                src={campus.image}
                alt={campus.alt}
                loading="lazy"
                decoding="async"
                className="h-52 w-full object-cover"
              />
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                <h3 className="text-lg font-bold text-[#07559e]">{campus.name}</h3>
                <p className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin aria-hidden="true" className="size-3.5" />
                  {campus.location}
                </p>
                <p className="text-xs leading-relaxed text-slate-600">{campus.description}</p>
                <a
                  href={campus.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Cómo llegar a ${campus.name}, se abre en Google Maps`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-bold text-[#07559e] outline-none transition hover:text-[#0699df] focus-visible:ring-2 focus-visible:ring-[#07559e] focus-visible:ring-offset-2"
                >
                  Cómo llegar
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
