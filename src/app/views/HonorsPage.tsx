import { useState } from "react";
import { HONORS, type Honor } from "../../content/honors";
import HonorCard from "../../components/cards/HonorCard";
import CaseFileModal, { type CaseFileData } from "../../components/modal/CaseFileModal";
import SEOHead from "../../components/ui/SEOHead";

export default function HonorsPage() {
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
      <div className="min-h-screen py-12 px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--fg-0))] mb-4">
            Honors
          </h1>
          <p className="text-lg md:text-xl text-[rgb(var(--fg-1))] max-w-2xl">
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
