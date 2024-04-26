import { useEffect, useRef } from "react";

function useInterval(callback: () => void, delay: number | null) {
  const intervalRef = useRef<number | null>(null);
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(tick, delay);
      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
      };
    }

    return undefined;
  }, [delay]);

  return intervalRef;
}

export default useInterval;
