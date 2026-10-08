import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, GraduationCap } from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import { education } from "@/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Education = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      // the vertical line fills as you scroll through the list
      gsap.fromTo(
        ".edu-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".edu-list",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
      // each node lights up when its card passes the middle
      gsap.utils.toArray(".edu-node").forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 62%",
          onEnter: () => node.classList.add("is-active"),
          onLeaveBack: () => node.classList.remove("is-active"),
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="education" ref={root} className="section">
      <div className="container-x">
        <SectionHeading title="Education" align="center" />

        <div className="edu-list relative mx-auto mt-16 max-w-4xl">
          {/* rail */}
          <div aria-hidden className="absolute bottom-0 left-5 top-0 w-px bg-white/10 md:left-1/2" />
          <div
            aria-hidden
            className="edu-progress absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-brand via-brand-pink to-brand-cyan md:left-1/2"
          />

          <ol className="flex flex-col gap-12 md:gap-20">
            {education.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <li key={item.title} className="relative grid grid-cols-[2.5rem_1fr] gap-6 md:grid-cols-[1fr_4rem_1fr] md:gap-0">
                  {/* node */}
                  <div className="edu-node group relative z-10 flex justify-center md:col-start-2 md:row-start-1">
                    <span className="absolute left-1/2 top-1 h-3 w-3 -translate-x-1/2 rounded-full border border-white/40 bg-bg transition-all duration-500 [.is-active_&]:scale-125 [.is-active_&]:border-brand-light [.is-active_&]:bg-brand [.is-active_&]:shadow-[0_0_24px_4px_rgba(139,92,246,.6)]" />
                  </div>

                  {/* year label (desktop) */}
                  <Reveal
                    x={left ? 30 : -30}
                    y={0}
                    className={`hidden md:flex md:row-start-1 ${left ? "md:col-start-3 md:pl-10" : "md:col-start-1 md:justify-end md:pr-10"}`}
                  >
                    <span className="text-6xl font-bold tracking-tighter text-white/[0.06] lg:text-8xl">{item.year}</span>
                  </Reveal>

                  {/* card */}
                  <Reveal
                    x={left ? -30 : 30}
                    y={0}
                    delay={0.05}
                    className={`col-start-2 md:row-start-1 ${left ? "md:col-start-1 md:pr-10" : "md:col-start-3 md:pl-10"}`}
                  >
                    <TiltCard className="p-6 sm:p-7" maxTilt={5}>
                      <div className="relative z-10 flex gap-4">
                        <img src={item.logo} alt="" className="h-14 w-14 shrink-0 object-contain" loading="lazy" />
                        <div className="min-w-0">
                          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-light">
                            <Calendar size={12} /> {item.date}
                          </p>
                          <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight sm:text-xl">{item.title}</h3>
                          <p className="mt-2 inline-flex items-start gap-1.5 text-sm leading-relaxed text-muted">
                            <GraduationCap size={14} className="mt-0.5 shrink-0" />
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </TiltCard>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Education;
