import { useEffect, useState } from "react";
import { Github, Linkedin, MapPin, Sparkles } from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import CountUp from "./ui/CountUp";
import CopyEmail from "./ui/CopyEmail";
import Snack from "./fx/Snack";
import { expertise, socials, stats } from "@/constants";

const TokyoClock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Tokyo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time}</span>;
};

const Marquee = ({ items, reverse = false, duration = 38 }) => (
  <div className="mask-fade-x flex overflow-hidden">
    <div
      className="flex w-max shrink-0 gap-3 pr-3 animate-marquee"
      style={{ "--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
    >
      {[...items, ...items].map((t, i) => (
        <span key={`${t}-${i}`} className="chip whitespace-nowrap !px-4 !py-2 text-sm">
          <Sparkles size={12} className="text-brand-light" />
          {t}
        </span>
      ))}
    </div>
  </div>
);

const About = () => {
  return (
    <section id="about" className="section">
      <Snack id={0} className="right-[6%] top-[14%]" />
      <div className="container-x">
        <SectionHeading
          title="About me"
          description="Engineer by training, researcher by curiosity. I build things that sit at the intersection of people and technology."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {/* profile */}
          <Reveal className="md:row-span-2 lg:col-span-4" delay={0}>
            <TiltCard className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-brand via-brand-pink to-brand-cyan opacity-80 blur-[2px]" />
                  <img
                    src="/images/webp/person.webp"
                    alt="Shun Takenaka"
                    width={160}
                    height={160}
                    loading="lazy"
                    className="relative h-36 w-36 rounded-full object-cover ring-4 ring-bg sm:h-40 sm:w-40"
                  />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Shun Takenaka</h3>
                <p className="mt-1 text-sm text-brand-light">Solution Engineer · HCI Researcher</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
                  <MapPin size={12} /> Tokyo, Japan
                </p>
                <div className="mt-6 flex gap-3">
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.04] transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.04] transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
                <CopyEmail className="mt-4 max-w-full text-xs" />
              </div>
            </TiltCard>
          </Reveal>

          {/* passion */}
          <Reveal className="lg:col-span-8" delay={0.08}>
            <TiltCard className="h-full p-8 sm:p-10" maxTilt={4}>
              <div className="relative z-10">
                <p className="text-xl font-medium leading-snug tracking-tight text-white/90 sm:text-2xl lg:text-[1.7rem]">
                  I am driven by the vision of harnessing technology to{" "}
                  <span className="text-gradient">transform society</span> and shape a better future for
                  humanity. Constantly engaging with cutting-edge innovations, I turn bold ideas into solutions that
                  redefine what is possible.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Problem Solver", "Tech Innovator", "Research Driven", "Vibe Coder"].map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* stats */}
          <Reveal className="lg:col-span-4" delay={0.14}>
            <TiltCard className="h-full p-8" maxTilt={5}>
              <div className="relative z-10 grid grid-cols-2 gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </TiltCard>
          </Reveal>

          {/* now */}
          <Reveal className="lg:col-span-4" delay={0.2}>
            <TiltCard className="h-full p-8" maxTilt={5}>
              <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold">Currently a Solution Engineer at Fujitsu</h3>
                  <p className="mt-1 text-sm text-muted">
                    Designing operation systems for a major telecom service, and hacking on AI apps on weekends.
                  </p>
                </div>
                <div className="flex items-end justify-between border-t border-line pt-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted">Local time</p>
                    <p className="mt-1 text-2xl font-semibold">
                      <TokyoClock />
                    </p>
                  </div>
                  <span className="chip !border-emerald-400/30 !bg-emerald-400/10 text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Open to collab
                  </span>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* expertise marquee */}
          <Reveal className="md:col-span-2 lg:col-span-12" delay={0.26}>
            <div className="card flex flex-col gap-4 p-6 sm:p-8">
              <h3 className="text-lg font-semibold">What I'm good at</h3>
              <div className="flex flex-col gap-3 [&:hover_.animate-marquee]:[animation-play-state:paused]">
                <Marquee items={expertise} />
                <Marquee items={[...expertise].reverse()} reverse duration={46} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
