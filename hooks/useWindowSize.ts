import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSize([window.innerWidth, window.innerHeight]);
      const handleResize = () =>
        setSize([window.innerHeight, window.innerWidth]);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  return size;
}
