import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, Github, Linkedin } from "lucide-react";

import { navLinks, socials } from "@/constants";
import { scrollTo, startScroll, stopScroll } from "@/lib/scroll";
import { useAppReady } from "@/lib/AppReady";
import { EASE } from "@/lib/motion";
import Magnetic from "./ui/Magnetic";

const Navbar = () => {
  const { ready } = useAppReady();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 240 && !open);
  });

  // highlight the section currently in the middle of the viewport
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    const top = document.getElementById("top");
    const ioTop = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), {
      rootMargin: "-20% 0px -60% 0px",
    });
    top && ioTop.observe(top);
    return () => {
      io.disconnect();
      ioTop.disconnect();
    };
  }, []);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    if (open) {
      stopScroll();
      document.documentElement.style.overflow = "hidden";
    } else {
      startScroll();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    // wait for the overlay to start closing before scrolling
    setTimeout(() => scrollTo(`#${id}`), open ? 150 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: ready ? (hidden ? -110 : 0) : -80, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav className="container-x flex items-center justify-between py-4 sm:py-5">
          {/* logo */}
          <a href="#top" onClick={go("top")} className="group flex items-center gap-3" aria-label="Back to top">
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-line bg-white/[0.04]">
              <img src="/logo.webp" alt="" className="h-6 w-6" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              Shun Takenaka
              <span className="ml-2 hidden text-muted xl:inline">/ Solution Engineer</span>
            </span>
          </a>

          {/* desktop pill nav */}
          <div
            className={`hidden items-center gap-1 rounded-full p-1.5 transition-all duration-500 lg:flex ${
              scrolled ? "glass shadow-card" : "border border-transparent"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? "text-white" : "text-muted hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10"
                    />
                  )}
                  <span className="relative z-10">{link.title}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1 md:flex">
              <Magnetic strength={0.25}>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <Github size={18} />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <Linkedin size={18} />
                </a>
              </Magnetic>
            </div>
            <Magnetic strength={0.2} className="hidden lg:block">
              <a href="#contact" onClick={go("contact")} className="btn-primary !px-5 !py-2.5 text-xs">
                Let&apos;s talk
              </a>
            </Magnetic>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="glass grid h-10 w-10 place-items-center rounded-full lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid place-items-center"
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.25 + i * 0.06, duration: 0.6, ease: EASE } }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={go(link.id)}
                    className={`flex items-baseline gap-4 border-b border-line py-4 text-3xl font-semibold tracking-tight ${
                      active === link.id ? "text-white" : "text-white/70"
                    }`}
                  >
                    <span className="text-xs font-medium text-brand-light">0{i + 1}</span>
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6 } }}
              className="flex items-center justify-between"
            >
              <div className="flex gap-3">
                <a href={socials.github} target="_blank" rel="noreferrer" className="chip !py-2">
                  <Github size={14} /> GitHub
                </a>
                <a href={socials.linkedin} target="_blank" rel="noreferrer" className="chip !py-2">
                  <Linkedin size={14} /> LinkedIn
                </a>
              </div>
              <span className="text-xs text-muted">Tokyo, JP</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
