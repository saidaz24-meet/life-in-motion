import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { experiences } from "../../content/items/experiences";
import { TAGS } from "../../content/meta";
import type { Tag, ContentItem } from "../../content/types";
import CaseFileModal from "../../components/modal/CaseFileModal";
import { clsx } from "clsx";
import LazyImage from "../../components/ui/LazyImage";
import LazyVideo from "../../components/ui/LazyVideo";
import SEOHead from "../../components/ui/SEOHead";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function AtlasPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<Tag>>(new Set());
  const prefersReducedMotion = useReducedMotion();

  // Handle URL params for focus
  useEffect(() => {
    const focus = searchParams.get("focus");
    if (focus) {
      const experience = experiences.find((e) => e.id === focus);
      if (experience && !isModalOpen) {
        setSelectedItem(experience);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, isModalOpen]);

  // Filter experiences based on search and tags
  const filteredExperiences = useMemo(() => {
    return experiences.filter((experience) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        experience.card.oneLiner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        experience.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Tag filter
      const matchesTags =
        selectedTags.size === 0 ||
        experience.tags.some((tag) => selectedTags.has(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const handleTagToggle = (tag: Tag) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTags(new Set());
    setSearchParams({});
  };

  const handleExperienceClick = (experience: ContentItem) => {
    setSelectedItem(experience);
    setIsModalOpen(true);
    setSearchParams({ focus: experience.id });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedItem(null);
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("focus");
      setSearchParams(newParams);
    }, 300);
  };

  const hasActiveFilters = searchQuery !== "" || selectedTags.size > 0;

  return (
    <>
      <SEOHead title="Life Atlas" />
      <div className="min-h-[100dvh] py-12 px-6 md:px-12 lg:px-16 pb-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12">
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? {} : { duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--fg-0))] mb-4"
          >
            Life Atlas
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-[rgb(var(--fg-1))] max-w-2xl leading-relaxed"
          >
            An interactive map of experiences, moments, and connections that shape the journey.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto mb-8 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--fg-1))]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiences..."
              className={clsx(
                "w-full pl-12 pr-4 py-3 rounded-lg",
                "glass border border-white/10",
                "bg-[rgb(var(--bg-0))]/50 backdrop-blur-xl",
                "text-[rgb(var(--fg-0))] placeholder:text-[rgb(var(--fg-1))]",
                "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent",
                "transition-all"
              )}
            />
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-[rgb(var(--fg-1))] font-medium">Filter by:</span>
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  "border",
                  selectedTags.has(tag)
                    ? "bg-[rgb(var(--accent))]/20 border-[rgb(var(--accent))]/40 text-[rgb(var(--fg-0))]"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-[rgb(var(--fg-1))]",
                  "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
                )}
              >
                {tag}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                  "bg-white/5 hover:bg-white/10 border border-white/10",
                  "text-[rgb(var(--fg-1))] transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
                )}
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
          </div>

          {/* Results count */}
          {hasActiveFilters && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-[rgb(var(--fg-1))]"
            >
              Showing {filteredExperiences.length} of {experiences.length} experiences
            </motion.p>
          )}
        </div>

        {/* Desktop: Constellation | Mobile: List */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredExperiences.length > 0 ? (
              <>
                {/* Desktop Constellation View */}
                <div className="hidden lg:block min-h-[80vh]">
                  <ConstellationView
                    experiences={filteredExperiences}
                    onItemClick={handleExperienceClick}
                    highlightedId={searchParams.get("focus") || undefined}
                  />
                </div>

                {/* Mobile List View */}
                <div className="lg:hidden">
                  <div className="space-y-4">
                    {filteredExperiences.map((experience, index) => (
                      <ExperienceListItem
                        key={experience.id}
                        experience={experience}
                        index={index}
                        onClick={() => handleExperienceClick(experience)}
                        isHighlighted={searchParams.get("focus") === experience.id}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <p className="text-lg text-[rgb(var(--fg-1))]">
                  No experiences found. Try adjusting your filters.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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

interface ConstellationViewProps {
  experiences: ContentItem[];
  onItemClick: (item: ContentItem) => void;
  highlightedId?: string;
}

function ConstellationView({
  experiences,
  onItemClick,
  highlightedId,
}: ConstellationViewProps) {
  // Simple constellation layout: distribute items in a circular/radial pattern
  const radius = 300;
  const centerX = 50; // percentage
  const centerY = 50; // percentage

  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2; // Start from top
    const x = centerX + (radius * Math.cos(angle)) / 10;
    const y = centerY + (radius * Math.sin(angle)) / 10;
    return { x, y };
  };

  return (
    <div className="relative w-full h-full min-h-[80vh]">
      {experiences.map((experience, index) => {
        const position = getPosition(index, experiences.length);
        const isHighlighted = highlightedId === experience.id;

        return (
          <motion.button
            key={experience.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onItemClick(experience)}
            className={clsx(
              "absolute group cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/40 rounded-lg"
            )}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={clsx(
                "glass rounded-lg border p-4 backdrop-blur-xl transition-all",
                isHighlighted
                  ? "border-[rgb(var(--accent))]/60 ring-2 ring-[rgb(var(--accent))]/40"
                  : "border-white/10 hover:border-white/20"
              )}
            >
              {experience.media.heroImage && (
                <div className="relative w-24 h-24 mb-2 rounded overflow-hidden">
                  <LazyImage
                    src={experience.media.heroImage}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
                </div>
              )}
              <h3 className="text-sm font-semibold text-[rgb(var(--fg-0))] group-hover:text-[rgb(var(--accent))] transition-colors text-center max-w-[100px] truncate">
                {experience.title}
              </h3>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

interface ExperienceListItemProps {
  experience: ContentItem;
  index: number;
  onClick: () => void;
  isHighlighted: boolean;
}

function ExperienceListItem({
  experience,
  index,
  onClick,
  isHighlighted,
}: ExperienceListItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? {} : { duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={clsx(
        "group relative w-full rounded-lg overflow-hidden",
        "glass border transition-all",
        isHighlighted
          ? "border-[rgb(var(--accent))]/60 ring-2 ring-[rgb(var(--accent))]/40"
          : "border-white/10 hover:border-white/20",
        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
      )}
    >
      <div className="flex gap-4 p-4">
        {/* Thumbnail */}
        {experience.media.heroImage && (
          <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
            {experience.media.teaserVideo ? (
              <LazyVideo
                src={experience.media.teaserVideo}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <LazyImage
                src={experience.media.heroImage}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 text-left min-w-0">
          <h3 className="text-lg font-semibold text-[rgb(var(--fg-0))] mb-1 group-hover:text-[rgb(var(--accent))] transition-colors">
            {experience.card.headline}
          </h3>
          {experience.card.subhead && (
            <p className="text-sm text-[rgb(var(--fg-1))] mb-2">
              {experience.card.subhead}
            </p>
          )}
          <p className="text-sm text-[rgb(var(--fg-1))] line-clamp-2">
            {experience.card.oneLiner}
          </p>
          {experience.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {experience.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-[rgb(var(--fg-1))]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
