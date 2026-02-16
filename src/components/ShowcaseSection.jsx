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

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [research1Ref.current, research2Ref.current, research3Ref.current, research4Ref.current, research5Ref.current, research6Ref.current].filter(Boolean);

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
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden flex overflow-x-auto gap-6 pb-4 scrollbar-hide" id="research-scroll-mobile">
            {/* Research Card 1 */}
            <div ref={research1Ref} className="flex-shrink-0 w-80">
              <a
                href="/pdfs/SAPposter.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition"
              >
                <div className="image-wrapper bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
                  <img src="/images/Research11.png" alt="Research 1" className="w-full h-48 object-cover rounded-lg" />
                </div>
                <div className="text-content">
                  <h2 className="text-lg font-semibold text-white leading-relaxed">Who Are You, Again?: Effect of Changing Partners' Avatars and Virtual Environments on Profile Memory</h2>
                  <p className="text-sm text-gray-300 mt-2">
                    ACM Symposium on Applied Perception 2023 (SAP '23)
                  </p>
                </div>
              </a>
            </div>

            {/* Research Card 2 */}
            <div ref={research2Ref} className="flex-shrink-0 w-80">
              <a
                href="https://doi.org/10.1145/3675231.3675241"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition"
              >
                <div className="image-wrapper bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
                  <img src="/images/Research2.png" alt="Research 2" className="w-full h-48 object-cover rounded-lg" />
                </div>
                <h2 className="text-lg font-semibold text-white leading-relaxed">
                  Effects of Human and Animal Partner-Avatars on Profile Memory in Virtual Reality
                </h2>
                <p className="text-sm text-gray-300 mt-2">
                  ACM Symposium on Applied Perception 2024 (SAP '24)
                </p>
              </a>
            </div>

            {/* Research Card 3 */}
            <div ref={research3Ref} className="flex-shrink-0 w-80">
              <a
                href="https://conference.vrsj.org/ac2024/program/doc/2D1-11.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition"
              >
                <div className="image-wrapper bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
                  <img src="/images/Research3.png" alt="Research 3" className="w-full h-48 object-cover rounded-lg" />
                </div>
                <h2 className="text-lg font-semibold text-white leading-relaxed">
                  セルフアバタによる身体化がVR回想法に与える効果
                </h2>
                <p className="text-sm text-gray-300 mt-2">
                  第29回日本バーチャルリアリティ学会大会論文集(2024)
                </p>
              </a>
            </div>

            {/* Research Card 4 */}
            <div ref={research4Ref} className="flex-shrink-0 w-80">
              <a
                href="https://ieeexplore.ieee.org/abstract/document/10609545"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition"
              >
                <div className="image-wrapper bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
                  <img src="/images/Research4.png" alt="Research 4" className="w-full h-48 object-cover rounded-lg" />
                </div>
                <h2 className="text-lg font-semibold text-white leading-relaxed">
                  Multiple Self-Avatar Effect: Effects of Using Diverse Self-Avatars on Memory Acquisition and Retention of Sign-Language Gestures (2nd Author)
                </h2>
                <p className="text-sm text-gray-300 mt-2">
                  IEEE Transactions on Visualization and Computer Graphics (2024)
                </p>
              </a>
            </div>

            {/* Research Card 5 */}
            <div ref={research5Ref} className="flex-shrink-0 w-80">
              <a
                href="https://doi.org/10.1109/VRW66409.2025.00158/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition"
              >
                <div className="image-wrapper bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
                  <img src="/images/Research5.png" alt="Research 5" className="w-full h-48 object-cover rounded-lg" />
                </div>
                <h2 className="text-lg font-semibold text-white leading-relaxed">
                  Exploring the Effects of Self-Avatars on Virtual Reality-Based Reminiscence Therapy for Young Adults
                </h2>
                <p className="text-sm text-gray-300 mt-2">
                  2025 IEEE Conference on Virtual Reality and 3D User Interfaces Abstracts and Workshops (VRW)
                </p>
              </a>
            </div>

            {/* Research Card 6 */}
            <div ref={research6Ref} className="flex-shrink-0 w-80">
              <div className="image-wrapper bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
                <img src="/images/Research6.png" alt="Research 6" className="w-full h-48 object-cover rounded-lg" />
              </div>
              <div className="text-content">
                <h2 className="text-lg font-semibold text-white leading-relaxed">
                  Back to the Childhood: Investigating the Role of Self-Avatars in Virtual Reality-Based Reminiscence Therapy
                </h2>
                <p className="text-sm text-gray-300 mt-2">
                  The Augmented Humans International Conference 2025
                </p>
              </div>
            </div>
          </div>

          {/* Desktop: Original Layout */}
          <div className="hidden md:block">
            <div className="showcaselayout">
              <div ref={research1Ref} className="first-project-wrapper">
                <a
                  href="/pdfs/SAPposter.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition"
                >
                  <div className="image-wrapper bg-white rounded-lg border border-gray-200 shadow-sm">
                    <img src="/images/Research11.png" alt="Ryde App Interface" />
                  </div>
                  <div className="text-content">
                    <h2 className="text-lg md:text-xl font-semibold text-white leading-relaxed">Who Are You, Again?: Effect of Changing Partners' Avatars and Virtual Environments on Profile Memory</h2>
                    <p className="text-sm md:text-base text-gray-300 mt-2">
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
                    <div className="image-wrapper bg-white rounded-lg border border-gray-200 shadow-sm">
                      <img
                        src="/images/Research2.png"
                        alt="Library Management Platform"
                      />
                    </div>
                    <h2 className="text-base md:text-lg font-semibold text-white leading-relaxed">
                      Effects of Human and Animal Partner-Avatars on Profile Memory in Virtual Reality
                    </h2>
                    <p className="text-sm md:text-base text-gray-300 mt-2">
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
                    <div className="image-wrapper bg-white rounded-lg border border-gray-200 shadow-sm">
                      <img src="/images/Research3.png" alt="YC Directory App" />
                    </div>
                    <h2 className="text-base md:text-lg font-semibold text-white leading-relaxed">
                      セルフアバタによる身体化がVR回想法に与える効果
                    </h2>
                    <p className="text-sm md:text-base text-gray-300 mt-2">
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
                    <div className="image-wrapper bg-white rounded-lg border border-gray-200 shadow-sm">
                      <img
                        src="/images/Research4.png"
                        alt="Library Management Platform"
                      />
                    </div>
                    <h2 className="text-base md:text-lg font-semibold text-white leading-relaxed">
                      Multiple Self-Avatar Effect: Effects of Using Diverse Self-Avatars on Memory Acquisition and Retention of Sign-Language Gestures (2nd Author)
                    </h2>
                    <p className="text-sm md:text-base text-gray-300 mt-2">
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
                    <div className="image-wrapper bg-white rounded-lg border border-gray-200 shadow-sm">
                      <img src="/images/Research5.png" alt="YC Directory App" />
                    </div>
                    <h2 className="text-base md:text-lg font-semibold text-white leading-relaxed">
                      Exploring the Effects of Self-Avatars on Virtual Reality-Based Reminiscence Therapy for Young Adults
                    </h2>
                    <p className="text-sm md:text-base text-gray-300 mt-2">
                      2025 IEEE Conference on Virtual Reality and 3D User Interfaces Abstracts and Workshops (VRW)
                    </p>
                  </a>
                </div>
              </div>
              <div ref={research6Ref} className="final-project-wrapper">
                <a
                  href="https://doi.org/10.1145/3745900.3746067"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition"
                >
                  <div className="image-wrapper bg-white rounded-lg border border-gray-200 shadow-sm">
                    <img src="/images/Research6.png" alt="Ryde App Interface" />
                  </div>
                  <div className="text-content">
                    <h2 className="text-lg md:text-xl font-semibold text-white leading-relaxed">
                      Back to the Childhood: Investigating the Role of Self-Avatars in Virtual Reality-Based Reminiscence Therapy
                    </h2>
                    <p className="text-sm md:text-base text-gray-300 mt-2">
                      The Augmented Humans International Conference 2025
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-violet-900/10 via-purple-900/20 to-pink-900/10 border border-violet-500/20 backdrop-blur-sm rounded-2xl flex flex-col justify-center items-center h-80 shadow-md mt-20">
                    <span className="text-5xl text-violet-300 font-pacifico">Coming Soon...?</span>
                  </div>
                </a>
              </div>
            </div>
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
      </div>
    </>
  );
};

export default SectionWrapper(AppShowcase, "research");
