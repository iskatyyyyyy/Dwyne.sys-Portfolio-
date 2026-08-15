"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import ShaderBackground from "./components/ShaderBackground";

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const TYPING_PHRASES = ["Backend Developer", "Aspiring Cybersecurity Engineer"];

function ScrollReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px 0px -50px 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return null;
}

function TypingEffect() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_PHRASES[phraseIndex];
    let timeout: number;

    if (!deleting && text.length < current.length) {
      timeout = window.setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        90
      );
    } else if (!deleting && text.length === current.length) {
      timeout = window.setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text.length > 0) {
      timeout = window.setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        50
      );
    } else {
      timeout = window.setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((p) => (p + 1) % TYPING_PHRASES.length);
      }, 250);
    }

    return () => window.clearTimeout(timeout);
  }, [text, deleting, phraseIndex]);

  return (
    <>
      {text}
      <span className="typing-cursor text-secondary">▊</span>
    </>
  );
}

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$@%&*+-=<>?/\\|!";

function scrambleString(str: string): string {
  let out = "";
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    out += ch === " " ? " " : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
  }
  return out;
}

function useTextScramble(active: boolean, scopeRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active) return;
    const root = scopeRef.current;
    if (!root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const targets: { node: Text; original: string }[] = [];
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      const parent = node.parentElement;
      if (parent?.closest("[data-no-scramble]")) continue;
      const original = node.nodeValue ?? "";
      if (original.trim().length === 0) continue;
      targets.push({ node, original });
    }
    if (targets.length === 0) return;

    let raf = 0;
    const start = performance.now();
    const randomEnd = 560;
    const settleEnd = 920;

    const tick = (now: number) => {
      const t = now - start;
      if (t < randomEnd) {
        for (const tgt of targets) tgt.node.nodeValue = scrambleString(tgt.original);
      } else if (t < settleEnd) {
        const p = (t - randomEnd) / (settleEnd - randomEnd);
        for (const tgt of targets) {
          const reveal = Math.floor(p * tgt.original.length);
          tgt.node.nodeValue =
            tgt.original.slice(0, reveal) + scrambleString(tgt.original.slice(reveal));
        }
      } else {
        for (const tgt of targets) tgt.node.nodeValue = tgt.original;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      for (const tgt of targets) tgt.node.nodeValue = tgt.original;
    };
  }, [active, scopeRef]);
}

function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const duration = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="group text-center md:text-left">
      <div className="font-mono text-3xl md:text-4xl font-bold text-secondary tabular-nums transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_10px_rgba(45,212,191,0.45)]">
        {display}
      </div>
      <div className="mt-1 font-label-md text-xs uppercase tracking-wider text-on-surface-variant transition-colors duration-300 group-hover:text-secondary">
        {label}
      </div>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="px-2.5 py-1 bg-surface-container/60 text-on-surface-variant text-xs font-label-md rounded border border-secondary/20 hover:scale-[1.02] hover:border-secondary hover:text-secondary transition-all duration-300">
      {children}
    </span>
  );
}

