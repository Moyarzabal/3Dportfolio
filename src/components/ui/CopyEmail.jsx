import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { socials } from "@/constants";
import { cn } from "@/lib/utils";

const CopyEmail = ({ className }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${socials.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      data-cursor="hover"
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-white/25 hover:bg-white/[0.08]",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="done"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 text-emerald-300"
          >
            <Check size={16} /> Copied!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2"
          >
            <Copy size={16} className="text-brand-light" /> {socials.email}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CopyEmail;
