import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ChevronDown, Clock, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FilterGrid, type FilterDefinition } from '@/components/ui/filter-grid'

type Program = {
  name: string
  level: string
  modality: string
  area: string
  campus: string
  schedule: string
  duration: string
}

const levels = ['Todos', 'Pregrado', 'Especialización', 'Maestría', 'Doctorado', 'Educación Continua']
const modalities = ['Todas', 'Presencial', 'Virtual', 'Distancia']
const areas = ['Todas', 'Derecho', 'Salud', 'Ingenierías', 'Económicas y Administrativas', 'Educación']
const campuses = ['Todos', 'Bucaramanga', 'Floridablanca', 'Piedecuesta', 'Virtual']

const programs: Program[] = [
  { name: 'Derecho', level: 'Pregrado', modality: 'Presencial', area: 'Derecho', campus: 'Bucaramanga', schedule: 'Diurna', duration: '10 semestres' },
  { name: 'Odontología', level: 'Pregrado', modality: 'Presencial', area: 'Salud', campus: 'Bucaramanga', schedule: 'Diurna', duration: '10 semestres' },
  { name: 'Administración de Empresas', level: 'Pregrado', modality: 'Presencial', area: 'Económicas y Administrativas', campus: 'Bucaramanga', schedule: 'Diurna', duration: '10 semestres' },
  { name: 'Ingeniería Civil', level: 'Pregrado', modality: 'Presencial', area: 'Ingenierías', campus: 'Bucaramanga', schedule: 'Diurna', duration: '10 semestres' },
  { name: 'Maestría en Derecho', level: 'Maestría', modality: 'Presencial', area: 'Derecho', campus: 'Bucaramanga', schedule: 'Diurna', duration: '4 semestres' },
  { name: 'Especialización en Derecho Constitucional', level: 'Especialización', modality: 'Presencial', area: 'Derecho', campus: 'Bucaramanga', schedule: 'Diurna', duration: '2 semestres' },
  { name: 'Especialización en Cirugía Oral', level: 'Especialización', modality: 'Presencial', area: 'Salud', campus: 'Bucaramanga', schedule: 'Diurna', duration: '4 semestres' },
  { name: 'Especialización en Imagenología Oral', level: 'Especialización', modality: 'Presencial', area: 'Salud', campus: 'Bucaramanga', schedule: 'Diurna', duration: '2 semestres' },
  { name: 'Licenciatura en Educación a Distancia', level: 'Pregrado', modality: 'Distancia', area: 'Educación', campus: 'Virtual', schedule: 'Flexible', duration: '10 semestres' },
  { name: 'Diplomado en Gerencia Financiera (SUMMA)', level: 'Educación Continua', modality: 'Virtual', area: 'Económicas y Administrativas', campus: 'Virtual', schedule: 'Flexible', duration: '120 horas' },
]

function modalityClasses(modality: string) {
  if (modality === 'Presencial') return 'bg-emerald-100 text-emerald-700'
  return 'bg-sky-100 text-sky-700'
}

function useColumns() {
  const [columns, setColumns] = useState(1)

  useEffect(() => {
    const large = window.matchMedia('(min-width: 1024px)')
    const medium = window.matchMedia('(min-width: 640px)')
    const update = () => setColumns(large.matches ? 3 : medium.matches ? 2 : 1)
    update()
    large.addEventListener('change', update)
    medium.addEventListener('change', update)
    return () => {
      large.removeEventListener('change', update)
      medium.removeEventListener('change', update)
    }
  }, [])

  return columns
}

type SelectFieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}

function SelectField({ id, label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-white/85">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-900 outline-none transition focus-visible:ring-2 focus-visible:ring-[#ffdb00]"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
      </div>
    </div>
  )
}

export function ProgramFinder() {
  const [level, setLevel] = useState('Todos')
  const [search, setSearch] = useState('')
  const [modality, setModality] = useState('Todas')
  const [area, setArea] = useState('Todas')
  const [campus, setCampus] = useState('Todos')
  const columns = useColumns()

  const secondaryMatch = useMemo(() => {
    const term = search.trim().toLowerCase()
    return (program: Program) => {
      if (modality !== 'Todas' && program.modality !== modality) return false
      if (area !== 'Todas' && program.area !== area) return false
      if (campus !== 'Todos' && program.campus !== campus) return false
      if (term && !program.name.toLowerCase().includes(term)) return false
      return true
    }
  }, [area, campus, modality, search])

  const filters = useMemo<FilterDefinition<Program>[]>(
    () =>
      levels.map((option) => ({
        id: option,
        label: option,
        match: (program) => (option === 'Todos' || program.level === option) && secondaryMatch(program),
      })),
    [secondaryMatch],
  )

  const resetFilters = () => {
    setLevel('Todos')
    setSearch('')
    setModality('Todas')
    setArea('Todas')
    setCampus('Todos')
  }

  const hasActiveFilters =
    level !== 'Todos' || search.trim() !== '' || modality !== 'Todas' || area !== 'Todas' || campus !== 'Todos'

  return (
    <section aria-label="Encuentra tu programa" className="w-full bg-[#16003C] px-4 py-12 text-white sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ffdb00]">Catálogo académico</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
            Encuentra el programa que transformará tu futuro
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Explora la oferta académica de la Seccional Bucaramanga y filtra según tu proyecto de vida.
          </p>
        </div>

        <form
          className="mt-8 grid items-end gap-3 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_auto]"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="f-busqueda" className="text-xs font-bold uppercase tracking-wider text-white/85">
              Buscar
            </label>
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                id="f-busqueda"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nombre del programa…"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus-visible:ring-2 focus-visible:ring-[#ffdb00]"
              />
            </div>
          </div>
          <SelectField id="f-modalidad" label="Modalidad" value={modality} onChange={setModality} options={modalities} />
          <SelectField id="f-area" label="Área de conocimiento" value={area} onChange={setArea} options={areas} />
          <SelectField id="f-campus" label="Campus" value={campus} onChange={setCampus} options={campuses} />
          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="min-h-[46px] rounded-xl border border-white/40 px-4 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffdb00] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Limpiar filtros
          </button>
        </form>

        <div className="mt-6">
          <FilterGrid
            label="Filtrar por nivel"
            items={programs}
            filters={filters}
            value={level}
            onValueChange={setLevel}
            getKey={(program) => program.name}
            columns={columns}
            rowHeight={190}
            maxRows={4}
            gap={12}
            emptyLabel="No encontramos programas con esos criterios. Ajusta los filtros o contáctanos."
            renderItem={(program) => (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded-full bg-[#ffdb00]/25 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-[#16003C]">
                      {program.level}
                    </span>
                    <span className={cn('rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider', modalityClasses(program.modality))}>
                      {program.modality}
                    </span>
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-[#07559e]">{program.name}</h3>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="inline-flex min-w-0 items-center gap-1 text-xs text-slate-500">
                    <Clock aria-hidden="true" className="size-3.5 shrink-0" />
                    <span className="truncate">
                      {program.duration} · {program.campus}
                    </span>
                  </span>
                  <a
                    href="#"
                    aria-label={`Conocer el programa ${program.name}`}
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#07559e] outline-none transition hover:text-[#0699df] focus-visible:ring-2 focus-visible:ring-[#07559e] focus-visible:ring-offset-1"
                  >
                    Conocer
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </a>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  )
}
