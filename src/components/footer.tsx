import type { ReactNode } from 'react'

type IconProps = { className?: string }

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.5 21v-7h2.5l.5-3h-3V9.05c0-.87.3-1.6 1.7-1.6H16.5V4.75C16.2 4.7 15.2 4.6 14 4.6c-2.5 0-4.1 1.5-4.1 4.3V11H7.5v3h2.4v7h3.6Z" />
    </svg>
  )
}

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L2.8 2h6.4l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.1 3.7H5.3L17.8 20Z" />
    </svg>
  )
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.2 0-3.5 0-4.8.1-2.6.1-3.8 1.3-3.9 3.9-.1 1.3-.1 1.6-.1 4.8s0 3.5.1 4.8c.1 2.6 1.3 3.8 3.9 3.9 1.3.1 1.6.1 4.8.1s3.5 0 4.8-.1c2.6-.1 3.8-1.3 3.9-3.9.1-1.3.1-1.6.1-4.8s0-3.5-.1-4.8c-.1-2.6-1.3-3.8-3.9-3.9-1.3-.1-1.6-.1-4.8-.1Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
    </svg>
  )
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.2 8h4.6v14.8H.2V8Zm7.6 0h4.4v2h.1c.6-1.2 2.1-2.4 4.4-2.4 4.7 0 5.6 3.1 5.6 7.1v8.1h-4.6v-7.2c0-1.7 0-3.9-2.4-3.9s-2.8 1.9-2.8 3.8v7.3H7.8V8Z" />
    </svg>
  )
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M23.5 6.2c-.3-1-1.1-1.8-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6c-1 .3-1.8 1.1-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1.1 1.8 2.1 2.1 1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  )
}

interface FooterProps {
  logo: ReactNode
  brandName: string
  socialLinks: Array<{ icon: ReactNode; href: string; label: string }>
  mainLinks: Array<{ href: string; label: string }>
  legalLinks: Array<{ href: string; label: string }>
  copyright: { text: string; license?: string }
}

function Footer({ logo, brandName, socialLinks, mainLinks, legalLinks, copyright }: FooterProps) {
  return (
    <footer className="bg-[#16003C] pb-6 pt-16 text-white lg:pb-8 lg:pt-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="md:flex md:items-start md:justify-between">
          <a href="/" className="flex items-center gap-x-3" aria-label={brandName}>
            {logo}
            <span className="text-xl font-bold">{brandName}</span>
          </a>
          <ul className="mt-6 flex list-none space-x-3 md:mt-0">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="grid size-10 place-items-center rounded-full bg-white/10 text-white outline-none transition hover:bg-[#ffdb00] hover:text-[#16003C] focus-visible:ring-2 focus-visible:ring-[#ffdb00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16003C]"
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t border-white/15 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
          <nav className="lg:mt-0 lg:col-[4/11]">
            <ul className="-my-1 -mx-2 flex list-none flex-wrap lg:justify-end">
              {mainLinks.map((link, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-white/85 underline-offset-4 outline-none transition hover:text-[#ffdb00] hover:underline focus-visible:ring-2 focus-visible:ring-[#ffdb00]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 lg:mt-0 lg:col-[4/11]">
            <ul className="-my-1 -mx-3 flex list-none flex-wrap lg:justify-end">
              {legalLinks.map((link, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-white/60 underline-offset-4 outline-none transition hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-[#ffdb00]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm leading-6 text-white/60 lg:mt-0 lg:col-[1/4] lg:row-[1/3]">
            <div>{copyright.text}</div>
            {copyright.license ? <div className="mt-1">{copyright.license}</div> : null}
          </div>
        </div>
      </div>
    </footer>
  )
}

export function SiteFooter() {
  return (
    <Footer
      logo={
        <img
          src="https://www.ustabuca.edu.co/images/Banner/Logo-usta-letra-blanca_New.png"
          alt=""
          className="h-10 w-auto"
        />
      }
      brandName="Universidad Santo Tomás"
      socialLinks={[
        { icon: <FacebookIcon className="size-5" />, href: '#', label: 'Facebook' },
        { icon: <XIcon className="size-5" />, href: '#', label: 'X' },
        { icon: <InstagramIcon className="size-5" />, href: '#', label: 'Instagram' },
        { icon: <LinkedinIcon className="size-5" />, href: '#', label: 'LinkedIn' },
        { icon: <YoutubeIcon className="size-5" />, href: '#', label: 'YouTube' },
      ]}
      mainLinks={[
        { href: '#', label: 'Presentación institucional' },
        { href: '#', label: 'Pregrados' },
        { href: '#', label: 'Posgrados' },
        { href: '#', label: 'Virtuales y a distancia' },
        { href: '#', label: 'Educación continua' },
        { href: '#', label: 'Admisiones' },
        { href: '#', label: 'Investigación' },
        { href: '#', label: 'Bienestar universitario' },
      ]}
      legalLinks={[
        { href: '#', label: 'Transparencia y acceso a la información' },
        { href: '#', label: 'Tratamiento de datos personales' },
        { href: '#', label: 'Política de privacidad' },
        { href: '#', label: 'Notificaciones judiciales' },
        { href: '#', label: 'Mapa del sitio' },
        { href: '#', label: 'Contáctanos' },
      ]}
      copyright={{
        text: '© 2026 Universidad Santo Tomás — Seccional Bucaramanga. Todos los derechos reservados.',
        license: 'Institución sujeta a inspección y vigilancia por el Ministerio de Educación Nacional.',
      }}
    />
  )
}
