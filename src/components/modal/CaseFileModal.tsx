import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play } from "lucide-react";
import { clsx } from "clsx";
import YouTubeEmbed, { extractYouTubeId } from "../media/YouTubeEmbed";
import LazyImage from "../ui/LazyImage";
import LazyVideo from "../ui/LazyVideo";
import { useReducedMotion } from "../../hooks/useReducedMotion";

// Union type for case file data
export type CaseFileData =
  | {
      type: "honor";
      id: string;
      title: string;
      oneLiner: string;
      context: string;
      whatIDid: string[];
      impact?: string[];
      proofLinks: Array<{ label: string; url: string }>;
      teaserMedia: { type: "image" | "teaser"; src: string; alt?: string };
      youtubeUrl?: string;
      tags: string[];
    }
  | {
      type: "experience";
      id: string;
      title: string;
      shortDescription: string;
      fullDescription: string;
      year: number;
      location?: string;
      media?: { type: "image" | "teaser"; src: string; alt?: string };
      tags: string[];
      relatedLinks?: Array<{ label: string; url: string }>;
    }
  | {
      type: "venture";
      id: string;
      name: string;
      tagline: string;
      context: string;
      whatIBuilt: string[];
      impact: string[];
      proofLinks: Array<{ label: string; url: string }>;
      teaserMedia: { type: "image" | "teaser"; src: string; alt?: string };
      youtubeUrl?: string;
      tags: string[];
    };

