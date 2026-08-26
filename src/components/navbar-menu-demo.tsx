"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useLocation } from "react-router-dom";
import { ChevronDown, Menu as MenuIcon, Search, X } from "lucide-react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import ustaLogo from "@/assets/media/logos/LOGO-USTA-Black.webp";
import navbarAlgochurn from "@/assets/media/navbar-demo/navbar-algochurn.webp";
import navbarTailwindMasterKit from "@/assets/media/navbar-demo/navbar-tailwindmasterkit.webp";
import navbarMoonbeam from "@/assets/media/navbar-demo/navbar-moonbeam.webp";
import navbarRogue from "@/assets/media/navbar-demo/navbar-rogue.webp";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

type NavLink = { label: string; href: string };
type NavGroup = { title: string; links: NavLink[] };

type TopLevelEntry = {
  item: string;
  href?: string;
  content?: ReactNode;
};

const externalAnchorProps = (href: string): ComponentPropsWithoutRef<"a"> =>
  /^https?:\/\//i.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

const institutionLinks: NavLink[] = [
  { label: "Presentación", href: "/nuestra-institucion/presentacion" },
  { label: "Organigrama General", href: "/nuestra-institucion/organigrama-general" },
  { label: "Organigrama Seccional Bucaramanga", href: "/nuestra-institucion/organigrama-seccional" },
  {
    label: "Normograma",
    href: "https://app.powerbi.com/view?r=eyJrIjoiZjZlMWEzODEtYTM3My00MjdjLTg2N2ItOTY1OTc4N2JlYjA2IiwidCI6Ijk5YzY3NGNhLWMwYzctNDkwYS1hZThmLTE2MTcyNjM2ZjMxYiIsImMiOjR9",
  },
  { label: "Documentos Institucionales", href: "/nuestra-institucion/documentos-institucionales" },
  { label: "Secretaría General", href: "/nuestra-institucion/secretaria-general" },
  { label: "Derechos Pecuniarios", href: "/nuestra-institucion/derechos-pecuniarios" },
];

const programImages = [navbarAlgochurn, navbarTailwindMasterKit, navbarMoonbeam, navbarRogue];

type ProgramEntry = {
  title: string;
  description: string;
  href: string;
};

const programItems: ProgramEntry[] = [
  {
    title: "Pregrados presenciales",
    description: "Programas de grado en modalidad presencial.",
    href: "https://pregrados.ustabuca.edu.co/",
  },
  {
    title: "Posgrados",
    description: "Especializaciones, maestrías y doctorados.",
    href: "/programas/posgrados",
  },
  {
    title: "Posgrados Virtuales",
    description: "Estudia desde cualquier lugar.",
    href: "https://santotovirtual.edu.co/",
  },
  {
    title: "Programas a distancia",
    description: "Pregrados en modalidad a distancia.",
    href: "https://usantotomas.edu.co/pregrados-a-distancia",
  },
  {
    title: "Posgrados a distancia",
    description: "Posgrados de la Seccional Bucaramanga.",
    href: "https://bucaramanga.ustadistancia.edu.co/",
  },
  {
    title: "Educación Continua SUMMA",
    description: "Cursos, diplomados y formación continua.",
    href: "https://santotosumma.edu.co/",
  },
  {
    title: "División Ciencias Económicas y Administrativas",
    description: "Programas de la división económica y administrativa.",
    href: "/programas/division-cecac",
  },
];

