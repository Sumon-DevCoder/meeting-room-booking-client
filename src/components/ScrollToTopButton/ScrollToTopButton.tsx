import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300); // Adjust as needed
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;
