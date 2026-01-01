import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { honors } from "../../content/items/honors";
import { getItemById } from "../../content/items";
import type { ContentItem } from "../../content/types";
import CaseFileModal from "../../components/modal/CaseFileModal";
import SEOHead from "../../components/ui/SEOHead";
import LazyImage from "../../components/ui/LazyImage";
import LazyVideo from "../../components/ui/LazyVideo";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { clsx } from "clsx";

export default function HonorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Handle focus query param (from Story linked items)
  useEffect(() => {
    const focusId = searchParams.get("focus");
    if (focusId) {
      const item = getItemById(focusId);
      if (item && item.type === "honor") {
        setSelectedItem(item);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

  const handleItemClick = (item: ContentItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedItem(null);
      // Remove focus from URL
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("focus");
      setSearchParams(newParams);
    }, 300);
  };

  // Spotlight: first honor (or most recent)
  const spotlight = honors[0];
  const timeline = honors.slice(1);

  return (
    <>
      <SEOHead title="Honors" />
      <div className="min-h-[100dvh] pb-24">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-16 pt-12 pb-8">
          <div className="max-w-7xl mx-auto">
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--fg-0))] mb-4"
            >
              Honors
            </motion.h1>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-[rgb(var(--fg-1))] max-w-2xl leading-relaxed"
            >
              Recognition and achievements that reflect the journey and impact.
            </motion.p>
          </div>
        </div>

        {/* Spotlight */}
        {spotlight && (
          <div className="px-6 md:px-12 lg:px-16 mb-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? {} : { duration: 0.8 }}
                className="relative min-h-[60vh] rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => handleItemClick(spotlight)}
              >
                {/* Background Media */}
                <div className="absolute inset-0">
                  {spotlight.media.teaserVideo ? (
                    <LazyVideo
                      src={spotlight.media.teaserVideo}
                      className="w-full h-full"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : spotlight.media.heroImage ? (
                    <LazyImage
                      src={spotlight.media.heroImage}
                      alt={spotlight.title}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[rgb(var(--bg-1))] to-[rgb(var(--bg-2))]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full min-h-[60vh] flex flex-col justify-end p-8 md:p-12 lg:p-16">
                  <div className="max-w-3xl">
                    <motion.h2
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      transition={prefersReducedMotion ? {} : { duration: 0.8, delay: 0.2 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--fg-0))] mb-4"
                    >
                      {spotlight.card.headline}
                    </motion.h2>
                    {spotlight.card.subhead && (
                      <motion.p
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? {} : { duration: 0.8, delay: 0.3 }}
                        className="text-xl md:text-2xl text-[rgb(var(--fg-1))] mb-6"
                      >
                        {spotlight.card.subhead}
                      </motion.p>
                    )}
                    <motion.button
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      transition={prefersReducedMotion ? {} : { duration: 0.8, delay: 0.4 }}
                      className={clsx(
                        "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
                        "bg-[rgb(var(--accent))]/20 hover:bg-[rgb(var(--accent))]/30",
                        "border border-[rgb(var(--accent))]/40 hover:border-[rgb(var(--accent))]/60",
                        "text-lg font-semibold text-[rgb(var(--fg-0))]",
                        "transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/40 focus:ring-offset-2 focus:ring-offset-transparent"
                      )}
                    >
                      View Case File
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Vertical Timeline */}
        {timeline.length > 0 && (
          <div className="px-6 md:px-12 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10" />

                {/* Timeline items */}
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: -40 }}
                      animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                      transition={prefersReducedMotion ? {} : { duration: 0.6, delay: index * 0.1 }}
                      className="relative pl-24 cursor-pointer group"
                      onClick={() => handleItemClick(item)}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-[rgb(var(--accent))] border-4 border-[rgb(var(--bg-0))] group-hover:scale-125 transition-transform" />

                      {/* Content card */}
                      <div className={clsx(
                        "glass rounded-lg border border-white/10 p-6 backdrop-blur-xl",
                        "transition-all duration-200",
                        "group-hover:border-white/20 group-hover:shadow-lg"
                      )}>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-[rgb(var(--fg-0))] mb-2 group-hover:text-[rgb(var(--accent))] transition-colors">
                              {item.card.headline}
                            </h3>
                            {item.card.subhead && (
                              <p className="text-lg text-[rgb(var(--fg-1))]">
                                {item.card.subhead}
                              </p>
                            )}
                          </div>
                          <span className="text-sm text-[rgb(var(--fg-1))] whitespace-nowrap">
                            {item.date}
                          </span>
                        </div>

                        {/* One liner */}
                        <p className="text-base text-[rgb(var(--fg-1))] mb-4">
                          {item.card.oneLiner}
                        </p>

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-[rgb(var(--fg-1))]"
                              >
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 3 && (
                              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-[rgb(var(--fg-1))]">
                                +{item.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Case File Modal */}
        <CaseFileModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </>
  );
}
