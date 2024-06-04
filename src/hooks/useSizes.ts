import { useState, useEffect } from "react";
import { ScreenSizes } from "../const";

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth <= ScreenSizes.Desktop);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth <= ScreenSizes.Desktop);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isDesktop;
}

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(window.innerWidth <= ScreenSizes.Tablet);
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= ScreenSizes.Tablet);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isTablet;
}

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= ScreenSizes.Mobile);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= ScreenSizes.Mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}
