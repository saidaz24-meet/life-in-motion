import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, X, BookOpen } from "lucide-react";
import { BOOKS, type Book } from "../../content/books";
import { clsx } from "clsx";
import SEOHead from "../../components/ui/SEOHead";

export default function BooksPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [shuffledBooks, setShuffledBooks] = useState<Book[]>(BOOKS);

  // Shuffle books for "surprise me" feature
  const handleShuffle = () => {
    // Animate shuffle with a brief fade
    setIsDetailOpen(false);
    setTimeout(() => {
      const shuffled = [...BOOKS].sort(() => Math.random() - 0.5);
      setShuffledBooks(shuffled);
    }, 200);
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setTimeout(() => {
      setSelectedBook(null);
    }, 300);
  };

  // Generate book spine colors (subtle variations)
  const getBookSpineColor = (index: number) => {
    const hues = [
      "hsl(200, 40%, 25%)", // Blue
      "hsl(280, 30%, 25%)", // Purple
      "hsl(340, 35%, 25%)", // Pink
      "hsl(40, 45%, 25%)",  // Gold
      "hsl(160, 35%, 25%)", // Teal
      "hsl(20, 40%, 25%)",  // Orange
      "hsl(120, 30%, 25%)", // Green
      "hsl(0, 35%, 25%)",   // Red
    ];
    return hues[index % hues.length];
  };

  return (
    <>
      <SEOHead title="Books" />
      <div className="min-h-screen py-12 px-6 md:px-12 lg:px-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--fg-0))] mb-4"
            >
              Bookshelf
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-[rgb(var(--fg-1))] max-w-2xl"
            >
              A curated collection of books that have shaped my thinking and journey.
            </motion.p>
          </div>

          {/* Surprise me button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onClick={handleShuffle}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
              "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20",
              "text-sm font-medium text-[rgb(var(--fg-0))]",
              "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent",
              "group"
            )}
          >
            <Shuffle className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>Surprise me</span>
          </motion.button>
        </div>
      </div>

      {/* Bookshelf */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="popLayout">
          <div className="space-y-3 md:space-y-4">
            {shuffledBooks.map((book, index) => (
              <BookSpine
                key={book.id}
                book={book}
                index={index}
                spineColor={getBookSpineColor(index)}
                onClick={() => handleBookClick(book)}
                isSelected={selectedBook?.id === book.id}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {isDetailOpen && selectedBook && (
          <BookDetailPanel
            book={selectedBook}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
      </div>
    </>
  );
}

interface BookSpineProps {
  book: Book;
  index: number;
  spineColor: string;
  onClick: () => void;
  isSelected: boolean;
}

function BookSpine({
  book,
  index,
  spineColor,
  onClick,
  isSelected,
}: BookSpineProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ x: 8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={clsx(
        "group relative w-full h-20 md:h-24 rounded-lg overflow-hidden",
        "flex items-center gap-4 px-6 md:px-8",
        "glass border transition-all",
        isSelected
          ? "border-[rgb(var(--accent))]/60 ring-2 ring-[rgb(var(--accent))]/40"
          : "border-white/10 hover:border-white/20",
        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
      )}
    >
      {/* Spine color accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2"
        style={{ backgroundColor: spineColor }}
      />

      {/* Book icon */}
      <div className="relative z-10 flex-shrink-0">
        <div className="p-2 rounded bg-white/5 border border-white/10">
          <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[rgb(var(--fg-0))]" />
        </div>
      </div>

      {/* Book info */}
      <div className="relative z-10 flex-1 text-left min-w-0">
        <h3 className="text-lg md:text-xl font-semibold text-[rgb(var(--fg-0))] mb-1 group-hover:text-[rgb(var(--accent))] transition-colors truncate">
          {book.title}
        </h3>
        <p className="text-sm md:text-base text-[rgb(var(--fg-1))] truncate">
          {book.author}
        </p>
      </div>

      {/* Tags preview */}
      <div className="relative z-10 flex-shrink-0 hidden md:flex items-center gap-2">
        {book.relatedTags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[rgb(var(--fg-1))]"
          >
            {tag}
          </span>
        ))}
        {book.relatedTags.length > 2 && (
          <span className="text-xs text-[rgb(var(--fg-1))]">
            +{book.relatedTags.length - 2}
          </span>
        )}
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--accent))]/0 via-[rgb(var(--accent))]/5 to-[rgb(var(--accent))]/0"
        initial={{ opacity: 0, x: "-100%" }}
        whileHover={{ opacity: 1, x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.button>
  );
}

interface BookDetailPanelProps {
  book: Book;
  onClose: () => void;
}

function BookDetailPanel({ book, onClose }: BookDetailPanelProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Detail Panel */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-4 md:inset-8 lg:inset-16 z-[151] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass rounded-lg border border-white/10 backdrop-blur-xl min-h-full p-8 md:p-12 lg:p-16">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[rgb(var(--fg-0))] mb-2"
              >
                {book.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-[rgb(var(--fg-1))]"
              >
                {book.author}
              </motion.p>
            </div>
            <button
              onClick={onClose}
              className={clsx(
                "p-2 rounded-md transition-colors flex-shrink-0",
                "hover:bg-white/5 active:bg-white/10",
                "border border-white/10 hover:border-white/20",
                "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
              )}
              aria-label="Close"
            >
              <X className="w-5 h-5 text-[rgb(var(--fg-0))]" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-8 max-w-4xl">
            {/* Why I Loved It */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-lg border border-white/10 p-6 md:p-8 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-semibold text-[rgb(var(--fg-0))] mb-4 flex items-center gap-2">
                <span className="text-[rgb(var(--accent))]">♥</span>
                Why I Loved It
              </h3>
              <p className="text-base md:text-lg text-[rgb(var(--fg-1))] leading-relaxed">
                {book.whyILovedIt}
              </p>
            </motion.section>

            {/* Takeaway */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass rounded-lg border border-white/10 p-6 md:p-8 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-semibold text-[rgb(var(--fg-0))] mb-4 flex items-center gap-2">
                <span className="text-[rgb(var(--accent))]">💡</span>
                Takeaway
              </h3>
              <p className="text-base md:text-lg text-[rgb(var(--fg-1))] leading-relaxed italic">
                {book.takeaway}
              </p>
            </motion.section>

            {/* Related Tags */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {book.relatedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[rgb(var(--fg-1))]"
                >
                  {tag}
                </span>
              ))}
            </motion.section>
          </div>
        </div>
      </motion.div>
    </>
  );
}