const resourceGroups: NavGroup[] = [
  {
    title: "Aspirantes y estudiantes",
    links: [
      { label: "Inscripciones en Línea", href: "http://oas.usta.edu.co:8080/sgacampus/services/inscripciones/home" },
      { label: "Pagos electrónicos", href: "http://pagosenlinea.usantotomas.edu.co/" },
      { label: "Campus Virtual", href: "https://ustavirtual.ustabuca.edu.co/" },
      { label: "Sistema Académico SAC", href: "http://oas.usta.edu.co/sgacampus/" },
      {
        label: "Grados",
        href: "https://www.ustabuca.edu.co/images/documentos/Documentos%20Secretaria%20General/2026/Grados_Colectivos_Individuales.png",
      },
      { label: "Calendario Académico", href: "https://www.ustabuca.edu.co/recursos/aspirantes-estudiantes/calendario-academico" },
      { label: "Aliados Financieros", href: "https://admisiones.ustabuca.edu.co/index.php/aliados-financieros" },
      { label: "ProUSTA", href: "http://www.prousta.com/" },
    ],
  },
  {
    title: "Comunidad Tomasina",
    links: [
      { label: "Red de Servicios", href: "https://reddeservicios.usta.edu.co/" },
      { label: "Mesas de Ayuda", href: "https://www.ustabuca.edu.co/recursos/comunidad-tomasina/mesas-de-ayuda" },
      { label: "Inscripción a Eventos", href: "https://inscripcioneventos.usta.edu.co/" },
      { label: "Certificados de Eventos", href: "https://inscripcioneventos.usta.edu.co/certificados/" },
      { label: "Correo Electrónico", href: "https://login.microsoftonline.com/" },
      { label: "Transparencia", href: "https://transparencia.usta.edu.co/" },
      { label: "Editorial Científica", href: "https://publicaciones.ustabuca.edu.co/" },
      { label: "Consultorio Jurídico", href: "https://rsu.ustabuca.edu.co/index.php/consultorio-juridico" },
      { label: "Radio USTA", href: "https://radiousta.ustabuca.edu.co/" },
      { label: "Graduados Tomasinos", href: "https://graduados.ustabuca.edu.co/" },
    ],
  },
  {
    title: "Administrativos / Docentes",
    links: [
      { label: "Portal del Trabajador", href: "https://ejtc.login.us2.oraclecloud.com/" },
      { label: "Certificaciones laborales", href: "https://ejtc.login.us2.oraclecloud.com/" },
      { label: "Preguntas frecuentes docentes", href: "https://udcfd.ustabuca.edu.co/" },
      { label: "Actualización docente", href: "https://udcfd.ustabuca.edu.co/" },
      {
        label: "Reglamento Interno de Trabajo",
        href: "https://www.ustabuca.edu.co/images/documentos/documentos-institucionales/2026/Proyecto_Actualizaci%C3%B3n_Reglamento_Interno_Trabajo_Multicampus.pdf",
      },
      { label: "SG-SST", href: "https://sst.ustabuca.edu.co/" },
      { label: "Trabaja con Nosotros", href: "https://ejtc.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/es/sites/CX_1001" },
    ],
  },
];

const departmentGroups: NavGroup[] = [
  {
    title: "Académicas",
    links: [
      { label: "CRAI", href: "https://crai.ustabuca.edu.co/" },
      { label: "Bienestar Institucional", href: "https://dptopromocionbienestar.ustabuca.edu.co/" },
      { label: "Evangelización y Cultura", href: "https://direccionevangelizacion.ustabuca.edu.co/" },
      { label: "Humanidades", href: "https://humanidades.ustabuca.edu.co/" },
      { label: "Ciencias Básicas", href: "https://cienciasbasicas.ustabuca.edu.co/" },
      { label: "Relaciones Internacionales", href: "https://orii.ustabuca.edu.co/" },
      { label: "Graduados", href: "https://graduados.ustabuca.edu.co/" },
      { label: "CILCE", href: "https://ilce.ustabuca.edu.co/" },
    ],
  },
  {
    title: "Administrativas",
    links: [
      { label: "Admisiones y Mercadeo", href: "https://admisiones.ustabuca.edu.co/" },
      { label: "Registro y Control", href: "http://oas.usta.edu.co/sgacampus/" },
      { label: "Tesorería", href: "https://sindicatura.ustabuca.edu.co/" },
      { label: "CEDII", href: "https://cedii.ustabuca.edu.co/" },
      { label: "Auditoría Interna", href: "https://auditoriainterna.ustabuca.edu.co/" },
      {
        label: "Estrategia y Prospectiva Planeación",
        href: "/pagina/306",
      },
    ],
  },
  {
    title: "Unidades",
    links: [
      { label: "Enseñanza y Aprendizaje", href: "https://udcfd.ustabuca.edu.co/" },
      { label: "Promoción Estudiantil", href: "https://udies.ustabuca.edu.co/" },
      { label: "Investigación e Innovación", href: "https://unidaddeinvestigacion.ustabuca.edu.co/" },
      { label: "Proyección Social", href: "https://rsu.ustabuca.edu.co/" },
      { label: "Aseguramiento de la Calidad", href: "https://ugicu.ustabuca.edu.co/" },
      { label: "Servicios Clínicas", href: "https://serviciosclinicas.ustabuca.edu.co/" },
    ],
  },
];

