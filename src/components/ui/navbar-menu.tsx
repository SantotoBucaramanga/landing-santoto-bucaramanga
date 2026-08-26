"use client";
import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const isInternalHref = (href?: string) => Boolean(href && !/^https?:\/\//i.test(href));

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const panelId = React.useId();
  const isOpen = active === item;

  return (
    <div onMouseEnter={() => setActive(item)} onFocus={() => setActive(item)} className="relative shrink-0">
      <motion.button
        type="button"
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setActive(item)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setActive(null);
          }
        }}
        transition={{ duration: 0.3 }}
        className="min-h-11 cursor-pointer rounded-lg px-1 py-1.5 font-medium text-slate-950 transition-[background-color,color,box-shadow] hover:bg-[#EFC623] hover:text-[#16003C] active:bg-slate-950/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07559e] focus-visible:ring-offset-2 focus-visible:ring-offset-white/70 sm:px-2.5"
      >
        {item}
      </motion.button>
      {active !== null && (
        <div>
          {isOpen && (
            <div className="hidden fixed inset-x-2 top-20 z-[60] lg:block lg:absolute lg:inset-x-auto lg:top-[calc(100%_+_1.2rem)] lg:left-1/2 lg:-translate-x-1/2 lg:pt-4">
              <motion.div
                id={panelId}
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="max-h-[calc(100dvh-5.5rem)] max-w-full overflow-auto rounded-2xl border border-white/75 bg-white/72 shadow-[0_18px_45px_rgba(24,86,255,0.18),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-2xl lg:max-h-none lg:max-w-none lg:overflow-hidden dark:border-white/20 dark:bg-black/72"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="h-full w-full p-3 lg:w-max lg:p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setActive(null);
        }
      }}
      aria-label="Primary navigation"
      className="relative mx-auto grid h-14 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1 rounded-full border border-white/75 bg-white/72 px-3 shadow-[0_18px_45px_rgba(0,31,79,0.22),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl sm:h-16 sm:gap-3 sm:px-6 lg:h-[90px] lg:px-5"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  ...rest
}: {
  title: string;
  description: string;
  href: string;
  src: string;
} & React.ComponentPropsWithoutRef<"a">) => {
  const product = (
    <>
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </>
  );
  const className = "flex space-x-2";
  return isInternalHref(href) ? (
    <Link to={href} className={className}>
      {product}
    </Link>
  ) : (
    <a href={href} {...rest} className={className}>
      {product}
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  const { href, ...anchorRest } = rest;
  const linkClass =
    "rounded-sm text-neutral-700 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white/50 dark:text-neutral-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black/50";
  if (isInternalHref(href)) {
    return (
      <Link to={href ?? "/"} className={linkClass}>
        {children}
      </Link>
    );
  }
  return (
    <a {...anchorRest} href={href} className={linkClass}>
      {children}
    </a>
  );
};
