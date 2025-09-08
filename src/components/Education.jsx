import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { edcCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
import { fadeIn, textVariant } from "../utils/motion";


gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  useGSAP(() => {
    // タイムラインの初期状態を設定（アイコンは常に表示）
    gsap.set(".timeline", { scaleY: 0, transformOrigin: "top top" });
    gsap.set(".gradient-line", { scaleY: 0, transformOrigin: "top top" });
    
    // 全ての学歴カードを初期状態で非表示に設定
    gsap.set(".exp-card-wrapper", { opacity: 0, y: 50 });
    
    // ロゴは常に表示されるように設定
    gsap.set(".timeline-logo", { opacity: 1, scale: 1 });

    // タイムラインのアニメーション（スクロールに連動）
    gsap.to(".timeline", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline-wrapper",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        pin: false,
      },
    });

    gsap.to(".gradient-line", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline-wrapper",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        pin: false,
      },
    });

    // 各学歴カードを順次表示
    gsap.utils.toArray(".exp-card-wrapper").forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: index * 0.2, // 各カードに0.2秒の遅延
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ロゴのアニメーション（アイコンは常に表示、軽微なエフェクトのみ）
    gsap.utils.toArray(".timeline-logo").forEach((logo, index) => {
      gsap.from(logo, {
        scale: 0.8,
        rotation: -90,
        duration: 0.6,
        ease: "back.out(1.2)",
        delay: index * 0.2 + 0.3,
      scrollTrigger: {
          trigger: logo.closest(".exp-card-wrapper"),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // テキストコンテンツのアニメーション
    gsap.utils.toArray(".expText").forEach((text, index) => {
      gsap.from(text, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
        delay: index * 0.2 + 0.5,
        scrollTrigger: {
          trigger: text.closest(".exp-card-wrapper"),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <section
      id="education"
      className="flex-center section-padding section-spacing xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-4 flex justify-center">
        <div className="w-full lg:w-4/5 max-w-4xl">
        <motion.div variants={textVariant()} className="text-center">
          <p className={`${styles.sectionSubText} text-center`}>What I have learned</p>
          <h2 className={`${styles.sectionHeadText} text-center`}>Education.</h2>
        </motion.div>
        <div className="mt-8 md:mt-16 lg:mt-32 relative px-2 md:px-5 lg:px-10">
          <div className="relative z-50 xl:space-y-32 lg:space-y-20 md:space-y-12 space-y-6">
            <div className="timeline-wrapper">
              <div className="timeline" />
              <div className="gradient-line w-1 h-full" />
            </div>
            {edcCards.map((card, index) => (
              <div key={card.title} className="exp-card-wrapper">
                <div className="w-full">
                  <div className="flex items-start">
                    <div className="expText flex xl:gap-20 md:gap-10 gap-3 lg:gap-5 relative z-20">
                      <div className="timeline-logo flex-shrink-0">
                        <img src={card.logoPath} alt="logo" className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h1 className="font-semibold text-base md:text-lg lg:text-3xl whitespace-pre-line leading-tight">{card.title}</h1>
                        <p className="my-2 md:my-3 lg:my-5 text-white-50 text-sm md:text-base">
                          <img src="/images/1018.png" alt="calendar" className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 inline mr-2" />
                          {card.date}
                        </p>
                        <div className="list-disc ms-3 md:ms-5 mt-2 md:mt-3 lg:mt-5 flex flex-col gap-2 md:gap-3 lg:gap-5 text-white-50">
                          {card.responsibilities.map(
                            (responsibility, index) => (
                              <p key={index} className="text-xs md:text-sm lg:text-lg leading-relaxed">
                                {responsibility}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
