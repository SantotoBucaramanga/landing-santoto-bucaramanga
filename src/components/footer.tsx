import type { ReactNode } from 'react'
import ustaLogo from '@/assets/media/logos/LOGO-USTA-2024-2.png'
import logoAcredita from '@/assets/media/footer/logo-acredita.png'
import logoIcontec from '@/assets/media/footer/logo-icontec.png'

type FooterLink = { label: string; href: string }

const recursosInstitucionales: FooterLink[] = [
  { label: 'Transparencia y Acceso a la información pública', href: 'https://transparencia.usta.edu.co/' },
  { label: 'Estatuto Orgánico', href: 'https://www.ustabuca.edu.co/images/documentos/2026/ESTATUTO_ORGNICO_2026-1_FINAL-1.pdf' },
  {
    label: 'Estatuto Docente',
    href: 'https://www.ustabuca.edu.co/images/documentos/documentos-institucionales/Acuerdo_No_2_17_de-marzo-de-2022-Estatuto-Docente-2022.pdf',
  },
  {
    label: 'Reglamento General Estudiantil',
    href: 'https://www.ustabuca.edu.co/images/documentos/documentos-institucionales/reglamentos/Acuerdo_No_50_Reglamento_Gral_Est_Preg_Multicampus-28-nov-2022.pdf',
  },
  {
    label: 'Reglamento Disciplinario Estudiantil',
    href: 'https://antiguoportal.usta.edu.co/images/documentos/documentos-institucionales/reglamentos/reglamento_disciplinario.pdf',
  },
  {
    label: 'Derechos Pecuniarios (costos Académicos)',
    href: 'https://www.ustabuca.edu.co/images/documentos/Documentos%20Secretaria%20General/2026/Acuerdo_20_Deroga%20Acuerdo_19_Dhos_pecuniarios_23-12-2025.pdf',
  },
  {
    label: 'Derechos Pecuniarios Maestría en Dirección y Gestión de Proyectos (modalidad Virtual) 2026-2',
    href: 'https://www.ustabuca.edu.co/images/documentos/2026/DERECHOS-PECUANIAROS-MAESTRIA-EN-GESTION-DE-PROYECTOS-2026-2.pdf',
  },
  {
    label: 'Ley de protección de datos',
    href: 'https://antiguoportal.usta.edu.co/images/documentos/documentos-institucionales/politicas/Politica_Tratamiento_datos_Personales.pdf',
  },
  { label: 'Reconocimientos, sugerencias y quejas', href: 'https://serviciocliente.usantotomas.edu.co/solicitudes_RSQ/' },
]

const recursosAdministrativos: FooterLink[] = [
  { label: 'Portal del Trabajador', href: 'https://ejtc.login.us2.oraclecloud.com/' },
  {
    label: 'Permisos Laborales',
    href: 'https://www.ustabuca.edu.co/images/documentos/documentos-institucionales/protocolo%20de%20permisos.pdf',
  },
  { label: 'Certificados Laborales en Línea', href: 'https://ejtc.login.us2.oraclecloud.com/' },
  {
    label: 'Reglamento Interno del Trabajo',
    href: 'https://www.ustabuca.edu.co/images/documentos/documentos-institucionales/2026/reglamento_interno_de_trabajo_vf.pdf',
  },
  {
    label: 'Directorio Seccional Bucaramanga',
    href: 'https://mailustabucaedu-my.sharepoint.com/:x:/g/personal/dir_cedii_ustabuca_edu_co/IQB28KL6YFTMSIFRiRX3cQiEAd3gtXYggn_nTIZlEFbU78E?e=vNfvdp',
  },
  {
    label: 'Trabaja con Nosotros',
    href: 'https://ejtc.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/es/sites/CX_1001',
  },
]

const recursosAcademicos: FooterLink[] = [
  { label: 'Sistema Académico SAC', href: 'https://oas.usta.edu.co/sgacampus/' },
  {
    label: 'Calendario Académico Seccional',
    href: 'https://www.ustabuca.edu.co/images/documentos/Calendario_Footer/CALENDARIO_ACADEMICO_SECCIONAL_BUCARAMANGA.pdf',
  },
  {
    label: 'Calendario Académico Multicampus',
    href: 'https://usantotomaseduco-my.sharepoint.com/:x:/g/personal/dir_comunicaciones_usta_edu_co/ER-7ZPc3LGBLpZcY9lxiS_gBsfykcIxqqvJjmYHEbMq_Eg?e=umfXVM',
  },
  {
    label: 'Grados',
    href: 'https://www.ustabuca.edu.co/images/documentos/Documentos%20Secretaria%20General/2026/Grados_Colectivos_Individuales.png',
  },
  { label: 'Red de Servicios', href: 'https://reddeservicios.usta.edu.co/' },
  { label: 'Preguntas Frecuentes: Docentes Nuevos', href: 'https://udcfd.ustabuca.edu.co/' },
]

