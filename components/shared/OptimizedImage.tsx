"use client";

import { useState } from "react";
import ExportedImage from "next-image-export-optimizer";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ComponentProps<typeof ExportedImage> {
  wrapperClassName?: string;
}

export function OptimizedImage({
  className,
  wrapperClassName,
  onLoad,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isFill = !!props.fill;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-neutral-200/50 dark:bg-neutral-800/50",
        isFill && "w-full h-full",
        wrapperClassName
      )}
    >
      {/* Shimmer Skeleton Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-300/40 dark:bg-neutral-700/40 animate-pulse z-10" />
      )}
      <ExportedImage
        {...props}
        onLoad={(e) => {
          setIsLoaded(true);
          if (onLoad) onLoad(e);
        }}
        className={cn(
          "transition-all duration-700 ease-out",
          isLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-[1.02]",
          className
        )}
      />
    </div>
  );
}
