import { RefObject, useEffect, useRef, useState } from "react";

import { Dimensions } from "./types";

function useDimensions<T extends HTMLDivElement = HTMLDivElement>(): [
  RefObject<T>,
  Dimensions
] {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const elementRef = useRef<T>(null);

  const updateDimensions = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return [elementRef, dimensions];
}

export default useDimensions;
