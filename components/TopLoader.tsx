"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const TopLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Set loading to true immediately when path changes
    setIsLoading(true);

    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full"
        style={{
          width: "100%",
          backgroundColor: "var(--color-primary-200)",
          animation: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />
    </div>
  );
};

export default TopLoader;
