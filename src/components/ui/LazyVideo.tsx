import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";

interface LazyVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  onLoad?: () => void;
}

export default function LazyVideo({
  src,
  className,
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
  onLoad,
}: LazyVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use Intersection Observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observerRef.current?.disconnect();
          }
        });
      },
      { rootMargin: "50px" }
    );

    observerRef.current.observe(video);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleLoadedData = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div className={clsx("relative", className)}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[rgb(var(--bg-1))] animate-pulse" />
      )}
      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          onLoadedData={handleLoadedData}
          className={clsx(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}

