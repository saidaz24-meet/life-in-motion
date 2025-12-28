import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Calendar } from "lucide-react";
import { EXPERIENCES, type Experience } from "../../content/experiences";
import { TAGS, type Tag } from "../../content/meta";
import CaseFileModal, { type CaseFileData } from "../../components/modal/CaseFileModal";
import { ExperienceIcon } from "../../components/ui/iconMap";
import { clsx } from "clsx";
import LazyImage from "../../components/ui/LazyImage";
import LazyVideo from "../../components/ui/LazyVideo";
import SEOHead from "../../components/ui/SEOHead";

// Map quick jump filters to experience IDs
const QUICK_JUMP_MAP: Record<string, string> = {
  meet: "meet",
  "germany-internship": "germany-internship",
  "technion-job": "technion-job",
  tutoring: "tutoring",
  dabka: "dabka",
  empowered: "empowered",
  running: "running",
  books: "books", // This might not exist in experiences, but we'll handle it
};

export default function AtlasPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedData, setSelectedData] = useState<CaseFileData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<Tag>>(new Set());

  // Handle URL params for focus and filter
  useEffect(() => {
    const focus = searchParams.get("focus");
    const filter = searchParams.get("filter");

    if (focus) {
      // Find and open the focused experience
      const experience = EXPERIENCES.find((e) => e.id === focus);
      if (experience && !isModalOpen) {
        setSelectedData({
          type: "experience",
          ...experience,
        });
        setIsModalOpen(true);
      }
    } else if (filter) {
      // Map quick jump filter to experience ID
      const experienceId = QUICK_JUMP_MAP[filter.toLowerCase()];
      if (experienceId) {
        const experience = EXPERIENCES.find((e) => e.id === experienceId);
        if (experience) {
          // Highlight by selecting its tags
          setSelectedTags(new Set(experience.tags));
          // Auto-open when coming from quick jump
          if (!isModalOpen) {
            setSelectedData({
              type: "experience",
              ...experience,
            });
            setIsModalOpen(true);
          }
          // Update URL to use focus instead of filter (only if not already focused)
          if (focus !== experienceId) {
            setSearchParams({ focus: experienceId });
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Filter experiences based on search and tags
  const filteredExperiences = useMemo(() => {
    return EXPERIENCES.filter((experience) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        experience.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const handleExperienceClick = (experience: Experience) => {
    setSelectedData({
      type: "experience",
      ...experience,
    });
    setIsModalOpen(true);
    // Update URL without navigation
    setSearchParams({ focus: experience.id });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedData(null);
      // Remove focus from URL
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("focus");
      setSearchParams(newParams);
    }, 300);
  };

  const hasActiveFilters = searchQuery !== "" || selectedTags.size > 0;

  return (
    <>
      <SEOHead title="Life Atlas" />
      <div className="min-h-screen py-12 px-6 md:px-12 lg:px-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--fg-0))] mb-4"
        >
          Life Atlas
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-[rgb(var(--fg-1))] max-w-2xl"
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
            Showing {filteredExperiences.length} of {EXPERIENCES.length} experiences
          </motion.p>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {filteredExperiences.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredExperiences.map((experience, index) => (
                <ExperienceTile
                  key={experience.id}
                  experience={experience}
                  index={index}
                  onClick={() => handleExperienceClick(experience)}
                  isHighlighted={searchParams.get("focus") === experience.id}
                />
              ))}
            </motion.div>
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
        data={selectedData}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
    </>
  );
}

interface ExperienceTileProps {
  experience: Experience;
  index: number;
  onClick: () => void;
  isHighlighted: boolean;
}

function ExperienceTile({
  experience,
  index,
  onClick,
  isHighlighted,
}: ExperienceTileProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={clsx(
        "group relative w-full aspect-square rounded-lg overflow-hidden",
        "glass border transition-all",
        isHighlighted
          ? "border-[rgb(var(--accent))]/60 ring-2 ring-[rgb(var(--accent))]/40"
          : "border-white/10 hover:border-white/20",
        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
      )}
    >
      {/* Background media (if available) */}
      {experience.media && (
        <div className="absolute inset-0">
          {experience.media.type === "image" ? (
            <LazyImage
              src={experience.media.src}
              alt={experience.media.alt || experience.title}
              className="w-full h-full opacity-20 group-hover:opacity-30 transition-opacity"
            />
          ) : (
            <LazyVideo
              src={experience.media.src}
              className="w-full h-full opacity-20 group-hover:opacity-30 transition-opacity"
              autoPlay
              loop
              muted
              playsInline
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        {/* Top: Icon and year */}
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm">
            <ExperienceIcon experience={experience} />
          </div>
          {experience.year && (
            <div className="flex items-center gap-1 text-xs text-[rgb(var(--fg-1))]">
              <Calendar className="w-3 h-3" />
              <span>{experience.year}</span>
            </div>
          )}
        </div>

        {/* Bottom: Title and description */}
        <div className="mt-auto">
          <h3 className="text-xl font-semibold text-[rgb(var(--fg-0))] mb-2 group-hover:text-[rgb(var(--accent))] transition-colors">
            {experience.title}
          </h3>
          <p className="text-sm text-[rgb(var(--fg-1))] line-clamp-2 leading-relaxed">
            {experience.shortDescription}
          </p>

          {/* Tags */}
          {experience.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {experience.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-[rgb(var(--fg-1))]"
                >
                  {tag}
                </span>
              ))}
              {experience.tags.length > 2 && (
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-[rgb(var(--fg-1))]">
                  +{experience.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Highlight glow effect */}
      {isHighlighted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-lg ring-2 ring-[rgb(var(--accent))]/60 pointer-events-none"
          style={{
            boxShadow: "0 0 20px rgba(120, 220, 255, 0.3)",
          }}
        />
      )}
    </motion.button>
  );
}
