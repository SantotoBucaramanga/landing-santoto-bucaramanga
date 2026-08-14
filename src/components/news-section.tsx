import { ArrowRight, CalendarDays } from 'lucide-react'
import newsInterdisciplinariedad from '@/assets/media/news/news-interdisciplinariedad.jpg'
import newsSaludVisual from '@/assets/media/news/news-salud-visual.jpg'
import newsInvestigacion from '@/assets/media/news/news-investigacion.jpg'

type NewsItem = {
  category: string
  title: string
  description: string
  date: string
  author: string
  image: string
  alt: string
}

const leadNews: NewsItem = {
  category: 'Academia',
  title: 'La interdisciplinariedad como eje de la formación en la Santoto',
  description:
    'Estudiantes y docentes integran saberes para responder a los retos reales de la región con una mirada integral.',
  date: '12 de agosto, 2026',
  author: 'Dirección de Comunicaciones',
  image: newsInterdisciplinariedad,
  alt: 'Estudiantes y docentes en un espacio de aprendizaje colaborativo',
}

const newsItems: NewsItem[] = [
  {
    category: 'Proyección social',
    title: 'Una alianza que transforma vidas a través de la salud visual',
    description:
      'La Santoto y aliados regionales acercan la salud visual a comunidades con menos acceso.',
    date: '9 de agosto, 2026',
    author: 'Dirección de Comunicaciones',
    image: newsSaludVisual,
    alt: 'Jornada de salud visual con la comunidad',
  },
  {
    category: 'Investigación',
    title: 'El diálogo entre investigadores fortalece la construcción de conocimiento',
    description:
      'Encuentros académicos que conectan grupos y semilleros de la Seccional.',
    date: '5 de agosto, 2026',
    author: 'Dirección de Comunicaciones',
    image: newsInvestigacion,
    alt: 'Investigadores en diálogo académico',
  },
]

type NewsCardProps = {
  item: NewsItem
  featured?: boolean
}

function NewsMeta({ item }: NewsCardProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays aria-hidden="true" className="size-4" />
        {item.date}
      </span>
      <span>Por: {item.author}</span>
    </div>
  )
}

function NewsCard({ item, featured = false }: NewsCardProps) {
  return (
    <article
      className={`group flex cursor-pointer flex-col gap-4 transition-opacity hover:opacity-80 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            featured ? 'aspect-video md:aspect-[21/9]' : 'aspect-video'
          }`}
        />
      </div>
      <div className="flex flex-row flex-wrap items-center gap-4">
        <span className="rounded-full bg-[#ffdb00]/90 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-[#16003C]">
          {item.category}
        </span>
        <NewsMeta item={item} />
      </div>
      <div className="flex flex-col gap-2">
        <h3
          className={`max-w-3xl font-bold leading-tight tracking-tight text-[#07559e] ${
            featured ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'
          }`}
        >
          {item.title}
        </h3>
        <p className="max-w-3xl text-base leading-relaxed text-slate-600">{item.description}</p>
      </div>
    </article>
  )
}

export function NewsSection() {
  return (
    <section aria-label="Noticias" className="w-full bg-slate-50 px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="max-w-2xl">
            <p aria-hidden="true" className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#ffdb00]" />
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#07559e]">Santoto al día</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#07559e] sm:text-4xl lg:text-[2.6rem]">
              Noticias
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-[#07559e] outline-none transition hover:text-[#0699df] focus-visible:ring-2 focus-visible:ring-[#07559e] focus-visible:ring-offset-2"
          >
            Ver todas las noticias
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <NewsCard item={leadNews} featured />
          {newsItems.map((item) => (
            <NewsCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
