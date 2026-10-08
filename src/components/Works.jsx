import { ArrowUpRight, ExternalLink, Github, PenLine, Smartphone, Youtube } from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import OrbitingCircles from "./ui/OrbitingCircles";
import Snack from "./fx/Snack";
import { projects, techStack } from "@/constants";

const LINK_ICON = {
  appstore: Smartphone,
  zenn: PenLine,
  youtube: Youtube,
  website: ExternalLink,
};

const TechToolkit = () => (
  <Reveal>
    <TiltCard className="grid grid-cols-1 overflow-hidden lg:grid-cols-2" maxTilt={3}>
      <div className="relative z-10 flex flex-col justify-center gap-5 p-8 sm:p-10">
        <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-gradient">Tech</span> I reach for
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
          An extensive toolkit of modern technologies and frameworks that let me turn complex ideas into practical,
          shippable solutions — from Unity and C++ to Flutter, React and Google Cloud.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Full-stack", "Mobile", "XR", "Cloud", "AI"].map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-10 flex h-[22rem] items-center justify-center overflow-hidden sm:h-[24rem]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(139,92,246,.22), transparent 70%)" }}
        />
        <div className="relative h-full w-full scale-[.78] sm:scale-100">
          <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-line bg-bg shadow-glow">
            <img src="/logo.webp" alt="" className="h-7 w-7" />
          </div>
          <OrbitingCircles radius={150} iconSize={40} duration={34}>
            {techStack.slice(0, 9).map((s) => (
              <img key={s} src={`/assets/logos/${s}.svg`} alt={s} className="h-full w-full rounded-md object-contain" loading="lazy" />
            ))}
          </OrbitingCircles>
          <OrbitingCircles radius={90} iconSize={28} duration={24} reverse>
            {techStack.slice(9).map((s) => (
              <img key={s} src={`/assets/logos/${s}.svg`} alt={s} className="h-full w-full rounded-md object-contain" loading="lazy" />
            ))}
          </OrbitingCircles>
        </div>
      </div>
    </TiltCard>
  </Reveal>
);

const ProjectCard = ({ project, index }) => {
  const featured = project.featured;
  return (
    <Reveal delay={(index % 3) * 0.08} className={featured ? "md:col-span-2" : ""}>
      <TiltCard className={`group flex h-full flex-col ${featured ? "lg:flex-row" : ""}`} maxTilt={5}>
        {/* image */}
        <a
          href={project.links[0]?.url ?? project.source}
          target="_blank"
          rel="noreferrer"
          data-cursor-label="View"
          className={`relative z-10 block overflow-hidden ${featured ? "aspect-[16/10] lg:aspect-auto lg:w-1/2" : "aspect-[16/10]"}`}
        >
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
          {featured && (
            <span className="absolute left-4 top-4 chip !border-brand/40 !bg-brand/20 text-brand-light">Featured</span>
          )}
          <span className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            {project.tagline}
          </span>
        </a>

        {/* body */}
        <div className={`relative z-10 flex flex-1 flex-col gap-4 p-6 ${featured ? "lg:p-8" : ""}`}>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{project.name}</h3>
            <a
              href={project.source}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} source code`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-white/[0.04] text-white/70 transition-all hover:bg-white hover:text-bg"
            >
              <Github size={16} />
            </a>
          </div>
          <p className={`text-sm leading-relaxed text-muted ${featured ? "" : "line-clamp-4"}`}>{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="text-xs font-medium text-brand-light/90">
                #{t}
              </span>
            ))}
          </div>
          {project.links.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2 border-t border-line pt-4">
              {project.links.map((l) => {
                const Icon = LINK_ICON[l.type] ?? ArrowUpRight;
                return (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="chip !py-1.5 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white">
                    <Icon size={13} /> {l.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </TiltCard>
    </Reveal>
  );
};

const Works = () => {
  return (
    <section id="works" className="section">
      <Snack id={3} className="left-[5%] top-[7%]" />
      <div className="container-x flex flex-col gap-14">
        <SectionHeading
          title="Projects"
          description="Hackathon winners, App Store releases, VR experiments and the odd rubik's cube — each one taught me something new."
        />

        <TechToolkit />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
