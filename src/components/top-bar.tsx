import { Mail } from 'lucide-react'
import senruLogo from '@/assets/media/logo radio usta.svg'

function BrandIcon({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      {children}
    </svg>
  )
}

function XLogo({ className }: { className?: string }) {
  return (
    <BrandIcon className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </BrandIcon>
  )
}

function FacebookLogo({ className }: { className?: string }) {
  return (
    <BrandIcon className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </BrandIcon>
  )
}

function InstagramLogo({ className }: { className?: string }) {
  return (
    <BrandIcon className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </BrandIcon>
  )
}

function LinkedinLogo({ className }: { className?: string }) {
  return (
    <BrandIcon className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </BrandIcon>
  )
}

function YoutubeLogo({ className }: { className?: string }) {
  return (
    <BrandIcon className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </BrandIcon>
  )
}

export default function TopBar() {
  const external = { target: '_blank', rel: 'noopener noreferrer' } as const

  return (
    <div className="fixed inset-x-0 top-0 z-40 flex h-10 items-center justify-center gap-1 border-b border-[#16003C]/15 bg-[#EFC623] px-4 text-[#16003C] shadow-[0_1px_0_rgba(22,0,60,0.06)] sm:gap-2 sm:px-6">
      <a
        href="https://www.ustabuca.edu.co/htmlapoyo/Pop_Up_Se%C3%B1RU.html"
        {...external}
        aria-label="Emisora SeñRU"
        className="flex h-8 items-center rounded-full px-1.5 transition hover:bg-[#16003C]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16003C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFC623]"
      >
        <img src={senruLogo} alt="" aria-hidden="true" className="h-4 w-auto sm:h-5" />
      </a>
      <a
        href="https://outlook.office365.com/"
        {...external}
        aria-label="Correo"
        className="grid size-8 place-items-center rounded-full transition hover:bg-[#16003C]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16003C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFC623]"
      >
        <Mail aria-hidden="true" className="size-4 sm:size-[18px]" strokeWidth={2} />
      </a>
      <a
        href="https://www.facebook.com/SantotomasBGA"
        {...external}
        aria-label="Facebook"
        className="grid size-8 place-items-center rounded-full transition hover:bg-[#16003C]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16003C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFC623]"
      >
        <FacebookLogo className="size-4 sm:size-[18px]" />
      </a>
      <a
        href="https://twitter.com/SANTOTOBGA"
        {...external}
        aria-label="X"
        className="grid size-8 place-items-center rounded-full transition hover:bg-[#16003C]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16003C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFC623]"
      >
        <XLogo className="size-4 sm:size-[18px]" />
      </a>
      <a
        href="https://www.instagram.com/santotobucaramanga/"
        {...external}
        aria-label="Instagram"
        className="grid size-8 place-items-center rounded-full transition hover:bg-[#16003C]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16003C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFC623]"
      >
        <InstagramLogo className="size-4 sm:size-[18px]" />
      </a>
      <a
        href="https://www.linkedin.com/in/santoto-bucaramanga/"
        {...external}
        aria-label="LinkedIn"
        className="grid size-8 place-items-center rounded-full transition hover:bg-[#16003C]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16003C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFC623]"
      >
        <LinkedinLogo className="size-4 sm:size-[18px]" />
      </a>
      <a
        href="https://www.youtube.com/channel/UCZT4JaKHf7RcJ4FNLs4LFhg"
        {...external}
        aria-label="YouTube"
        className="grid size-8 place-items-center rounded-full transition hover:bg-[#16003C]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16003C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFC623]"
      >
        <YoutubeLogo className="size-4 sm:size-[18px]" />
      </a>
    </div>
  )
}
