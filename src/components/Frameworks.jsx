import { OrbitingCircles } from "./OrbitingCircles";
// import OrbitingCircles from "@/components/magicui/orbiting-circles";

export function Frameworks() {
  const skills = [
    "cplusplus",
    "csharp",
    "css3",
    "github",
    "html5",
    "javascript",
    "react",
    "tailwindcss",
    "threejs",
    "typescript",
    "VBA",
    "python",
    "Java",
    "GCP",
    "AWS",
  ];
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40} speed={0.5}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse={true} speed={1}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} alt="Technology icon" className="duration-200 rounded-sm hover:scale-110" />
);
