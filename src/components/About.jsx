import { useRef } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import { styles } from "../styles";
import { textVariant, fadeIn } from "../utils/motion";
import { ShineBorder } from "@/components/magicui/shine-border";

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Introduction</p>
        <h2 className={`${styles.sectionHeadText}`}>About Me.</h2>
      </motion.div>
        <div className="mt-12">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left: Photo Section */}
            <motion.div
              variants={fadeIn("left", "tween", 0.2, 1)}
              className="lg:col-span-1"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/20 via-purple-900/30 to-pink-900/20 border border-violet-500/20 backdrop-blur-sm p-8 h-full min-h-[400px]">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  {/* Photo */}
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-4 border-violet-400/30 flex items-center justify-center mb-6 overflow-hidden">
                  <img 
                    src="/images/Person.jpg"
                    alt="Shun Takenaka" 
                    className="w-44 h-44 rounded-full object-cover"
                  />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Shun Takenaka</h3>
                  {/* <p className="text-violet-200 text-center mb-6">Solution Engineer</p> */}
                  {/* Social Links */}
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/Moyarzabal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/in/shun-takenaka"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Center: Personal Info Card */}
            <motion.div
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="lg:col-span-1 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/30 via-gray-800/40 to-zinc-800/30 border border-gray-400/30 backdrop-blur-sm p-8"
            >
              <ShineBorder shineColor={["#64748B", "#94A3B8", "#CBD5E1"]} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/5 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-6">About Me</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                I am driven by the vision of harnessing technology to transform society and shape a better future for humanity. Constantly engaging with cutting-edge innovations, I seek to turn bold ideas into solutions that redefine what is possible.                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-violet-900/20 to-purple-900/30 text-violet-200 rounded-full border border-violet-400/30">
                    Problem Solver
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-900/20 to-pink-900/30 text-purple-200 rounded-full border border-purple-400/30">
                    Tech Innovator
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-pink-900/20 to-violet-900/30 text-pink-200 rounded-full border border-pink-400/30">
                    Research Driven
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right: Core Expertise - Vertical */}
            <motion.div
              variants={fadeIn("right", "tween", 0.4, 1)}
              className="lg:col-span-1 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/20 via-blue-900/30 to-cyan-900/20 border border-blue-500/20 backdrop-blur-sm p-8"
            >
              <ShineBorder shineColor={["#3B82F6", "#60A5FA", "#93C5FD"]} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-6">Core Expertise</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-violet-500"></div>
                    <span className="text-gray-300 text-lg">Full-Stack Development</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-violet-400"></div>
                    <span className="text-gray-300 text-lg">Research & Development</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-violet-300"></div>
                    <span className="text-gray-300 text-lg">Cloud Architecture</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-violet-400"></div>
                    <span className="text-gray-300 text-lg">Vibe Coding</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-violet-500"></div>
                    <span className="text-gray-300 text-lg">Human-Computer Interaction</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
    </section>
  );
};

export default About;
