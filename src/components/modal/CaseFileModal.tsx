import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { clsx } from "clsx";
import type { ContentItem } from "../../content/types";
import LazyImage from "../ui/LazyImage";
import LazyVideo from "../ui/LazyVideo";
import ProofLinksStrip from "../ui/ProofLinksStrip";
import YouTubeEmbed from "../media/YouTubeEmbed";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface CaseFileModalProps {
  item: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CaseFileModal({
  item,
  isOpen,
  onClose,
}: CaseFileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const [showYouTube, setShowYouTube] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState<string | null>(null);
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showYouTube) {
          setShowYouTube(false);
          setYoutubeUrl(null);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, showYouTube]);

  // Prevent body scroll when open and clean up on unmount
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = "";
      setShowYouTube(false);
      setYoutubeUrl(null);
      setIsDeepDiveOpen(false);
    }
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

  // Manage robots meta tag for unlisted items
  useEffect(() => {
    if (!isOpen || !item) return;

    const isUnlisted = item.privacy === "unlisted";
    let robotsMeta: HTMLMetaElement | null = document.querySelector('meta[name="robots"]');
    
    if (isUnlisted) {
      if (!robotsMeta) {
        robotsMeta = document.createElement("meta");
        robotsMeta.name = "robots";
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.content = "noindex,nofollow";
    }

    return () => {
      // Clean up: remove noindex when modal closes (or keep it if site-wide noindex is preferred)
      // For now, we'll remove it on close to allow normal indexing when modal is closed
      if (isUnlisted && robotsMeta) {
        robotsMeta.remove();
      }
    };
  }, [isOpen, item]);

  if (!item) return null;

  const { media, card, beats, caseFile, privacy } = item;
  
  // Privacy rules
  const isProofOnly = privacy === "proof-only";
  const allowVideos = !isProofOnly;
  
  // Safe field checks with fallbacks
  // Priority: heroVideo > heroImage > teaserVideo (as fallback)
  const hasHeroVideo = allowVideos && media?.heroVideo && media.heroVideo.trim() !== "";
  const hasHeroImage = media?.heroImage && media.heroImage.trim() !== "";
  const hasTeaserVideo = allowVideos && media?.teaserVideo && media.teaserVideo.trim() !== "";
  const hasGallery = media?.gallery && Array.isArray(media.gallery) && media.gallery.length > 0;
  const hasYouTube = allowVideos && media?.youtubeUrl && media.youtubeUrl.trim() !== "";
  const hasDeepDive = caseFile?.deepDive && caseFile.deepDive.trim() !== "";
  
  // Safe access with fallbacks
  const safeBeats = beats && Array.isArray(beats) ? beats : [];
  const safeWhatIDid = caseFile?.whatIDid && Array.isArray(caseFile.whatIDid) ? caseFile.whatIDid : [];
  const safeImpact = caseFile?.impact && Array.isArray(caseFile.impact) ? caseFile.impact : [];
  const safeEvidence = caseFile?.evidence && Array.isArray(caseFile.evidence) ? caseFile.evidence : [];
  const safeTags = item.tags && Array.isArray(item.tags) ? item.tags : [];
  const safeContext = caseFile?.context || "";
  const safeDeepDive = caseFile?.deepDive || "";
  const safeHeadline = card?.headline || item.title || "Untitled";
  const safeSubhead = card?.subhead || "";

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
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
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
              transition={prefersReducedMotion ? {} : { duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 z-[101] overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label={`Case file: ${item.title}`}
            >
              <div className="h-full flex flex-col lg:flex-row">
                {/* Left Panel - Media */}
                <div className="relative w-full lg:w-1/2 h-64 lg:h-full bg-black flex flex-col">
                  {/* Hero Media */}
                  <div className="relative flex-1 min-h-0">
                    {hasHeroVideo ? (
                      <LazyVideo
                        src={media.heroVideo!}
                        className="w-full h-full"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : hasHeroImage ? (
                      <LazyImage
                        src={media.heroImage}
                        alt={item.title}
                        className="w-full h-full"
                      />
                    ) : hasTeaserVideo ? (
                      <LazyVideo
                        src={media.teaserVideo}
                        className="w-full h-full"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[rgb(var(--bg-1))] to-[rgb(var(--bg-2))] flex items-center justify-center">
                        <div className="text-center text-[rgb(var(--fg-1))]">
                          <p className="text-sm opacity-60">No media available</p>
                        </div>
                      </div>
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

                    {/* Watch YouTube button (if available) */}
                    {hasYouTube && (
                      <div className="absolute top-6 right-6">
                        <button
                          onClick={() => handleWatchVideo(media.youtubeUrl)}
                          className={clsx(
                            "flex items-center gap-2 px-4 py-2 rounded-lg",
                            "bg-black/60 hover:bg-black/80 backdrop-blur-sm",
                            "border border-white/20 hover:border-white/30",
                            "text-white font-medium transition-colors",
                            "focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent"
                          )}
                        >
                          <span>Watch full video</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Filmstrip Gallery */}
                  {hasGallery && (
                    <div className="relative h-32 lg:h-40 bg-black/50 border-t border-white/10 overflow-hidden">
                      <div className="absolute inset-0 overflow-x-auto overflow-y-hidden scrollbar-hide">
                        <div className="flex h-full">
                          {media.gallery.filter(path => path && path.trim() !== "").map((imagePath, index) => (
                            <div
                              key={index}
                              className="flex-shrink-0 w-32 lg:w-40 h-full relative group cursor-pointer"
                            >
                              <LazyImage
                                src={imagePath}
                                alt={`${item.title} - Gallery image ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Panel - Content */}
                <div className="flex-1 overflow-y-auto bg-[rgb(var(--bg-0))]">
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="sticky top-0 z-10 glass border-b border-white/10 p-6 lg:p-8 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[rgb(var(--fg-0))] mb-2">
                          {safeHeadline}
                        </h2>
                        {safeSubhead && (
                          <p className="text-lg text-[rgb(var(--fg-1))]">
                            {safeSubhead}
                          </p>
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
                      {/* Beats */}
                      {safeBeats.length > 0 && (
                        <motion.section
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                          transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.1 }}
                          className="space-y-3"
                        >
                          {safeBeats.map((beat, index) => (
                            <p
                              key={index}
                              className="text-lg md:text-xl text-[rgb(var(--fg-1))] leading-relaxed"
                            >
                              {beat}
                            </p>
                          ))}
                        </motion.section>
                      )}

                      {/* Context Section */}
                      <motion.section
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.2 }}
                        className="glass rounded-lg border border-white/10 p-6 lg:p-8 backdrop-blur-xl"
                      >
                        <h3 className="text-2xl font-semibold text-[rgb(var(--fg-0))] mb-4">
                          Context
                        </h3>
                        {safeContext && (
                          <p className="text-base md:text-lg text-[rgb(var(--fg-1))] leading-relaxed whitespace-pre-line">
                            {safeContext}
                          </p>
                        )}
                      </motion.section>

                      {/* What I Did Section */}
                      {safeWhatIDid.length > 0 && (
                        <motion.section
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                          transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.3 }}
                          className="glass rounded-lg border border-white/10 p-6 lg:p-8 backdrop-blur-xl"
                        >
                          <h3 className="text-2xl font-semibold text-[rgb(var(--fg-0))] mb-4">
                            What I Did
                          </h3>
                          <ul className="space-y-3">
                            {safeWhatIDid.map((item, index) => (
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
                      {safeImpact.length > 0 && (
                        <motion.section
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                          transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.4 }}
                          className="glass rounded-lg border border-white/10 p-6 lg:p-8 backdrop-blur-xl"
                        >
                          <h3 className="text-2xl font-semibold text-[rgb(var(--fg-0))] mb-4">
                            Impact
                          </h3>
                          <ul className="space-y-3">
                            {safeImpact.map((item, index) => (
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

                      {/* Evidence Section */}
                      {safeEvidence.length > 0 && (
                        <motion.section
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                          transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.5 }}
                          className="glass rounded-lg border border-white/10 p-6 lg:p-8 backdrop-blur-xl"
                        >
                          <ProofLinksStrip links={safeEvidence} label="EVIDENCE" />
                        </motion.section>
                      )}

                      {/* Deep Dive Section (Collapsible) */}
                      {hasDeepDive && (
                        <motion.section
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                          transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.6 }}
                          className="glass rounded-lg border border-white/10 backdrop-blur-xl overflow-hidden"
                        >
                          <button
                            onClick={() => setIsDeepDiveOpen(!isDeepDiveOpen)}
                            className={clsx(
                              "w-full p-6 lg:p-8 flex items-center justify-between gap-4",
                              "text-left transition-colors",
                              "hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-inset"
                            )}
                            aria-expanded={isDeepDiveOpen}
                            aria-controls="deep-dive-content"
                          >
                            <h3 className="text-2xl font-semibold text-[rgb(var(--fg-0))]">
                              Deep Dive
                            </h3>
                            {isDeepDiveOpen ? (
                              <ChevronUp className="w-5 h-5 text-[rgb(var(--fg-1))] flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-[rgb(var(--fg-1))] flex-shrink-0" />
                            )}
                          </button>
                          <AnimatePresence>
                            {isDeepDiveOpen && (
                              <motion.div
                                id="deep-dive-content"
                                initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                                animate={prefersReducedMotion ? {} : { height: "auto", opacity: 1 }}
                                exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                                transition={prefersReducedMotion ? {} : { duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                                  {safeDeepDive && (
                                    <p className="text-base md:text-lg text-[rgb(var(--fg-1))] leading-relaxed whitespace-pre-line">
                                      {safeDeepDive}
                                    </p>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.section>
                      )}

                      {/* Tags */}
                      {safeTags.length > 0 && (
                        <motion.section
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                          transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.7 }}
                          className="flex flex-wrap gap-2"
                        >
                          {safeTags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-[rgb(var(--fg-1))]"
                            >
                              {tag}
                            </span>
                          ))}
                        </motion.section>
                      )}
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
