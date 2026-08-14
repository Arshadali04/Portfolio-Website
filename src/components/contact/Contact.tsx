"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormValues = z.infer<typeof schema>;

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus("success");
        setServerMessage(json.message);
        reset();
      } else {
        setStatus("error");
        setServerMessage(json.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease }}
          className="mb-16 text-center"
        >
          <span className="eyebrow mb-3 block text-accent">Get In Touch</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-fg">
            Let&apos;s Create Something{" "}
            <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted">
            Open to Data Engineer internships, collaborations, and interesting problems. Let&apos;s talk.
          </p>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left — Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col gap-6 rounded-xl border border-border bg-bg-card p-8"
          >
            <div>
              <h3 className="font-display text-lg font-bold text-fg">Contact Details</h3>
              <p className="mt-1 text-sm text-muted">
                The fastest way to reach me is email — I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:arshadalia2703@gmail.com"
                className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-fg"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-bg group-hover:border-accent">
                  <Mail size={15} strokeWidth={1.5} />
                </span>
                arshadalia2703@gmail.com
              </a>

              <div className="flex items-center gap-3 text-sm text-muted">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-bg">
                  <MapPin size={15} strokeWidth={1.5} />
                </span>
                Bengaluru, India
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="pulse-dot h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-fg">Open to opportunities</span>
            </div>

            <div className="h-px bg-border" />

            {/* Socials */}
            <div>
              <span className="eyebrow mb-3 block text-muted">Connect</span>
              <div className="flex gap-3">
                <a
                  href="https://github.com/Arshadali04"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent hover:text-fg focus-visible:outline-accent"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href="https://linkedin.com/in/arshadali4"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent hover:text-fg focus-visible:outline-accent"
                >
                  <LinkedinIcon size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            aria-live="polite"
            aria-atomic="true"
          >
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-green-500/20 bg-green-500/5 p-10 text-center">
                <CheckCircle2 size={40} className="text-green-500" />
                <h3 className="font-display text-xl font-bold text-fg">Message sent!</h3>
                <p className="text-sm text-muted">{serverMessage}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 rounded-full border border-border px-5 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-fg"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5 rounded-xl border border-border bg-bg-card p-8"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-fg/80"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    {...register("name")}
                    className={cn(
                      "w-full rounded-lg border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-muted/50 transition-colors focus:outline-none",
                      errors.name
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-border focus:border-accent"
                    )}
                  />
                  {errors.name && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle size={11} /> {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-fg/80"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    {...register("email")}
                    className={cn(
                      "w-full rounded-lg border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-muted/50 transition-colors focus:outline-none",
                      errors.email
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-border focus:border-accent"
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle size={11} /> {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-fg/80"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    {...register("message")}
                    className={cn(
                      "w-full resize-none rounded-lg border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-muted/50 transition-colors focus:outline-none",
                      errors.message
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-border focus:border-accent"
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle size={11} /> {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Server error */}
                {status === "error" && (
                  <p className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm text-red-400">
                    <AlertCircle size={14} /> {serverMessage}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-accent px-6 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-accent/40 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {status === "loading" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
