import { Briefcase, Calendar } from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import { experiences } from "@/constants";

const ExperienceCard = ({ exp }) => (
  <TiltCard className="p-6 sm:p-8" maxTilt={4}>
    <div className="relative z-10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={exp.icon} alt="" className="h-12 w-12 shrink-0 object-contain" loading="lazy" />
          <div>
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{exp.title}</h3>
            <p className="text-sm text-brand-light">{exp.company}</p>
          </div>
        </div>
        {exp.current && (
          <span className="chip !border-emerald-400/30 !bg-emerald-400/10 text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" /> Current
          </span>
        )}
      </div>
      <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted">
        <Calendar size={12} /> {exp.date}
      </p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {exp.points.map((pt) => (
          <li key={pt} className="flex gap-3 text-sm leading-relaxed text-white/75">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-brand to-brand-pink" />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  </TiltCard>
);

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="container-x">
        <SectionHeading
          title="Development experience"
          align="center"
          description="From university C++ assignments to enterprise cloud platforms — a timeline of the work that shaped me."
        />

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div aria-hidden className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:left-1/2" />

          <ol className="flex flex-col gap-10 md:gap-16">
            {experiences.map((exp, i) => {
              const left = i % 2 === 0;
              return (
                <li key={exp.company} className="relative grid grid-cols-[2.5rem_1fr] gap-6 md:grid-cols-[1fr_4rem_1fr] md:gap-0">
                  <Reveal y={0} className="relative z-10 flex justify-center md:col-start-2 md:row-start-1">
                    <span className="mt-6 grid h-10 w-10 place-items-center rounded-full border border-line bg-bg text-brand-light shadow-glow">
                      <Briefcase size={16} />
                    </span>
                  </Reveal>
                  <Reveal
                    x={left ? -40 : 40}
                    y={0}
                    className={`col-start-2 md:row-start-1 ${left ? "md:col-start-1 md:pr-10" : "md:col-start-3 md:pl-10"}`}
                  >
                    <ExperienceCard exp={exp} />
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

export default Experience;
