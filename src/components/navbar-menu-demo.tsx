"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
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

type TopLevelItem = {
  item: string;
  children?: ReactNode;
};

const topLevelItems: TopLevelItem[] = [
  {
    item: "Nuestra Institución",
    children: (
      <div className="flex flex-col space-y-4 text-sm">
        <HoveredLink href="/web-dev">Web Development</HoveredLink>
        <HoveredLink href="/interface-design">Interface Design</HoveredLink>
        <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
        <HoveredLink href="/branding">Branding</HoveredLink>
      </div>
    ),
  },
  {
    item: "Programas Académicos",
    children: (
      <div className="grid grid-cols-1 gap-4 p-3 text-sm lg:grid-cols-2 lg:gap-10 lg:p-4">
        <ProductItem
          title="Algochurn"
          href="https://algochurn.com"
          src={navbarAlgochurn}
          description="Prepare for tech interviews like never before."
        />
        <ProductItem
          title="Tailwind Master Kit"
          href="https://tailwindmasterkit.com"
          src={navbarTailwindMasterKit}
          description="Production ready Tailwind css components for your next project"
        />
        <ProductItem
          title="Moonbeam"
          href="https://gomoonbeam.com"
          src={navbarMoonbeam}
          description="Never write from scratch again. Go from idea to blog in minutes."
        />
        <ProductItem
          title="Rogue"
          href="https://userogue.com"
          src={navbarRogue}
          description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
        />
      </div>
    ),
  },
  {
    item: "Recursos",
    children: (
      <div className="flex flex-col space-y-4 text-sm">
        <HoveredLink href="/hobby">Hobby</HoveredLink>
        <HoveredLink href="/individual">Individual</HoveredLink>
        <HoveredLink href="/team">Team</HoveredLink>
        <HoveredLink href="/enterprise">Enterprise</HoveredLink>
      </div>
    ),
  },
  { item: "Dependencias" },
  { item: "Admisiones" },
];

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
          {topLevelItems.map((entry) => (
            <MenuItem key={entry.item} setActive={setActive} active={active} item={entry.item}>
              {entry.children}
            </MenuItem>
          ))}
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
                      {entry.children ? (
                        <MobileSubmenu
                          item={entry.item}
                          open={mobileSection === entry.item}
                          onToggle={() => toggleSection(entry.item)}
                        >
                          {entry.children}
                        </MobileSubmenu>
                      ) : (
                        <button type="button" className={itemButtonClass}>
                          {entry.item}
                        </button>
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
