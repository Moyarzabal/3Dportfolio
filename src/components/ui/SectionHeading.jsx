import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const word = {
  hidden: { y: "110%", rotate: 3 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE } },
};
const fade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Large conversational heading whose words rise out of a mask when scrolled
 * into view, followed by an optional one-line description.
 */
const SectionHeading = ({ title, description, align = "left", className }) => {
  const words = title.split(" ");
  const center = align === "center";

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
      className={cn("flex flex-col gap-4", center && "items-center text-center", className)}
    >
      <h2 className={cn("h-display", center ? "max-w-3xl" : "max-w-4xl")} aria-label={title}>
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="word-mask mr-[0.25em] last:mr-0">
            <motion.span variants={word} className="inline-block text-gradient">
              {w}
            </motion.span>
          </span>
        ))}
      </h2>
      {description && (
        <motion.p variants={fade} className={cn("max-w-2xl text-base leading-relaxed text-muted sm:text-lg", center && "mx-auto")}>
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
