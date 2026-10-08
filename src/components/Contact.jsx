import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Check, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { EASE } from "@/lib/motion";
import TiltCard from "./ui/TiltCard";
import Globe from "./ui/Globe";
import CopyEmail from "./ui/CopyEmail";
import Magnetic from "./ui/Magnetic";
import { StarsCanvas } from "./canvas";
import { socials } from "@/constants";

const Field = ({ label, as = "input", ...props }) => {
  const Comp = as;
  return (
    <label className="group flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted transition-colors group-focus-within:text-brand-light">
        {label}
      </span>
      <Comp className="field" {...props} />
    </label>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [stage, setStage] = useState("edit"); // edit | confirm | sending | sent | error
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const review = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in every field before sending.");
      return;
    }
    setError("");
    setStage("confirm");
  };

  const send = async () => {
    setStage("sending");
    try {
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "3D Portfolio",
          from_email: form.email,
          to_email: "moyarzabalstake@gmail.com",
          message: form.message,
          sent_time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setStage("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStage("error");
    }
  };

  return (
    <section id="contact" className="section relative overflow-hidden !pb-14 lg:!pb-20">
      <StarsCanvas />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(60% 50% at 50% 100%, rgba(139,92,246,.18), transparent 70%)" }}
      />

      <div className="container-x">
        <SectionHeading
          title="Let's build something together"
          description="Have a project, a research idea or just want to say hi? My inbox is always open."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* form */}
          <Reveal className="lg:col-span-7">
            <TiltCard className="p-7 sm:p-10" maxTilt={2}>
              <div className="relative z-10">
                <AnimatePresence mode="wait" initial={false}>
                  {stage === "sent" ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="flex min-h-[26rem] flex-col items-center justify-center gap-5 text-center"
                    >
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/40">
                        <Check size={28} />
                      </span>
                      <h3 className="text-2xl font-bold tracking-tight">Message sent!</h3>
                      <p className="max-w-sm text-sm text-muted">Thank you — I will get back to you as soon as possible.</p>
                      <button type="button" onClick={() => setStage("edit")} className="btn-ghost mt-2">
                        Send another
                      </button>
                    </motion.div>
                  ) : stage === "confirm" || stage === "sending" ? (
                    <motion.div
                      key="confirm"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex flex-col gap-6"
                    >
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight">Ready to send?</h3>
                      </div>
                      <dl className="grid gap-4 rounded-2xl border border-line bg-white/[0.03] p-5 text-sm">
                        <div className="grid grid-cols-[6rem_1fr] gap-3">
                          <dt className="text-muted">Name</dt>
                          <dd className="font-medium">{form.name}</dd>
                        </div>
                        <div className="grid grid-cols-[6rem_1fr] gap-3">
                          <dt className="text-muted">Email</dt>
                          <dd className="font-medium">{form.email}</dd>
                        </div>
                        <div className="grid grid-cols-[6rem_1fr] gap-3">
                          <dt className="text-muted">Message</dt>
                          <dd className="whitespace-pre-wrap leading-relaxed text-white/85">{form.message}</dd>
                        </div>
                      </dl>
                      <div className="flex flex-wrap gap-3">
                        <button type="button" onClick={send} disabled={stage === "sending"} className="btn-primary disabled:opacity-70">
                          {stage === "sending" ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Sending…
                            </>
                          ) : (
                            <>
                              Confirm & send <Send size={15} />
                            </>
                          )}
                        </button>
                        <button type="button" onClick={() => setStage("edit")} disabled={stage === "sending"} className="btn-ghost">
                          Edit
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={review}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex flex-col gap-6"
                    >
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field label="Your name" name="name" value={form.name} onChange={onChange} placeholder="Jane Doe" autoComplete="name" />
                        <Field label="Your email" name="email" type="email" value={form.email} onChange={onChange} placeholder="jane@example.com" autoComplete="email" />
                      </div>
                      <Field
                        label="Your message"
                        as="textarea"
                        name="message"
                        rows={6}
                        value={form.message}
                        onChange={onChange}
                        placeholder="Tell me about your idea…"
                        className="field resize-none"
                      />
                      <AnimatePresence>
                        {(error || stage === "error") && (
                          <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
                          >
                            {error || "Something went wrong while sending. Please try again or email me directly."}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <div>
                        <Magnetic>
                          <button type="submit" className="btn-primary" data-cursor="hover">
                            Review message <Send size={15} />
                          </button>
                        </Magnetic>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </TiltCard>
          </Reveal>

          {/* info + globe */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <TiltCard className="flex h-full flex-col p-7 sm:p-10" maxTilt={4}>
              <div className="relative z-10 flex h-full flex-col gap-6">
                <div>
                  <h3 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
                    <MapPin size={20} className="text-brand-pink" /> Tokyo, Japan
                  </h3>
                  <p className="mt-2 text-sm text-muted">Working across time zones is fine — drag the globe.</p>
                </div>
                <Globe className="-my-2 max-w-[22rem] self-center" />
                <div className="mt-auto flex flex-col gap-3">
                  <CopyEmail className="w-full justify-center" />
                  <div className="grid grid-cols-3 gap-2">
                    <a href={`mailto:${socials.email}`} className="chip justify-center !py-2.5 hover:bg-white/10">
                      <Mail size={14} /> Email
                    </a>
                    <a href={socials.github} target="_blank" rel="noreferrer" className="chip justify-center !py-2.5 hover:bg-white/10">
                      <Github size={14} /> GitHub
                    </a>
                    <a href={socials.linkedin} target="_blank" rel="noreferrer" className="chip justify-center !py-2.5 hover:bg-white/10">
                      <Linkedin size={14} /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
