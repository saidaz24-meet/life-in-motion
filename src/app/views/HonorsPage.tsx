import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { HONORS, type Honor } from "../../content/honors";
import HonorCard from "../../components/cards/HonorCard";
import CaseFileModal, { type CaseFileData } from "../../components/modal/CaseFileModal";
import SEOHead from "../../components/ui/SEOHead";
import { clsx } from "clsx";

export default function HonorsPage() {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState<CaseFileData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (honor: Honor) => {
    setSelectedData({
      type: "honor",
      ...honor,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing selected data for smooth exit animation
    setTimeout(() => {
      setSelectedData(null);
    }, 300);
  };

  return (
    <>
      <SEOHead title="Honors" />
      <div className="min-h-[100dvh] py-12 px-6 md:px-12 lg:px-16 pb-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12">
          {/* Back to Story chip - disabled */}
          <button
            disabled
            className={clsx(
              "inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out",
              "bg-white/5",
              "border border-white/10",
              "text-[rgb(var(--fg-1))] opacity-50",
              "cursor-not-allowed",
              "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
            )}
            aria-disabled="true"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Story</span>
          </button>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--fg-0))] mb-4">
            Honors
          </h1>
          <p className="text-lg md:text-xl text-[rgb(var(--fg-1))] max-w-2xl leading-relaxed">
            Recognition and achievements that reflect the journey and impact.
          </p>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {HONORS.map((honor, index) => (
              <HonorCard
                key={honor.id}
                honor={honor}
                onClick={() => handleCardClick(honor)}
                index={index}
              />
            ))}
          </div>
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