function LinkList({ links }: { links: NavLink[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {links.map((link) => (
        <li key={link.label}>
          <HoveredLink href={link.href} {...externalAnchorProps(link.href)}>
            {link.label}
          </HoveredLink>
        </li>
      ))}
    </ul>
  );
}

function GroupedColumns({ groups }: { groups: NavGroup[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-x-8 gap-y-6 text-sm lg:w-[46rem] lg:auto-rows-min lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="mb-2.5 text-xs font-semibold tracking-widest text-[#07559e] uppercase">{group.title}</p>
          <LinkList links={group.links} />
        </div>
      ))}
    </div>
  );
}

const topLevelItems: TopLevelEntry[] = [
  {
    item: "Nuestra Institución",
    content: (
      <nav aria-label="Nuestra Institución" className="flex flex-col gap-3 text-sm lg:w-72">
        <LinkList links={institutionLinks} />
      </nav>
    ),
  },
  {
    item: "Programas Académicos",
    content: (
      <nav
        aria-label="Programas Académicos"
        className="grid grid-cols-1 gap-4 p-3 text-sm lg:w-[44rem] lg:grid-cols-2 lg:gap-6 lg:p-4"
      >
        {programItems.map((program, index) => (
          <ProductItem
            key={program.title}
            title={program.title}
            description={program.description}
            href={program.href}
            src={programImages[index % programImages.length]}
            {...externalAnchorProps(program.href)}
          />
        ))}
      </nav>
    ),
  },
  {
    item: "Recursos",
    content: (
      <nav aria-label="Recursos">
        <GroupedColumns groups={resourceGroups} />
      </nav>
    ),
  },
  {
    item: "Dependencias",
    content: (
      <nav aria-label="Dependencias">
        <GroupedColumns groups={departmentGroups} />
      </nav>
    ),
  },
  { item: "Admisiones", href: "https://admisiones.ustabuca.edu.co/" },
];

const topLevelLinkClass =
  "flex min-h-11 items-center rounded-lg px-1 py-1.5 font-medium text-slate-950 transition-[background-color,color,box-shadow] hover:bg-[#EFC623] hover:text-[#16003C] active:bg-slate-950/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07559e] focus-visible:ring-offset-2 focus-visible:ring-offset-white/70 sm:px-2.5";

function TopLevelLink({ item, href }: { item: string; href: string }) {
  return (
    <div className="relative shrink-0">
      <a href={href} {...externalAnchorProps(href)} className={topLevelLinkClass}>
        {item}
      </a>
    </div>
  );
}

const itemButtonClass =
  "w-full rounded-lg px-4 py-3 text-left font-medium text-slate-950 transition-colors hover:bg-[#EFC623] hover:text-[#16003C] active:bg-slate-950/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07559e] focus-visible:ring-offset-2 focus-visible:ring-offset-white/70";

