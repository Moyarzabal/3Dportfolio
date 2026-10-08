import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Fade/slide-in when scrolled into view. Cheap: opacity + transform only.
 */
const Reveal = ({
  children,
  className,
  delay = 0,
  duration = 0.9,
  y = 36,
  x = 0,
  once = true,
  amount = 0.2,
  as = "div",
  ...rest
}) => {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount, margin: "0px 0px -60px 0px" }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export default Reveal;
