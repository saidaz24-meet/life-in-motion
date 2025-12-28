import { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

export default function LazyImage({
  src,
  alt,
  className,
  onLoad,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={clsx("relative", className)}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[rgb(var(--bg-1))] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={clsx(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}