function MobileSubmenu({
  item,
  children,
  open,
  onToggle,
}: {
  item: string;
  children: ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  const sectionId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={sectionId}
        onClick={onToggle}
        className={cn(itemButtonClass, "flex items-center justify-between")}
      >
        <span>{item}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 shrink-0 transition-transform duration-300", open && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={sectionId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="px-4 pb-4 pt-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function NavbarDemo({ children }: { children?: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-linear-to-br from-stone-100 via-white to-amber-100">
      <Navbar className="top-12" />
      {children ?? <p className="text-slate-700 dark:text-white">Hover over the navbar to see the menu</p>}
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const closeMobile = useCallback((focusButton = false) => {
    setMobileOpen(false);
    setMobileSection(null);
    if (focusButton) {
      hamburgerRef.current?.focus();
    }
  }, []);

  // Close any open panel whenever SPA navigation happens.
  useEffect(() => {
    setActive(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobile(true);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMobile();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMobileOpen, closeMobile]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    (focusables[0] ?? panel).focus();
  }, [isMobileOpen]);

  const toggleSection = (item: string) => {
    setMobileSection((current) => (current === item ? null : item));
  };

  return (
    <div
      ref={navRef}
      className={cn(
        "fixed inset-x-0 top-10 z-50 mx-auto w-[calc(100%-1rem)] max-w-[1300px] sm:w-[calc(100%-2rem)]",
        className,
      )}
    >
      <Menu setActive={setActive}>
        <a
          href="/"
          className="flex size-11 shrink-0 items-center justify-start rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07559e] focus-visible:ring-offset-2 focus-visible:ring-offset-white/70 sm:h-14 sm:w-44"
        >
          <img
            src={ustaLogo}
            alt="Universidad Santo Tomas Bucaramanga"
            className="size-11 object-cover object-left sm:h-12 sm:w-44 sm:object-contain sm:object-left"
          />
        </a>
        <div className="hidden min-w-0 items-center justify-start gap-1 overflow-x-auto overscroll-x-contain lg:flex lg:overflow-visible lg:justify-center lg:gap-3">
          {topLevelItems.map((entry) =>
            entry.content ? (
              <MenuItem key={entry.item} setActive={setActive} active={active} item={entry.item}>
                {entry.content}
              </MenuItem>
            ) : (
              <TopLevelLink key={entry.item} item={entry.item} href={entry.href ?? "/"} />
            ),
          )}
        </div>
        <div className="flex items-center justify-end gap-1 lg:gap-3">
          <button
            type="button"
            aria-label="Search"
            title="Search"
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-950 transition-[background-color,color,box-shadow] hover:bg-slate-950/10 hover:text-[#07559e] active:bg-slate-950/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07559e] focus-visible:ring-offset-2 focus-visible:ring-offset-white/70"
          >
            <Search aria-hidden="true" className="size-5" strokeWidth={2} />
          </button>
          <button
            ref={hamburgerRef}
            type="button"
            aria-expanded={isMobileOpen}
            aria-controls={panelId}
            aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-950 transition-[background-color,color,box-shadow] hover:bg-slate-950/10 hover:text-[#07559e] active:bg-slate-950/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07559e] focus-visible:ring-offset-2 focus-visible:ring-offset-white/70 lg:hidden"
          >
            {isMobileOpen ? (
              <X aria-hidden="true" className="size-5" strokeWidth={2} />
            ) : (
              <MenuIcon aria-hidden="true" className="size-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </Menu>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {isMobileOpen && (
            <div className="fixed inset-x-2 top-20 z-[60] lg:hidden">
              <motion.div
                id={panelId}
                ref={panelRef}
                tabIndex={-1}
                role="region"
                aria-label="Menú de navegación"
                initial={{ opacity: 0, scale: 0.98, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                transition={transition}
                className="max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain rounded-2xl border border-white/75 bg-white/72 shadow-[0_18px_45px_rgba(24,86,255,0.18),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-2xl"
              >
                <ul className="flex flex-col gap-1 p-3">
                  {topLevelItems.map((entry) => (
                    <li key={entry.item}>
                      {entry.content ? (
                        <MobileSubmenu
                          item={entry.item}
                          open={mobileSection === entry.item}
                          onToggle={() => toggleSection(entry.item)}
                        >
                          {entry.content}
                        </MobileSubmenu>
                      ) : (
                        <a href={entry.href ?? "/"} {...externalAnchorProps(entry.href ?? "/")} className={itemButtonClass}>
                          {entry.item}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
