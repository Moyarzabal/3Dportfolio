import { ArrowUp, Github, Linkedin } from "lucide-react";
import Magnetic from "./ui/Magnetic";
import { navLinks, socials } from "@/constants";
import { scrollTo } from "@/lib/scroll";
import PetHouse from "./fx/PetHouse";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";

const Footer = () => {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  return (
  <footer className="relative border-t border-line">
    <div className={`container-x flex flex-col gap-8 py-10 md:min-h-[8.5rem] md:flex-row md:items-center md:justify-between ${fine && !reduce ? "pr-28 md:pr-36" : ""}`}>
      <div className="flex items-center gap-3">
        <img src="/logo.webp" alt="" className="h-8 w-8" />
        <div>
          <p className="text-sm font-semibold">Shun Takenaka</p>
          <p className="text-xs text-muted">© {new Date().getFullYear()} · Built with React, Three.js & GSAP</p>
        </div>
      </div>

      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        {navLinks.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`} className="transition-colors hover:text-white">
              {l.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">
        <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:text-white">
          <Github size={16} />
        </a>
        <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:text-white">
          <Linkedin size={16} />
        </a>
        <Magnetic>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            aria-label="Back to top"
            className="ml-2 grid h-10 w-10 place-items-center rounded-full bg-white text-bg transition-transform hover:-translate-y-0.5"
          >
            <ArrowUp size={16} />
          </button>
        </Magnetic>
      </div>
    </div>
    {/* the ghost's house sits on the bottom-right corner of the page */}
    {fine && !reduce && (
      <div className="container-x pointer-events-none absolute inset-x-0 bottom-0">
        <PetHouse className="pointer-events-auto absolute -bottom-1 right-1 lg:right-6" />
      </div>
    )}
  </footer>
  );
};

export default Footer;