interface CaseFileModalProps {
  data: CaseFileData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CaseFileModal({
  data,
  isOpen,
  onClose,
}: CaseFileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);
  const [showYouTube, setShowYouTube] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showYouTube) {
          setShowYouTube(false);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, showYouTube]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setShowYouTube(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 100);

    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  const handleWatchVideo = (url: string) => {
    setYoutubeUrl(url);
    setShowYouTube(true);
  };

  const handleCloseYouTube = () => {
    setShowYouTube(false);
    setYoutubeUrl(null);
  };

  if (!data) return null;

  const media =
    data.type === "honor" || data.type === "venture"
      ? data.teaserMedia
      : data.media;
  const hasMedia = media !== undefined;
  const youtubeUrlValue =
    data.type === "honor" || data.type === "venture"
      ? data.youtubeUrl
      : undefined;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              exit={prefersReducedMotion ? false : { opacity: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.4 }}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Modal */}
            <motion.div
              ref={modalRef}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
              transition={prefersReducedMotion ? {} : { duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 z-[101] overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label={`Case file: ${data.title}`}
            >
              <div className="h-full flex flex-col lg:flex-row">
                {/* Left Panel - Media */}
                {hasMedia && (
                  <div className="relative w-full lg:w-1/2 h-64 lg:h-full bg-black">
                    <div className="absolute inset-0">
                      {media.type === "image" ? (
                        <LazyImage
                          src={media.src}
                          alt={media.alt || data.title}
                          className="w-full h-full"
                        />
                      ) : (
                        <LazyVideo
                          src={media.src}
                          className="w-full h-full"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      )}

                      {/* Film grain overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E")`,
                        }}
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                    </div>

                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                      <div className="glass rounded-lg border border-white/10 p-4 backdrop-blur-xl">
                        <p className="text-sm text-[rgb(var(--fg-1))]">
                          {data.type === "honor"
                            ? data.oneLiner
                            : data.type === "venture"
                            ? data.tagline
                            : data.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Watch video button (if available) */}
                    {youtubeUrlValue && (
                      <div className="absolute top-6 right-6">
                        <button
                          onClick={() => handleWatchVideo(youtubeUrlValue)}
                          className={clsx(
                            "flex items-center gap-2 px-4 py-2 rounded-lg",
                            "bg-black/60 hover:bg-black/80 backdrop-blur-sm",
                            "border border-white/20 hover:border-white/30",
                            "text-white font-medium transition-colors",
                            "focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent"
                          )}
                        >
                          <Play className="w-4 h-4" />
                          <span>Watch full video</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Right Panel - Content */}
                <div className="flex-1 overflow-y-auto bg-[rgb(var(--bg-0))]">
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="sticky top-0 z-10 glass border-b border-white/10 p-6 lg:p-8 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[rgb(var(--fg-0))] mb-2">
                          {data.type === "venture" ? data.name : data.title}
                        </h2>
                        {data.type === "venture" && (
                          <p className="text-lg text-[rgb(var(--fg-1))]">
                            {data.tagline}
                          </p>
                        )}
                        {data.type === "experience" && (
                          <div className="flex items-center gap-3 text-sm text-[rgb(var(--fg-1))] mb-2">
                            {data.year && (
                              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">
                                {data.year}
                              </span>
                            )}
                            {data.location && (
                              <span>{data.location}</span>
                            )}
                          </div>
                        )}
                      </div>
                      <button
                        ref={firstFocusableRef}
                        onClick={onClose}
                        className={clsx(
                          "p-2 rounded-md transition-colors flex-shrink-0",
                          "hover:bg-white/5 active:bg-white/10",
                          "border border-white/10 hover:border-white/20",
                          "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
                        )}
                        aria-label="Close case file"
                      >
                        <X className="w-5 h-5 text-[rgb(var(--fg-0))]" />
                      </button>
                    </div>

                    {/* Content Sections */}
                    <div className="p-6 lg:p-8 xl:p-12 space-y-12">
                      {/* Context Section */}
                      <motion.section
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.1 }}
                        className="glass rounded-lg border border-white/10 p-6 lg:p-8 backdrop-blur-xl"
                      >
                        <h3 className="text-2xl font-semibold text-[rgb(var(--fg-0))] mb-4">
                          Context
                        </h3>
                        <p className="text-base md:text-lg text-[rgb(var(--fg-1))] leading-relaxed">
                          {data.type === "honor" || data.type === "venture"
                            ? data.context
                            : data.fullDescription}
                        </p>
                      </motion.section>

                      {/* What I Did / What I Built Section */}
                      {((data.type === "honor" && data.whatIDid.length > 0) ||
                        (data.type === "venture" && data.whatIBuilt.length > 0)) && (
                        <motion.section
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="glass rounded-lg border border-white/10 p-6 lg:p-8 backdrop-blur-xl"
                        >
                          <h3 className="text-2xl font-semibold text-[rgb(var(--fg-0))] mb-4">
                            {data.type === "venture" ? "What I Built" : "What I Did"}
                          </h3>
                          <ul className="space-y-3">
                            {(data.type === "venture"
                              ? data.whatIBuilt
                              : data.whatIDid
                            ).map((item, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3 text-base md:text-lg text-[rgb(var(--fg-1))]"
                              >
                                <span className="text-[rgb(var(--accent))] mt-1 flex-shrink-0">
                                  •
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.section>
                      )}

                      {/* Impact Section */}
                      {((data.type === "honor" &&
                        data.impact &&
                        data.impact.length > 0) ||
                        (data.type === "venture" && data.impact.length > 0)) && (
                          <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="glass rounded-lg border border-white/10 p-6 lg:p-8 backdrop-blur-xl"
                          >
                            <h3 className="text-2xl font-semibold text-[rgb(var(--fg-0))] mb-4">
                              Impact
                            </h3>
                            <ul className="space-y-3">
                              {data.impact.map((item, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-3 text-base md:text-lg text-[rgb(var(--fg-1))]"
                                >
                                  <span className="text-[rgb(var(--accent))] mt-1 flex-shrink-0">
                                    •
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.section>
                        )}

                      {/* Proof/Links Section */}
                      {((data.type === "honor" && data.proofLinks.length > 0) ||
                        (data.type === "venture" && data.proofLinks.length > 0) ||
                        (data.type === "experience" &&
                          data.relatedLinks &&
                          data.relatedLinks.length > 0)) && (
                        <motion.section
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className="glass rounded-lg border border-white/10 p-6 lg:p-8 backdrop-blur-xl"
                        >
                          <h3 className="text-2xl font-semibold text-[rgb(var(--fg-0))] mb-6">
                            {data.type === "honor" || data.type === "venture"
                              ? "Proof & Links"
                              : "Related Links"}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(data.type === "honor" || data.type === "venture"
                              ? data.proofLinks
                              : data.relatedLinks || []
                            ).map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                ref={
                                  index ===
                                  ((data.type === "honor" || data.type === "venture")
                                    ? data.proofLinks.length
                                    : data.relatedLinks?.length || 0) -
                                    1
                                    ? lastFocusableRef
                                    : undefined
                                }
                                className={clsx(
                                  "flex items-center justify-between gap-3 px-6 py-4 rounded-lg",
                                  "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20",
                                  "text-[rgb(var(--fg-0))] transition-all",
                                  "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent",
                                  "group"
                                )}
                              >
                                <span className="font-medium">{link.label}</span>
                                <ExternalLink className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              </a>
                            ))}
                          </div>
                        </motion.section>
                      )}

                      {/* Tags */}
                      <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap gap-2"
                      >
                        {data.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-[rgb(var(--fg-1))]"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.section>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* YouTube Embed */}
      {youtubeUrl && (
        <YouTubeEmbed
          videoId={youtubeUrl}
          isOpen={showYouTube}
          onClose={handleCloseYouTube}
        />
      )}
    </>
  );
}
