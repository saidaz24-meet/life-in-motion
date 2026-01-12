import { useState, useEffect, useRef, forwardRef } from "react";
import { clsx } from "clsx";

interface LazyVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  onLoad?: () => void;
  onEnded?: () => void;
  preload?: "none" | "metadata" | "auto";
}

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(({
  src,
  className,
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
  controls = false,
  onLoad,
  onEnded,
  preload = "auto",
}, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Use forwarded ref or internal ref
  const videoRef = (ref as React.MutableRefObject<HTMLVideoElement | null>) || internalVideoRef;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // For autoplay videos, load immediately
    if (autoPlay) {
      setShouldLoad(true);
      return;
    }

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
  }, [autoPlay]);

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
          controls={controls}
          preload={preload}
          onLoadedData={handleLoadedData}
          onEnded={onEnded}
          className={clsx(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
});

LazyVideo.displayName = "LazyVideo";

export default LazyVideo;

