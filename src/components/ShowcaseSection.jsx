import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const research1Ref = useRef(null);
  const research2Ref = useRef(null);
  const research3Ref = useRef(null);
  const research4Ref = useRef(null);
  const research5Ref = useRef(null);
  const research6Ref = useRef(null);
  const presentationRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [research1Ref.current, research2Ref.current, research3Ref.current, research4Ref.current, research5Ref.current, research6Ref.current, presentationRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });

  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>Publications</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          <span className="block md:hidden">Research.</span>
          <span className="hidden md:inline">Research Achievements.</span>
        </h2>
      </motion.div>
      <div ref={sectionRef} className="app-showcase">
        <div className="w-full">
          <div className="showcaselayout">
            <div ref={research1Ref} className="first-project-wrapper">
              <a
                href="/pdfs/SAPposter.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition"
              >
                <div className="image-wrapper bg-[#ffffff]">
                  <img src="/images/Research11.png" alt="Ryde App Interface" />
                </div>
                <div className="text-content">
                  <h2>Who Are You, Again?: Effect of Changing Partners' Avatars and Virtual Environments on Profile Memory</h2>
                  <p className="text-white-50 md:text-xl">
                    ACM Symposium on Applied Perception 2023 (SAP '23)
                  </p>
                </div>
              </a>
            </div>

            <div className="project-list-wrapper overflow-hidden">
              <div className="project" ref={research2Ref}>
                <a
                  href="https://doi.org/10.1145/3675231.3675241"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition"
                >
                  <div className="image-wrapper bg-[#ffffff]">
                    <img
                      src="/images/Research2.png"
                      alt="Library Management Platform"
                    />
                  </div>
                  <h2>
                    Effects of Human and Animal Partner-Avatars on Profile Memory in Virtual Reality
                  </h2>
                  <p className="text-white-50 md:text-xl">
                    ACM Symposium on Applied Perception 2024 (SAP '24)
                  </p>
                </a>
              </div>

              <div className="project" ref={research3Ref}>
                <a
                  href="https://conference.vrsj.org/ac2024/program/doc/2D1-11.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition"
                >
                  <div className="image-wrapper bg-[#ffffff]">
                    <img src="/images/Research3.png" alt="YC Directory App" />
                  </div>
                  <h2>
                    セルフアバタによる身体化がVR回想法に与える効果
                  </h2>
                  <p className="text-white-50 md:text-xl">
                    第29回日本バーチャルリアリティ学会大会論文集(2024)
                  </p>
                </a>
              </div>
            </div>

            
          </div>
          <div className="showcaselayout">
            <div className="project-list-wrapper overflow-hidden">
              <div className="project" ref={research4Ref}>
                <a
                  href="https://ieeexplore.ieee.org/abstract/document/10609545"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition"
                >
                  <div className="image-wrapper bg-[#ffffff]">
                    <img
                      src="/images/Research4.png"
                      alt="Library Management Platform"
                    />
                  </div>
                  <h2>
                    Multiple Self-Avatar Effect: Effects of Using Diverse Self-Avatars on Memory Acquisition and Retention of Sign-Language Gestures (2nd Author)
                  </h2>
                  <p className="text-white-50 md:text-xl">
                    IEEE Transactions on Visualization and Computer Graphics (2024)
                  </p>
                </a>
              </div>

              <div className="project" ref={research5Ref}>
                <a
                  href="https://doi.org/10.1109/VRW66409.2025.00158/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition"
                >
                  <div className="image-wrapper bg-[#ffffff]">
                    <img src="/images/Research5.png" alt="YC Directory App" />
                  </div>
                  <h2>
                    Exploring the Effects of Self-Avatars on Virtual Reality-Based Reminiscence Therapy for Young Adults
                  </h2>
                  <p className="text-white-50 md:text-xl">
                    2025 IEEE Conference on Virtual Reality and 3D User Interfaces Abstracts and Workshops (VRW)
                  </p>
                </a>
              </div>
            </div>
            <div ref={research6Ref} className="final-project-wrapper">
              <div className="image-wrapper bg-[#ffffff]">
                <img src="/images/Research6.png" alt="Ryde App Interface" />
              </div>
              <div className="text-content">
                <h2>
                  Back to the Childhood: Investigating the Role of Self-Avatars in Virtual Reality-Based Reminiscence Therapy
                </h2>
                <p className="text-white-50 md:text-xl">
                  The Augmented Humans International Conference 2025
                </p>
              </div>
              <div className="bg-sky-100 rounded-2xl flex flex-col justify-center items-center h-80 shadow-md border border-gray-200 mt-20">
                <span className="text-5xl text-gray-400 font-pacifico">Coming Soon...?</span>
              </div>
            </div>
            {/* <div ref={presentationRef} className="presentation-project-wrapper">
              <div className="image-wrapper bg-[#ffffff]">
                <img src="/images/Research6.png" alt="Ryde App Interface" />
              </div>
              <div className="text-content">
                <h2>
                  Back to the Childhood: Investigating the Role of Self-Avatars in Virtual Reality-Based Reminiscence Therapy
                </h2>
                <p className="text-white-50 md:text-xl">
                  The Augmented Humans International Conference 2025
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(AppShowcase, "research");
