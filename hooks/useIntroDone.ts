"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "entropy_intro_done";

// null = not yet hydrated (SSR / first paint), true/false after mount.
export function useIntroDone(): {
  done: boolean | null;
  markDone: () => void;
} {
  const [done, setDone] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setDone(sessionStorage.getItem(KEY) === "1");
    } catch {
      setDone(false);
    }
  }, []);

  const markDone = useCallback(() => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      // sessionStorage may be blocked (privacy mode, iframes) — accept it.
    }
    setDone(true);
  }, []);

  return { done, markDone };
}