const externalTextLinkClasses =
  'rounded-sm text-sm leading-relaxed text-white/75 underline-offset-4 outline-none transition hover:text-[#ffdb00] hover:underline focus-visible:ring-2 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16003C]'

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
      {children}
      <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded-full bg-[#ffdb00]" />
    </h3>
  )
}

export function SiteFooter() {
  const external = { target: '_blank', rel: 'noopener noreferrer' } as const

  return (
    <footer className="bg-[#16003C] text-white">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 pb-2 pt-12 sm:px-6 lg:px-10">
        <img
          src={ustaLogo}
          alt="Universidad Santo Tomás"
          loading="lazy"
          className="h-14 w-auto object-contain sm:h-16"
        />
        <img
          src={logoAcredita}
          alt="Acreditación institucional"
          loading="lazy"
          className="h-14 w-auto object-contain sm:h-16"
        />
        <img
          src={logoIcontec}
          alt="Certificación Icontec IQNet"
          loading="lazy"
          className="h-14 w-auto object-contain sm:h-16"
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:py-16">
          <nav aria-label="Recursos Institucionales">
            <ColumnTitle>Recursos Institucionales</ColumnTitle>
            <ul className="mt-5 space-y-2.5">
              {recursosInstitucionales.map((link) => (
                <li key={link.label}>
                  <a href={link.href} {...external} className={externalTextLinkClasses}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Recursos Administrativos">
            <ColumnTitle>Recursos Administrativos</ColumnTitle>
            <ul className="mt-5 space-y-2.5">
              {recursosAdministrativos.map((link) => (
                <li key={link.label}>
                  <a href={link.href} {...external} className={externalTextLinkClasses}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Recursos Académicos">
            <ColumnTitle>Recursos Académicos</ColumnTitle>
            <ul className="mt-5 space-y-2.5">
              {recursosAcademicos.map((link) => (
                <li key={link.label}>
                  <a href={link.href} {...external} className={externalTextLinkClasses}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/10 py-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="text-center">
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[#ffdb00]">
                Notificaciones Judiciales y/o Extrajudiciales
              </h2>
              <p className="mt-4 text-sm text-white/85">Cra. 18 No. 9-27 Bucaramanga</p>
              <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-white/60">
                Los siguientes correos son de uso exclusivo para juzgados, tribunales y altas cortes o requerimientos de
                autoridades administrativas
              </p>
              <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium">
                <a href="mailto:rectoria@ustabuca.edu.co" className="underline-offset-4 transition hover:text-[#ffdb00] hover:underline focus-visible:ring-2 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16003C]">
                  rectoria@ustabuca.edu.co
                </a>
                <span aria-hidden="true" className="text-white/30">
                  |
                </span>
                <a href="mailto:juridica@ustabuca.edu.co" className="underline-offset-4 transition hover:text-[#ffdb00] hover:underline focus-visible:ring-2 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16003C]">
                  juridica@ustabuca.edu.co
                </a>
              </p>
            </div>

            <div className="text-center text-sm leading-relaxed text-white/70 lg:border-l lg:border-white/10 lg:pl-10">
              <p className="font-semibold text-white">Universidad Santo Tomás © {new Date().getFullYear()}</p>
              <p className="mt-3">
                Institución de Educación Superior, reconocida mediante Resolución 3645 del 06 de agosto de 1965 expedida por
                el Ministerio de Justicia
              </p>
              <p className="mt-1">Institución sujeta a inspección y vigilancia por el Ministerio de Educación Nacional</p>
              <p className="mt-1">SNIES 1705 (art. 39, decreto 1295 de 2010)</p>
              <p className="mt-1">Línea gratuita nacional: 01-8000-917 044</p>
              <p className="mt-1">Bucaramanga, PBX: (+57) 607 698 58 58</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center">
          <p className="text-xs text-white/60">
            Todos los derechos reservados
            <span aria-hidden="true" className="mx-1 text-white/30">
              |
            </span>
            <a
              href="https://www.ustabuca.edu.co/index.php?option=com_content&view=article&id=316&Itemid=1953"
              {...external}
              className="rounded-sm text-xs text-white/60 underline-offset-4 outline-none transition hover:text-[#ffdb00] hover:underline focus-visible:ring-2 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16003C]"
            >
              Aviso de privacidad
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
