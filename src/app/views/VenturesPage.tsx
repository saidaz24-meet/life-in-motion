import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { ventures } from "../../content/items/ventures";
import { getItemById } from "../../content/items";
import type { ContentItem } from "../../content/types";
import CaseFileModal from "../../components/modal/CaseFileModal";
import { clsx } from "clsx";
import LazyImage from "../../components/ui/LazyImage";
import LazyVideo from "../../components/ui/LazyVideo";
import ProofLinksStrip from "../../components/ui/ProofLinksStrip";
import SEOHead from "../../components/ui/SEOHead";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function VenturesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle focus query param (from Story linked items)
  useEffect(() => {
    const focusId = searchParams.get("focus");
    if (focusId) {
      const item = getItemById(focusId);
      if (item && item.type === "venture") {
        setSelectedItem(item);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

  const handleOpenCaseFile = (item: ContentItem) => {
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

  // Separate flagship (RoofMate, PVL) from others
  const flagshipIds = ["roofmate", "pvl-internship"];
  const flagship = useMemo(() => 
    ventures.filter(v => flagshipIds.includes(v.id)),
    []
  );
  const others = useMemo(() => 
    ventures.filter(v => !flagshipIds.includes(v.id)),
    []
  );

  return (
    <>
      <SEOHead title="Ventures" />
      <div className="min-h-[100dvh] pb-24">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-16 pt-12 pb-8">
          <div className="max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--fg-0))] mb-4"
            >
              Ventures
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-[rgb(var(--fg-1))] max-w-2xl leading-relaxed"
            >
              Building solutions that create value, connect communities, and drive impact.
            </motion.p>
          </div>
        </div>

        {/* Flagship Sections */}
        <div className="space-y-24 md:space-y-32">
          {flagship.map((venture, index) => (
            <VentureSection
              key={venture.id}
              venture={venture}
              index={index}
              onOpenCaseFile={handleOpenCaseFile}
              isFlagship={true}
            />
          ))}
        </div>

        {/* Other Ventures */}
        {others.length > 0 && (
          <div className="px-6 md:px-12 lg:px-16 mt-24">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--fg-0))] mb-8">
                Other Ventures
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {others.map((venture, index) => (
                  <SmallVentureCard
                    key={venture.id}
                    venture={venture}
                    index={index}
                    onOpenCaseFile={handleOpenCaseFile}
                  />
                ))}
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

interface VentureSectionProps {
  venture: ContentItem;
  index: number;
  onOpenCaseFile: (venture: ContentItem) => void;
  isFlagship: boolean;
}

function VentureSection({
  venture,
  index,
  onOpenCaseFile,
  isFlagship: _isFlagship,
}: VentureSectionProps) {
  const isEven = index % 2 === 0;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={prefersReducedMotion ? {} : { duration: 0.8, delay: index * 0.2 }}
      className="relative"
    >
      {/* Hero Area */}
      <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Media */}
        <div className="absolute inset-0">
          {venture.media.teaserVideo ? (
            <motion.div
              className="w-full h-full"
              initial={prefersReducedMotion ? false : { scale: 1.1 }}
              whileInView={prefersReducedMotion ? {} : { scale: 1 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? {} : { duration: 1.5, ease: "easeOut" }}
            >
              <LazyVideo
                src={venture.media.teaserVideo}
                className="w-full h-full"
                autoPlay
                loop
                muted
                playsInline
              />
            </motion.div>
          ) : venture.media.heroImage ? (
            <motion.div
              className="w-full h-full"
              initial={prefersReducedMotion ? false : { scale: 1.1 }}
              whileInView={prefersReducedMotion ? {} : { scale: 1 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? {} : { duration: 1.5, ease: "easeOut" }}
            >
              <LazyImage
                src={venture.media.heroImage}
                alt={venture.title}
                className="w-full h-full"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[rgb(var(--bg-1))] to-[rgb(var(--bg-2))]" />
          )}

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass rounded-lg border border-white/10 p-8 md:p-12 lg:p-16 backdrop-blur-xl"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--fg-0))] mb-4">
                {venture.card.headline}
              </h2>
              {venture.card.subhead && (
                <p className="text-xl md:text-2xl text-[rgb(var(--fg-1))] mb-8">
                  {venture.card.subhead}
                </p>
              )}

              {/* Case File Button */}
              <button
                onClick={() => onOpenCaseFile(venture)}
                className={clsx(
                  "group flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 ease-out",
                  "bg-[rgb(var(--accent))]/20 hover:bg-[rgb(var(--accent))]/30 active:bg-[rgb(var(--accent))]/25",
                  "border border-[rgb(var(--accent))]/40 hover:border-[rgb(var(--accent))]/60",
                  "text-lg font-semibold text-[rgb(var(--fg-0))]",
                  "hover:-translate-y-0.5 active:translate-y-0",
                  "hover:shadow-[0_4px_16px_rgba(120,220,255,0.3)]",
                  "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/40 focus:ring-offset-2 focus:ring-offset-transparent"
                )}
              >
                <FileText className="w-5 h-5" />
                <span>View Case File</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column */}
          <div className="space-y-12">
            {/* Context */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass rounded-lg border border-white/10 p-6 md:p-8 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-semibold text-[rgb(var(--fg-0))] mb-4">
                Context
              </h3>
              <p className="text-base md:text-lg text-[rgb(var(--fg-1))] leading-relaxed max-w-prose">
                {venture.caseFile.context}
              </p>
            </motion.div>

            {/* What I Did */}
            {venture.caseFile.whatIDid.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass rounded-lg border border-white/10 p-6 md:p-8 backdrop-blur-xl"
              >
                <h3 className="text-2xl font-semibold text-[rgb(var(--fg-0))] mb-4">
                  What I Did
                </h3>
                <ul className="space-y-3">
                  {venture.caseFile.whatIDid.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-3 text-base md:text-lg text-[rgb(var(--fg-1))]"
                    >
                      <span className="text-[rgb(var(--accent))] mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Impact */}
            {venture.caseFile.impact.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass rounded-lg border border-white/10 p-6 md:p-8 backdrop-blur-xl"
              >
                <h3 className="text-2xl font-semibold text-[rgb(var(--fg-0))] mb-4">
                  Impact
                </h3>
                <ul className="space-y-3">
                  {venture.caseFile.impact.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-3 text-base md:text-lg text-[rgb(var(--fg-1))]"
                    >
                      <span className="text-[rgb(var(--accent))] mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Evidence */}
            {venture.caseFile.evidence.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass rounded-lg border border-white/10 p-6 md:p-8 backdrop-blur-xl"
              >
                <ProofLinksStrip links={venture.caseFile.evidence} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Tags */}
        {venture.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-2"
          >
            {venture.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-[rgb(var(--fg-1))]"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

interface SmallVentureCardProps {
  venture: ContentItem;
  index: number;
  onOpenCaseFile: (venture: ContentItem) => void;
}

function SmallVentureCard({
  venture,
  index,
  onOpenCaseFile,
}: SmallVentureCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? {} : { duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-lg border border-white/10 p-6 backdrop-blur-xl cursor-pointer group hover:border-white/20 transition-all"
      onClick={() => onOpenCaseFile(venture)}
    >
      {venture.media.heroImage && (
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
          <LazyImage
            src={venture.media.heroImage}
            alt={venture.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
        </div>
      )}
      <h3 className="text-2xl font-bold text-[rgb(var(--fg-0))] mb-2 group-hover:text-[rgb(var(--accent))] transition-colors">
        {venture.card.headline}
      </h3>
      {venture.card.subhead && (
        <p className="text-lg text-[rgb(var(--fg-1))] mb-4">
          {venture.card.subhead}
        </p>
      )}
      <p className="text-base text-[rgb(var(--fg-1))] mb-4">
        {venture.card.oneLiner}
      </p>
      <button
        className={clsx(
          "text-sm font-medium text-[rgb(var(--accent))]",
          "hover:underline focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/40 rounded"
        )}
      >
        View Case File →
      </button>
    </motion.div>
  );
}
