"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProjectsReloadGuard() {
  const router = useRouter();

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.type === "reload") router.replace("/");
  }, [router]);

  return null;
}
