import { useState, useEffect } from "react";
import { FaCircleArrowUp } from "react-icons/fa6";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (scrollTop / docHeight) * 100;

      setIsVisible(scrollTop > 300);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 right-4 w-12 h-12 bg-blue-500 text-white z-10 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all"
        aria-label="Scroll to top"
        style={{
          background: `conic-gradient(#3b82f6 ${scrollProgress}%, #e5e7eb ${scrollProgress}%)`,
        }}
      >
        <FaCircleArrowUp className="text-blue-900 animate-bounce text-2xl mt-2" />
      </button>
    )
  );
};

export default ScrollToTopButton;
