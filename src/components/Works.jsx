import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { Frameworks } from "../components/Frameworks";


const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  additional_links,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>

        {/* Additional Links Section */}
        {additional_links && additional_links.length > 0 && (
          <div className='mt-4 pt-4 border-t border-gray-700'>
            <p className='text-gray-400 text-sm mb-2'>関連リンク:</p>
            <div className='flex flex-wrap gap-2'>
              {additional_links.map((link, linkIndex) => (
                <button
                  key={`${name}-link-${linkIndex}`}
                  onClick={() => window.open(link.url, "_blank")}
                  className='px-3 py-1 text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-1'
                >
                  {link.type === 'zenn' && '📝'}
                  {link.type === 'youtube' && '🎥'}
                  {link.type === 'website' && '🌐'}
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center md:text-left`}>My work</p>
        <h2 className={`${styles.sectionHeadText} text-center md:text-left`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex justify-center md:justify-start'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] text-center md:text-left'
        >
          These projects demonstrate my technical expertise and problem-solving approach
          through practical implementations and real-world applications. Each project
          includes detailed descriptions and source code access, showcasing my
          capability to tackle challenging technical problems, drive innovation,
          and deliver high-quality solutions.
        </motion.p>
      </div>
      <section className="mt-8 section-spacing">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/10 via-purple-900/20 to-pink-900/10 border border-violet-500/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent"></div>
                      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-6 px-4 lg:pl-8 py-6 lg:py-0 min-h-[24rem] lg:h-[18rem]">
            {/* Left Content */}
            <div className="flex flex-col justify-center lg:justify-between pt-0 lg:pt-6 pb-4 lg:pb-8 z-10">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent">
                  Tech Toolkit
                </h3>
              </div>
              <div className="space-y-3 lg:space-y-4">
                <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                  An extensive toolkit of modern technologies and innovative frameworks
                  that enable me to transform complex ideas into practical solutions.
                </p>
                                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 lg:px-3 py-1 text-xs font-medium bg-gradient-to-r from-violet-900/20 to-purple-900/30 text-violet-200 rounded-full border border-violet-400/30">
                      Full-Stack
                    </span>
                    <span className="px-2 lg:px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-900/20 to-pink-900/30 text-purple-200 rounded-full border border-purple-400/30">
                      Modern
                    </span>
                    <span className="px-2 lg:px-3 py-1 text-xs font-medium bg-gradient-to-r from-pink-900/20 to-violet-900/30 text-pink-200 rounded-full border border-pink-400/30">
                      Innovation
                    </span>
                  </div>
              </div>
            </div>
            {/* Right Content - Orbiting Icons */}
            <div className="relative flex items-center justify-center overflow-hidden h-48 lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/20"></div>
              <div className="relative w-full h-full flex items-center justify-center scale-90 lg:scale-110">
                <Frameworks />
              </div>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/20 to-violet-500/20 rounded-full blur-2xl"></div>
        </div>
      </section>

      <div className='mt-20'>
        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden flex overflow-x-auto gap-6 pb-4 scrollbar-hide" id="works-scroll-mobile">
          {projects.map((project, index) => (
            <div key={`project-${index}`} className="flex-shrink-0 w-80">
              <ProjectCard index={index} {...project} />
            </div>
          ))}
        </div>

        {/* Desktop: Original Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="md:hidden flex justify-center mt-4 scroll-indicator">
          <div className="flex items-center gap-2 text-gray-400 text-sm animate-pulse">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Scroll to see more</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "works");