function PlatformMeter({
  name,
  description,
  value,
}: {
  name: string;
  description: string;
  value: number;
}) {
  return (
    <div title={`${name} — ${description}`}>
      <div className="flex justify-between items-center mb-1 gap-2">
        <span className="font-label-md text-sm text-gray-300 truncate">{name}</span>
        <span className="font-mono text-xs text-secondary">{value}%</span>
      </div>
      <div className="h-1 rounded-full bg-surface-variant overflow-hidden">
        <div className="h-full bg-secondary rounded-full" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

function Competency({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 px-3 py-2.5 bg-surface-container/60 rounded border border-secondary/20 hover:scale-[1.02] hover:border-secondary transition-all duration-300">
      <span className="text-secondary font-mono text-xs shrink-0">[✓]</span>
      <span className="font-body-sm text-body-sm text-gray-300">{children}</span>
    </li>
  );
}

const TOP_ROLES = [
  {
    title: "President / Officer-in-Charge President",
    org: "Computer Students' Association - TUPM",
    year: "2025–2026",
    description:
      "Assumed presidential duties and led strategic planning, general assemblies, and organization-wide coordination during transition.",
  },
  {
    title: "Chairperson",
    org: "Cloud Frontier: Data in the Sky, AI Beyond the Horizon",
    year: "2025",
    description:
      "Oversaw the successful execution of a major seminar on AI and cloud computing, managing logistics, speakers, and promotions.",
  },
  {
    title: "Vice President for External Affairs",
    org: "Computer Students' Association - TUPM",
    year: "2025",
    description:
      "Managed external relations and partnerships while co-developing initiatives for inter-departmental collaboration.",
  },
];

const HISTORY_ROLES = [
  {
    title: "Co-Chairperson",
    org: "UI/UX Hack-A-Thon: Designing the Future",
    year: "2025",
    description:
      "Co-led the planning and implementation of a cross-university UI/UX hackathon, ensuring smooth program flow and team synergy.",
  },
  {
    title: "Sponsorship Head",
    org: "UI/UX Hack-A-Thon: Designing the Future",
    year: "2025",
    description:
      "Secured partnerships and funding through external writing and negotiations with industry partners and sponsors.",
  },
  {
    title: "Chairperson",
    org: "From Brain to Binary - Computer Students' Association - TUPM",
    year: "2025",
    description:
      "Spearheaded a departmental seminar focused on logic and algorithm design, handling content planning and team delegation.",
  },
  {
    title: "Secretary General",
    org: "Computer Students' Association - TUPM",
    year: "2024",
    description:
      "Maintained internal communication, prepared minutes of meetings, and ensured the timely dissemination of information.",
  },
  {
    title: "Assistant Technical Head",
    org: "Estudyante Night - TUPM",
    year: "2024",
    description:
      "Handled technical logistics, including audio-visual setup and program flow coordination for a campus-wide activity.",
  },
  {
    title: "OIC Councilor for Internal Control",
    org: "Collegiate Science - College Student Council - TUPM",
    year: "2024",
    description:
      "Provided oversight on internal council operations and financial processes to maintain transparency and accountability.",
  },
  {
    title: "Assistant Secretary",
    org: "Computer Students' Association - TUPM",
    year: "2023",
    description:
      "Supported documentation tasks and communication flow between officers and members during organizational activities.",
  },
  {
    title: "Auditing Committee",
    org: "College of Science - College Student Council - TUPM",
    year: "2023",
    description:
      "Assisted in auditing financial records and ensuring compliance with council standards.",
  },
];

type Project = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  summary: string;
  tags: string[];
  repoUrl: string;
  imagePlaceholder: string;
};

const projects: Project[] = [
  {
    title: "Project Iluvatar",
    slug: "iluvatar",
    category: "Simulation Engine",
    excerpt:
      "A high-performance Checkers Match Simulation engine built to analyze millions of game states concurrently.",
    summary:
      "A high-performance Checkers Match Simulation engine architected to analyze millions of game states concurrently. The engine pipelines state-space generation across multiprocessing workers and layers advanced move-prediction heuristics over statistically aggregated outcome data, turning raw simulation volume into match analytics and win-rate projections.",
    tags: ["Python", "Multiprocessing", "Algorithms"],
    repoUrl: "https://github.com/dwyne/iluvatar",
    imagePlaceholder: "/images/iluvatar-preview.png",
  },
  {
    title: "Handybook",
    slug: "handybook",
    category: "Academic Knowledge System",
    excerpt:
      "An interactive web-based digitalized student handbook and AI chatbot platform designed for TUP Manila.",
    summary:
      "A digitalized student handbook and AI chatbot platform built for TUP Manila. Implements a Retrieval-Augmented Generation (RAG) architecture that parses university policies into a queryable knowledge base, streamlines administrative document processing, and reduces manual inquiries by serving grounded, context-aware answers through the backend API.",
    tags: ["React", "Node.js", "Express", "Supabase", "Tailwind CSS"],
    repoUrl: "https://github.com/dwyne/handybook",
    imagePlaceholder: "/images/handybook-preview.png",
  },
  {
    title: "Kolehiyo",
    slug: "kolehiyo",
    category: "Tracker & Admissions Portal",
    excerpt:
      "A centralized platform solving information fragmentation in the Philippine college and scholarship application landscape.",
    summary:
      "A centralized platform engineered to solve information fragmentation across the Philippine college and scholarship application landscape. Ships real-time progress tracking, customized per-user dashboards, and verified mock-exam review modules, backed by a PostgreSQL data model with Supabase-managed auth, database, and storage.",
    tags: ["React", "PostgreSQL", "Supabase", "Tailwind CSS"],
    repoUrl: "https://github.com/dwyne/kolehiyo",
    imagePlaceholder: "/images/kolehiyo-preview.png",
  },
  {
    title: "Soulhart",
    slug: "soulhart",
    category: "Game Engine & Backend",
    excerpt:
      "A 2D top-down RPG action game written entirely in Java, pairing soul collection with wave-based ghost combat and an upgrade system.",
    summary:
      "A 2D top-down RPG action game developed entirely in Java where players collect souls to fight waves of ghosts through an upgrade system. Architected the core Java backend systems from scratch — a custom game-loop engine drives the simulation, physics, and rendering at a fixed timestep, while a dedicated collision-detection engine keeps entity movement grounded and deterministic. The entity, wave-manager, and upgrade systems follow strict OOP design so gameplay logic stays modular and testable.",
    tags: ["Java", "Game Loop Engine", "Collision Detection", "OOP"],
    repoUrl: "https://github.com/dwyne/soulhart",
    imagePlaceholder: "/images/soulhart-preview.png",
  },
];

type Credential = {
  name: string;
  issuer: string;
  year: string;
  imagePath: string;
  url: string;
};

const credentials: Credential[] = [
  {
    name: "Cyber Threat Management",
    issuer: "Cisco",
    year: "2025",
    imagePath: "/images/badges/cyber-threat-management.png",
    url: "https://www.credly.com/badges/b9782610-3f43-497d-8024-7acb039fda06/public_url",
  },
  {
    name: "Ethical Hacker",
    issuer: "Cisco",
    year: "2025",
    imagePath: "/images/badges/ethical-hacker.png",
    url: "https://www.credly.com/badges/0c9c24f1-b5fd-497e-bea0-2ae2c6e58f17/public_url",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    year: "2025",
    imagePath: "/images/badges/introduction-to-cybersecurity.png",
    url: "https://www.credly.com/badges/5052ba0a-344d-48f0-8619-352b0bda17e2/public_url",
  },
  {
    name: "Introduction to Modern AI",
    issuer: "Cisco",
    year: "2026",
    imagePath: "/images/badges/introduction-to-modern-ai.png",
    url: "https://www.credly.com/badges/1359c476-7442-4d97-b583-47d91d285dfd/public_url",
  },
];

function CredentialCard({ credential }: { credential: Credential }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <a
      href={credential.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-56 flex-col items-center rounded-lg border border-secondary/30 bg-background/40 p-4 pt-6 text-center backdrop-blur-md hover:scale-[1.02] hover:border-secondary transition-all duration-300"
    >
      {/* Issue year at top-right corner */}
      <span className="absolute top-2 right-3 font-mono text-xs text-secondary/60">
        {credential.year}
      </span>

      {/* Compact badge image */}
      <div
        className={`relative h-20 w-20 rounded ${
          imageFailed
            ? "border border-dashed border-error/40"
            : "border border-outline-variant/30"
        }`}
      >
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-[9px] tracking-widest text-on-surface-variant/70">
              [ img:missing ]
            </span>
          </div>
        ) : (
          <Image
            src={credential.imagePath}
            alt={`${credential.name} badge`}
            fill
            sizes="80px"
            onError={() => setImageFailed(true)}
            className="object-contain drop-shadow-md"
          />
        )}
      </div>

      <h3 className="mt-3 font-headline-sm text-headline-sm text-white">
        {credential.name}
      </h3>
      <div className="mt-1 font-label-md text-xs text-on-surface-variant">
        {credential.issuer}
      </div>
    </a>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="project-media group/media relative aspect-video overflow-hidden rounded border border-secondary/25 bg-surface-container-lowest/80 glass">
      {/* Terminal scanlines overlay */}
      <div className="media-scanlines pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* Dot grid backdrop */}
      <div
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, var(--color-outline-variant) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />
      {imageFailed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="font-mono text-3xl text-secondary/70 leading-none">[▚▞]</div>
          <div className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
            media://projects/{project.slug}
          </div>
          <div className="font-mono text-[11px] text-outline-variant">
            &gt; mount screenshot or architectural diagram here
          </div>
        </div>
      ) : (
        <Image
          src={project.imagePlaceholder}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          onError={() => setImageFailed(true)}
          className="object-cover"
        />
      )}
      {/* HUD corner labels */}
      <div className="absolute bottom-2 left-3 font-mono text-[10px] text-secondary/80">
        [ {project.slug}.media ]
      </div>
      <div className="absolute top-2 right-3 font-mono text-[10px] text-outline-variant">
        aspect:video
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="terminal-window group hover:scale-[1.02] hover:border-secondary transition-all duration-300">
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <span className="ml-2 font-label-md text-xs text-on-surface-variant truncate">
          ~/projects/{project.slug}
        </span>
      </div>

      <div className="bg-surface-container-lowest/60 p-5 md:p-6">
        {/* Minimized view */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1">
            <div className="mb-2">
              <span className="inline-flex px-2 py-0.5 bg-secondary/10 text-secondary font-label-md text-[10px] uppercase tracking-widest rounded border border-secondary/20">
                {project.category}
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-white mb-2">
              {project.title}
            </h3>
            <p className="font-body-sm text-body-sm text-gray-400 line-clamp-2">
              {project.excerpt}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((o) => !o)}
            aria-expanded={expanded}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start px-3 py-2 bg-background/40 backdrop-blur-md border border-secondary/30 text-secondary font-label-md text-xs rounded hover:border-secondary hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <span className="font-mono text-sm">[{expanded ? "-" : "+"}]</span>
            {expanded ? "Minimize" : "Expand Details"}
          </button>
        </div>

        {/* Expanded view */}
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="space-y-6 pt-6">
              <div>
                <div className="mb-2 font-label-md text-[10px] uppercase tracking-widest text-outline-variant">
                  &gt; technical_summary.txt
                </div>
                <p className="font-mono text-sm leading-relaxed text-gray-300">
                  {project.summary}
                </p>
              </div>

              <div>
                <div className="mb-2 font-label-md text-[10px] uppercase tracking-widest text-outline-variant">
                  &gt; stack --pills
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>
              </div>

              <ProjectMedia project={project} />

              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-label-md text-sm text-secondary hover:underline"
              >
                ./execute --view-repo
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  title,
  org,
  year,
  description,
}: {
  title: string;
  org: string;
  year: string;
  description: string;
}) {
  return (
    <div className="terminal-window hover:scale-[1.02] hover:border-secondary transition-all duration-300">
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <span className="ml-2 font-label-md text-xs text-secondary truncate">{title}</span>
        <span className="ml-auto font-label-md text-xs text-on-surface-variant">{year}</span>
      </div>
      <div className="p-5 bg-surface-container-lowest/60">
        <h3 className="font-headline-sm text-headline-sm text-white mb-1">{title}</h3>
        <div className="font-label-md text-sm text-secondary mb-3">{org}</div>
        <p className="font-body-md text-body-md text-gray-300">{description}</p>
      </div>
    </div>
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [ping, setPing] = useState(14);
  const [rebooting, setRebooting] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [resetCount, setResetCount] = useState(0);
  const [badgeInView, setBadgeInView] = useState(true);
  const badgeRef = useRef<HTMLButtonElement>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const scrambleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitStatus, setTransmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("from_name");
    const email = formData.get("reply_to");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
      setValidationError("sys.err: Missing required parameters. Transmission aborted.");
      return;
    }

    setValidationError("");
    setIsTransmitting(true);
    setTransmitStatus("idle");

    emailjs
      .sendForm(
        "service_l35byxe",
        "template_2yvgshv",
        formRef.current!,
        "C6gguQBJD2Hjg9YYL"
      )
      .then(() => {
        setValidationError("");
        setTransmitStatus("success");
        formRef.current?.reset();
      })
      .catch(() => {
        setTransmitStatus("error");
      })
      .finally(() => {
        setIsTransmitting(false);
      });
  };

  useTextScramble(rebooting, scrambleRef);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = badgeRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setBadgeInView(entries[0].isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPing((p) => {
        const delta = Math.round(Math.random() * 10 - 5);
        return Math.max(6, Math.min(48, p + delta));
      });
    }, 2500);
    return () => window.clearInterval(id);
  }, []);

  const handleReboot = () => {
    if (rebooting) return;
    setRebooting(true);
    setGlitching(true);
    window.setTimeout(() => {
      setResetCount((c) => c + 1);
    }, 450);
    window.setTimeout(() => {
      setGlitching(false);
    }, 600);
    window.setTimeout(() => {
      setRebooting(false);
    }, 1000);
  };

  return (
    <>
      {/* Background Shader */}
      <ShaderBackground resetSignal={resetCount} />

      {/* Reboot glitch overlay */}
      {glitching && (
        <div
          className="fixed inset-0 z-[60] glitch-overlay"
          aria-hidden="true"
        />
      )}

      {/* Full-page wrapper (glitched during reboot) */}
      <div ref={scrambleRef} className={glitching ? "screen-glitch" : ""}>
      <ScrollReveal />
      {/* TopNavBar */}
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/20 backdrop-blur-lg border-b border-white/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-3 font-mono cursor-pointer hover:text-secondary transition-colors duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-secondary live-dot"></span>
              <span>
                dwyne<span className="text-secondary">.sys</span>
              </span>
            </button>
            <span className="text-xs text-on-surface-variant font-normal">
              PING: <span className="text-secondary">{ping}ms</span>
            </span>
          </div>
          <div className="flex items-center gap-6 w-full justify-end">
            <ul className="hidden md:flex ml-auto justify-end gap-x-6 items-center">
              <li>
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-secondary hover:scale-105 hover:drop-shadow-[0_0_6px_rgba(45,212,191,0.4)] transition-all duration-300 ease-in-out"
                  href="#home"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-secondary hover:scale-105 hover:drop-shadow-[0_0_6px_rgba(45,212,191,0.4)] transition-all duration-300 ease-in-out"
                  href="#about"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-secondary hover:scale-105 hover:drop-shadow-[0_0_6px_rgba(45,212,191,0.4)] transition-all duration-300 ease-in-out"
                  href="#expertise"
                >
                  Expertise
                </a>
              </li>
              <li>
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-secondary hover:scale-105 hover:drop-shadow-[0_0_6px_rgba(45,212,191,0.4)] transition-all duration-300 ease-in-out"
                  href="#experience"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-secondary hover:scale-105 hover:drop-shadow-[0_0_6px_rgba(45,212,191,0.4)] transition-all duration-300 ease-in-out"
                  href="#credentials"
                >
                  Credentials
                </a>
              </li>
              <li>
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-secondary hover:scale-105 hover:drop-shadow-[0_0_6px_rgba(45,212,191,0.4)] transition-all duration-300 ease-in-out"
                  href="#projects"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-secondary hover:scale-105 hover:drop-shadow-[0_0_6px_rgba(45,212,191,0.4)] transition-all duration-300 ease-in-out"
                  href="#blog"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-secondary hover:scale-105 hover:drop-shadow-[0_0_6px_rgba(45,212,191,0.4)] transition-all duration-300 ease-in-out"
                  href="#contact"
                >
                  Contact
                </a>
              </li>
            </ul>
            <button
              type="button"
              data-no-scramble
              onClick={handleReboot}
              disabled={rebooting}
              className={`inline-flex items-center gap-2 px-3 py-1.5 glass rounded border font-label-md text-xs cursor-pointer transition-all duration-300 ${
                badgeInView
                  ? "opacity-0 translate-y-2 pointer-events-none"
                  : "opacity-100 translate-y-0"
              } ${
                rebooting
                  ? "border-error/40"
                  : "border-outline-variant/40 hover:border-secondary hover:scale-[1.02]"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  rebooting ? "bg-amber-400 pulse-dot" : "bg-secondary live-dot"
                }`}
              ></span>
              <span className="text-on-surface-variant">
                SYS:{" "}
                <span className={rebooting ? "text-amber-300" : "text-secondary"}>
                  {rebooting ? "RECONNECTING..." : "ONLINE"}
                </span>
              </span>
              <span className="text-outline-variant">|</span>
              <span className="text-on-surface-variant">
                <span className="text-secondary">{ping}ms</span>
              </span>
            </button>
          </div>
        </div>
      </nav>

      <main className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-24 overflow-x-hidden">
        {/* Hero / About Section */}
        <section
          className="py-24 grid grid-cols-1 md:grid-cols-12 gap-gutter items-center min-h-[560px]"
          id="home"
        >
          <div className="col-span-1 md:col-span-12">
            <div className="mb-4 flex items-center gap-3">
              <button
                ref={badgeRef}
                onClick={handleReboot}
                disabled={rebooting}
                className="inline-flex items-center gap-2 px-2 py-1 bg-secondary/10 text-secondary font-label-md text-xs rounded border border-secondary/20 cursor-pointer hover:scale-[1.02] hover:border-secondary disabled:opacity-80 disabled:cursor-wait transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#67df70] pulse-dot"></span>
                SYSTEM.INIT()
                <span className="text-sm font-mono leading-none">&gt;_</span>
              </button>
              <span
                data-no-scramble
                className={`inline-flex items-center gap-2 font-label-md text-sm ${
                  rebooting ? "text-amber-300 glitch" : "text-on-surface-variant"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full pulse-dot ${
                    rebooting ? "bg-amber-400" : "bg-[#67df70]"
                  }`}
                ></span>
                Status: {rebooting ? "Reconnecting..." : "Online"}
              </span>
              <span
                data-no-scramble
                className="inline-flex items-center gap-2 px-2.5 py-1 border border-green-500/30 bg-green-500/10 text-green-400 font-label-md text-xs rounded font-mono"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400"></span>
                </span>
                OPEN_TO_WORK
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-white mb-3">
              Hi, I am{" "}
              <span className="block font-mono text-6xl md:text-7xl mt-1">
                Dwyne.
              </span>
            </h1>
            <p className="font-mono text-2xl text-secondary mb-4">
              <TypingEffect key={resetCount} />
            </p>
            <p className="font-body-lg text-body-lg text-gray-300 max-w-2xl mb-8">
              Currently expanding my expertise into the cybersecurity domain to identify a specialized focus, reinforcing foundational competencies through industry-recognized certifications and practical security badges.
            </p>
            <div className="flex gap-4">
              <a
                className="px-6 py-3 bg-background/40 backdrop-blur-md border border-secondary/30 text-foreground font-label-md text-label-md hover:scale-[1.02] hover:border-secondary transition-all duration-300 rounded"
                href="#projects"
              >
                Execute_Projects
              </a>
              <a
                className="group px-6 py-3 bg-background/40 backdrop-blur-md border border-secondary/30 text-foreground font-label-md text-label-md hover:scale-[1.02] hover:border-secondary transition-all duration-300 rounded flex items-center gap-2"
                href="#contact"
              >
                Initialize_Comms
              </a>
              <a
                className="group px-6 py-3 bg-background/40 backdrop-blur-md border border-secondary/30 text-foreground font-label-md text-label-md hover:scale-[1.02] hover:border-secondary transition-all duration-300 rounded flex items-center gap-2"
                href="/Resume_Dwyne-Scott-Japay.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                View_Resume.pdf
              </a>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-outline-variant/30 pt-8">
              <Counter value={4} label="Projects" />
              <Counter value={4} label="Certifications" />
              <Counter value={0} label="Write-ups" />
            </div>
          </div>
        </section>

        {/* About Dwyne */}
        <section className="mb-32" id="about">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-8 flex items-center gap-3">
            <span className="text-secondary">01.</span> About Dwyne
          </h2>
          <div className="glass rounded-lg tech-border p-6 md:p-10 transition-all duration-300 hover:scale-[1.01]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7">
                <p className="font-body-lg text-body-lg text-gray-300 leading-relaxed">
                  A backend developer and third-year CS student at TUP Manila transitioning into
                  cybersecurity. Experienced in team management and the design of secure, scalable
                  infrastructure, emphasizing code precision and thorough documentation.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#67df70]/10 text-[#67df70] text-xs font-label-md rounded border border-[#67df70]/20">
                    TUP Manila
                  </span>
                  <span className="px-3 py-1 bg-[#58a6ff]/10 text-[#58a6ff] text-xs font-label-md rounded border border-[#58a6ff]/20">
                    Backend
                  </span>
                  <span className="px-3 py-1 bg-[#ff7b70]/10 text-[#ff7b70] text-xs font-label-md rounded border border-[#ff7b70]/20">
                    Security Focus
                  </span>
                </div>
              </div>
              <div className="md:col-span-5">
                <ul className="space-y-5">
                  <li className="flex gap-3 group transition-all duration-300 hover:translate-x-1">
                    <span className="text-secondary font-mono mt-1 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(45,212,191,0.5)]">&gt;</span>
                    <div>
                      <div className="font-label-md text-xs uppercase tracking-wider text-secondary mb-1">
                        Background
                      </div>
                      <p className="font-body-md text-body-md text-gray-300">
                        Backend developer building services with Go, Python &amp; FastAPI.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 group transition-all duration-300 hover:translate-x-1">
                    <span className="text-secondary font-mono mt-1 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(45,212,191,0.5)]">&gt;</span>
                    <div>
                      <div className="font-label-md text-xs uppercase tracking-wider text-secondary mb-1">
                        Academic Focus
                      </div>
                      <p className="font-body-md text-body-md text-gray-300">
                        Third-year BS Computer Science student at TUP Manila.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 group transition-all duration-300 hover:translate-x-1">
                    <span className="text-secondary font-mono mt-1 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(45,212,191,0.5)]">&gt;</span>
                    <div>
                      <div className="font-label-md text-xs uppercase tracking-wider text-secondary mb-1">
                        Security Transition
                      </div>
                      <p className="font-body-md text-body-md text-gray-300">
                        Shifting into cybersecurity with a zero-trust, offensive-security mindset.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 group transition-all duration-300 hover:translate-x-1">
                    <span className="text-secondary font-mono mt-1 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(45,212,191,0.5)]">&gt;</span>
                    <div>
                      <div className="font-label-md text-xs uppercase tracking-wider text-secondary mb-1">
                        Current Milestone
                      </div>
                      <p className="font-body-md text-body-md text-gray-300">
                        Expanding technical grounding via active industry certifications and security badges
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-outline-variant/30 mb-24"></div>

        {/* Core Expertise */}
        <section className="mb-24" id="expertise">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-3">
            <span className="text-secondary">02.</span> Core Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:h-[560px] gap-4">
            {/* Box 1: Programming Skills */}
            <div className="h-full terminal-window hover:scale-[1.02] hover:border-secondary transition-all duration-300 flex flex-col group">
              <div className="terminal-header">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
                <span className="ml-2 font-label-md text-xs text-on-surface-variant">
                  programming_stack.py
                </span>
              </div>
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                  <div>
                    <div className="font-label-md text-[10px] uppercase tracking-wider text-outline-variant mb-2">
                      Languages
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Chip>C/C++</Chip>
                      <Chip>Java</Chip>
                      <Chip>Python</Chip>
                      <Chip>JavaScript</Chip>
                      <Chip>TypeScript</Chip>
                    </div>
                  </div>
                  <div>
                    <div className="font-label-md text-[10px] uppercase tracking-wider text-outline-variant mb-2">
                      Frontend
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Chip>React</Chip>
                      <Chip>Next.js</Chip>
                      <Chip>Tailwind CSS</Chip>
                      <Chip>Vite</Chip>
                    </div>
                  </div>
                  <div>
                    <div className="font-label-md text-[10px] uppercase tracking-wider text-outline-variant mb-2">
                      Server & Data
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Chip>Node.js</Chip>
                      <Chip>Express.js</Chip>
                      <Chip>FastAPI</Chip>
                      <Chip>PostgreSQL</Chip>
                    </div>
                  </div>
                  <div>
                    <div className="font-label-md text-[10px] uppercase tracking-wider text-outline-variant mb-2">
                      Auth & API
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Chip>OAuth</Chip>
                      <Chip>JWT</Chip>
                      <Chip>REST</Chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Box 2: Cybersecurity Platform */}
            <div className="h-full terminal-window hover:scale-[1.02] hover:border-secondary transition-all duration-300 flex flex-col group">
              <div className="terminal-header">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
                <span className="ml-2 font-label-md text-xs text-on-surface-variant">
                  cybersec_platforms.cfg
                </span>
              </div>
              <div className="flex-1 p-5 flex flex-col">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <PlatformMeter
                    name="TryHackMe"
                    description="Offensive/Defensive Labs"
                    value={3}
                  />
                  <PlatformMeter
                    name="HackTheBox"
                    description="Advanced Penetration Testing"
                    value={0}
                  />
                  <PlatformMeter
                    name="PortSwigger"
                    description="Web Security Academy — Web Security & Vulnerabilities"
                    value={0}
                  />
                  <PlatformMeter
                    name="LetsDefend"
                    description="SOC Simulation & Blue Team"
                    value={0}
                  />
                  <PlatformMeter
                    name="Palo Alto"
                    description="Enterprise Security & NGFW"
                    value={0}
                  />
                  <PlatformMeter
                    name="Cisco"
                    description="Network Architecture & Security"
                    value={10}
                  />
                  <PlatformMeter
                    name="OverTheWire"
                    description="Linux & Command Line Fundamentals"
                    value={0}
                  />
                  <PlatformMeter
                    name="Cybrary"
                    description="Multi-Disciplinary Security Tracks"
                    value={0}
                  />
                </div>
              </div>
            </div>
            {/* Box 3: Developer Tools */}
            <div className="h-full terminal-window hover:scale-[1.02] hover:border-secondary transition-all duration-300 flex flex-col group">
              <div className="terminal-header">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
                <span className="ml-2 font-label-md text-xs text-on-surface-variant">
                  dev_tools.sh
                </span>
              </div>
              <div className="flex-1 p-5 flex flex-col">
                <div className="grid grid-cols-2 grid-rows-2 h-full gap-x-4 gap-y-4">
                  <div>
                    <div className="font-label-md text-[10px] uppercase tracking-wider text-outline-variant mb-2">
                      Version Control
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Chip>Git</Chip>
                      <Chip>GitHub</Chip>
                    </div>
                  </div>
                  <div>
                    <div className="font-label-md text-[10px] uppercase tracking-wider text-outline-variant mb-2">
                      Environments & Editors
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Chip>VS Code</Chip>
                      <Chip>JetBrains IntelliJ</Chip>
                      <Chip>Linux / Bash</Chip>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-label-md text-[10px] uppercase tracking-wider text-outline-variant mb-2">
                      Collaboration & Ops
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Chip>Discord</Chip>
                      <Chip>Teams</Chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Box 4: Professional Competencies */}
            <div className="h-full terminal-window hover:scale-[1.02] hover:border-secondary transition-all duration-300 flex flex-col group">
              <div className="terminal-header">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
                <span className="ml-2 font-label-md text-xs text-on-surface-variant">
                  competencies.md
                </span>
              </div>
              <div className="flex-1 p-5 flex flex-col justify-between">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Competency>Team Management</Competency>
                  <Competency>Technical Communication</Competency>
                  <Competency>Cross-Functional Collaboration</Competency>
                  <Competency>Problem Solving</Competency>
                  <Competency>Agile Workflow</Competency>
                  <Competency>System Documentation</Competency>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-32" id="experience">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <h2 className="font-headline-md text-headline-md text-on-surface sticky top-24 flex items-center gap-3">
                <span className="text-secondary">03.</span> Experience
              </h2>
            </div>
            <div className="md:col-span-9 space-y-6">
              {TOP_ROLES.map((role) => (
                <RoleCard key={role.title} {...role} />
              ))}

              <button
                type="button"
                onClick={() => setHistoryOpen((o) => !o)}
                aria-expanded={historyOpen}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-background/40 backdrop-blur-md border border-secondary/30 text-secondary font-label-md text-label-md rounded hover:scale-[1.02] hover:border-secondary transition-all duration-300 cursor-pointer"
              >
                <span className="font-mono text-sm">[{historyOpen ? "-" : "+"}]</span>
                {historyOpen
                  ? "Collapse History"
                  : `View Complete Leadership History (${HISTORY_ROLES.length})`}
              </button>

              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  historyOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className={`min-h-0 ${historyOpen ? "" : "overflow-hidden"}`}>
                  <div className="space-y-4 p-4">
                    {HISTORY_ROLES.map((role) => (
                      <RoleCard key={role.title} {...role} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="mb-32" id="credentials">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-8 flex items-center gap-3">
            <span className="text-secondary">04.</span> Credentials
          </h2>
          <div className="flex flex-wrap justify-center gap-4 p-4">
            {credentials.map((credential) => (
              <CredentialCard key={credential.name} credential={credential} />
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-32" id="projects">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-8 flex items-center gap-3">
            <span className="text-secondary">05.</span> Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Blog & Writeups */}
        <section className="mb-32" id="blog">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-8 flex items-center gap-3">
            <span className="text-secondary">06.</span> Writeups
          </h2>
          <div className="terminal-window bg-background/40 border border-secondary/30 rounded-lg relative w-full max-w-4xl mx-auto">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <span className="ml-2 font-label-md text-xs text-secondary truncate">
                sys.log: data_stream_pending
              </span>
            </div>
            <div className="p-6">
              <p className="font-body-lg text-body-lg text-gray-400 leading-relaxed">
                Currently immersed in security labs, active certifications, and CTF challenges.
                Technical walkthroughs, vulnerability analyses, and platform writeups are
                compiling and will be published here soon.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-32" id="contact">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-8 flex items-center gap-3">
            <span className="text-secondary">07.</span> Contact Me
          </h2>
          <div className="terminal-window bg-background/40 border border-secondary/30 max-w-2xl mx-auto w-full">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <span className="ml-2 font-label-md text-xs text-secondary truncate">
                secure_transmission_channel
              </span>
            </div>
            <form
              ref={formRef}
              className="p-6 space-y-6"
              onSubmit={sendEmail}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2 font-label-md text-xs text-on-surface-variant">
                  Alias / Name
                  <input
                    type="text"
                    name="from_name"
                    required
                    className="w-full bg-transparent border-b border-secondary/50 py-2 text-foreground font-mono text-sm placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary/70 transition-colors duration-300"
                    placeholder="e.g., aether_ops"
                  />
                </label>
                <label className="flex flex-col gap-2 font-label-md text-xs text-on-surface-variant">
                  Secure Comms / Email
                  <input
                    type="email"
                    name="reply_to"
                    required
                    className="w-full bg-transparent border-b border-secondary/50 py-2 text-foreground font-mono text-sm placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary/70 transition-colors duration-300"
                    placeholder="e.g., operator@domain.com"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 font-label-md text-xs text-on-surface-variant">
                Subject / Directive
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full bg-transparent border-b border-secondary/50 py-2 text-foreground font-mono text-sm placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary/70 transition-colors duration-300"
                  placeholder="e.g., pentest_inquiry"
                />
              </label>
              <label className="flex flex-col gap-2 font-label-md text-xs text-on-surface-variant">
                Encrypted Payload / Message
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-transparent border-b border-secondary/50 py-2 text-foreground font-mono text-sm placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary/70 transition-colors duration-300 resize-y"
                  placeholder="Transmit your message..."
                />
              </label>
              {validationError && (
                <p className="text-red-500 text-xs font-mono mt-2 animate-pulse">
                  {validationError}
                </p>
              )}
              <button
                type="submit"
                disabled={isTransmitting}
                className="inline-flex items-center gap-2 px-6 py-3 bg-background/40 backdrop-blur-md border border-secondary/30 text-secondary font-label-md text-label-md hover:scale-105 hover:border-secondary disabled:opacity-60 disabled:cursor-wait transition-all duration-300 rounded cursor-pointer"
              >
                <span className="font-mono text-sm">
                  {isTransmitting ? "[ Transmitting... ]" : "[ Execute_Transmit ]"}
                </span>
              </button>
              {transmitStatus === "success" && (
                <p className="text-green-400 text-xs font-mono mt-4">
                  sys.log: Payload delivered successfully.
                </p>
              )}
              {transmitStatus === "error" && (
                <p className="text-red-500 text-xs font-mono mt-4">
                  sys.err: Transmission failed. Retrying connection...
                </p>
              )}
            </form>
            <div className="w-full border-t border-secondary/30 mt-8 pt-6 pb-6">
              <div className="flex justify-center gap-8 items-center">
                <a
                  href="https://github.com/iskatyyyyyy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-on-surface-variant hover:text-[#00ffcc] hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                >
                  <GithubIcon size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/dwynescott"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-on-surface-variant hover:text-[#00ffcc] hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                >
                  <LinkedinIcon size={20} />
                </a>
                <a
                  href="https://www.facebook.com/scottjapay"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-on-surface-variant hover:text-[#00ffcc] hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                >
                  <FacebookIcon size={20} />
                </a>
                <a
                  href="https://www.instagram.com/iskatyyyyy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-on-surface-variant hover:text-[#00ffcc] hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                >
                  <InstagramIcon size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background/20 backdrop-blur-lg border-t border-white/5 w-full">
        <div className="w-full px-margin-mobile md:px-margin-desktop py-8 max-w-container-max mx-auto">
          <p className="w-full text-center text-xs text-secondary/60 font-mono">
            © 2026 Dwyne.sys | Trust nothing. Verify everything.
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}
