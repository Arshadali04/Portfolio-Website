"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import { cn } from "@/lib/utils";

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
