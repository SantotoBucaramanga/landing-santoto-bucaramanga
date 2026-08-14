import { ArrowRight, Compass, FlaskConical, MapPin, Monitor } from 'lucide-react'
import { EventCard } from '@/components/ui/event-card'

type EventItem = {
  icon: React.ReactNode
  title: string
  description: string
  date: string
  startTime: string
  locationIcon: React.ReactNode
  location: string
  modality: string
  modalityClassName: string
}

const events: EventItem[] = [
  {
    icon: <Compass aria-hidden="true" className="size-5" />,
    title: 'Jornada de orientación vocacional para aspirantes',
    description: 'Descubre la oferta académica y resuelve tus dudas con asesores.',
    date: '20 de agosto',
    startTime: '9:00 a. m.',
    locationIcon: <MapPin aria-hidden="true" className="size-4" />,
    location: 'Auditorio Mayor',
    modality: 'Presencial',
    modalityClassName: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: <Monitor aria-hidden="true" className="size-5" />,
    title: 'Webinar: financiación y becas para tu pregrado',
    description: 'Conoce los aliados financieros y las opciones de apoyo económico.',
    date: '27 de agosto',
    startTime: '3:00 p. m.',
    locationIcon: <Monitor aria-hidden="true" className="size-4" />,
    location: 'En línea',
    modality: 'Virtual',
    modalityClassName: 'bg-sky-100 text-sky-700',
  },
  {
    icon: <FlaskConical aria-hidden="true" className="size-5" />,
    title: 'Conferencia de investigación e innovación regional',
    description: 'Encuentro entre academia, empresa y territorio para el desarrollo.',
    date: '3 de septiembre',
    startTime: '6:00 p. m.',
    locationIcon: <MapPin aria-hidden="true" className="size-4" />,
    location: 'Campus El Bosque',
    modality: 'Híbrido',
    modalityClassName: 'bg-amber-100 text-amber-700',
  },
]

export function EventsSection() {
  return (
    <section aria-label="Próximos eventos" className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p aria-hidden="true" className="mb-4 h-1 w-12 rounded-full bg-[#ffdb00]" />
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#07559e]">Agenda institucional</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#07559e] sm:text-4xl lg:text-[2.6rem]">
              Próximos eventos
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-[#07559e] outline-none transition hover:text-[#0699df] focus-visible:ring-2 focus-visible:ring-[#07559e] focus-visible:ring-offset-2"
          >
            Ver agenda completa
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.title}
              icon={event.icon}
              title={event.title}
              description={event.description}
              date={event.date}
              startTime={event.startTime}
              locationIcon={event.locationIcon}
              location={event.location}
              modality={event.modality}
              modalityClassName={event.modalityClassName}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
