import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { Frameworks } from "../components/FrameWorks";


const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
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
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories. It reflects my
          ability to solve complex problems, passion for technology,
          and manage projects effectively.
        </motion.p>
      </div>
      <section className="mt-8 mb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/10 via-purple-900/20 to-pink-900/10 border border-violet-500/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent"></div>
                      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:pl-8 h-[16rem] lg:h-[18rem]">
            {/* Left Content */}
            <div className="flex flex-col justify-between pt-6 pb-8 z-10">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent">
                  Tech Toolkit
                </h3>
              </div>
              <div className="space-y-4 mb-8">
                <p className="text-gray-300 text-base leading-relaxed max-w-md">
                  A curated collection of cutting-edge technologies and frameworks
                  that power my creative vision into reality.
                </p>
                                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-violet-900/20 to-purple-900/30 text-violet-200 rounded-full border border-violet-400/30">
                      Full-Stack
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-900/20 to-pink-900/30 text-purple-200 rounded-full border border-purple-400/30">
                      Cloud Native
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-pink-900/20 to-violet-900/30 text-pink-200 rounded-full border border-pink-400/30">
                      Modern
                    </span>
                  </div>
              </div>
            </div>
            {/* Right Content - Orbiting Icons */}
            <div className="relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/20"></div>
              <div className="relative w-full h-full flex items-center justify-center scale-110">
                <Frameworks />
              </div>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/20 to-violet-500/20 rounded-full blur-2xl"></div>
        </div>
      </section>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "works");
