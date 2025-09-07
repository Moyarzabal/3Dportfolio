import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";

const Hero2 = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-start md:pt-0 pt-10 md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping the
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        {word}
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>through the power of technology</h1>
              <h1>beyond imagination.</h1>
            </div>

            <p className="text-white-50 md:text-xl mb-5 relative z-10 pointer-events-none">
              Hi, I'm <strong className="text-blue-200 text-2xl">Shun, </strong>
              a solution engineer<br></br>
              passionate about creating impactful technology solutions.
            </p>

            <div className="flex flex-col md:flex-row gap-10 md:ml-16 ml-6">
              <Button
                text="See My Work"
                className="md:w-64 md:h-14 w-52 h-10"
                id="works"
              />
              <Button
                text="Enter My Room"
                className="md:w-64 md:h-14 w-52 h-10 enter-room-btn"
                id="about"
              />
            </div>
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </div>

      {/* <AnimatedCounter /> */}
    </section>
  );
};

export default Hero2;