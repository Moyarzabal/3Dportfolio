import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Award } from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";
import Reveal from "./ui/Reveal";
import { publications } from "@/constants";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/useMedia";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PaperCard = ({ paper, index }) => (
  <TiltCard
    as="a"
    href={paper.link}
    target="_blank"
    rel="noreferrer"
    data-cursor-label="Read"
    maxTilt={5}
    className="group flex h-full w-[82vw] shrink-0 snap-center flex-col sm:w-[26rem] lg:w-[24rem] xl:w-[27rem]"
  >
    <div className="relative z-10 flex h-full flex-col">
      <div className="relative aspect-[3/2] overflow-hidden rounded-t-3xl bg-white">
        <img
          src={paper.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-70" />
        <span className="absolute left-4 top-4 chip !bg-bg/70 backdrop-blur">
          <Award size={12} className="text-brand-light" /> {paper.type}
        </span>
        <span className="absolute right-4 top-4 text-4xl font-bold tracking-tighter text-white/80 mix-blend-difference">
          {paper.year}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-5 p-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight sm:text-lg">{paper.title}</h3>
        </div>
        <div className="flex items-end justify-between gap-4">
          <p className="text-sm text-muted">{paper.venue}</p>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-white/[0.04] transition-all duration-300 group-hover:bg-white group-hover:text-bg">
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </div>
  </TiltCard>
);

/**
 * Publications gallery. On desktop the section pins and scrolls sideways
 * (GSAP ScrollTrigger); on touch/small screens it is a native snap carousel.
 */
const Research = () => {
  const section = useRef(null);
  const track = useRef(null);
  const [progress, setProgress] = useState(0);
  const isDesktop = useIsDesktop();
  const reduce = usePrefersReducedMotion();
  const pinned = isDesktop && !reduce;

  useGSAP(
    () => {
      if (!pinned) return;
      const dist = () => track.current.scrollWidth - track.current.clientWidth;
      gsap.to(track.current, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
    },
    { dependencies: [pinned], scope: section, revertOnUpdate: true }
  );

  return (
    <section id="research" ref={section} className={pinned ? "relative flex h-screen flex-col justify-center overflow-hidden pt-20" : "section"}>
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title="Research achievements"
            description="Virtual reality, self-avatars and memory — six peer-reviewed publications across ACM, IEEE and VRSJ."
          />
          {pinned && (
            <Reveal className="flex items-center gap-4 text-sm text-muted" y={10}>
              <span className="tabular-nums">
                {String(Math.min(publications.length, Math.floor(progress * (publications.length - 1)) + 1)).padStart(2, "0")} /{" "}
                {String(publications.length).padStart(2, "0")}
              </span>
              <span className="relative h-px w-40 bg-white/10">
                <span
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand to-brand-pink"
                  style={{ width: `${Math.max(4, progress * 100)}%` }}
                />
              </span>
            </Reveal>
          )}
        </div>
      </div>

      <div
        ref={track}
        data-lenis-prevent={pinned ? undefined : true}
        className={
          pinned
            ? "mt-12 flex w-full gap-6 pl-[max(1.25rem,calc((100vw-80rem)/2+3rem))] pr-[8vw] will-change-transform"
            : "scrollbar-hide mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:px-8"
        }
      >
        {publications.map((p, i) => (
          <PaperCard key={p.title} paper={p} index={i} />
        ))}
        {pinned && (
          <div className="flex w-[22rem] shrink-0 items-center justify-center">
            <p className="text-center text-3xl font-semibold italic tracking-tight text-white/30">
              More coming soon…?
            </p>
          </div>
        )}
      </div>

      {!pinned && (
        <p className="mt-2 text-center text-xs uppercase tracking-[0.25em] text-muted">swipe to explore</p>
      )}
    </section>
  );
};

export default Research;
