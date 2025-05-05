import { useEffect, useState } from "react";

export default function BlogSlideShow({ blog }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  if (!blog.images || blog.images.length === 0) {
    return null;
  }

  if (blog.images.length === 1) {
    return (
      <div className="relative h-96 w-full overflow-hidden rounded-lg">
        <img
          src={`http://localhost:5000/${blog.images[0]}`}
          alt={`${blog.title}`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const getPrevIndex = (current) => {
    return current === 0 ? blog.images.length - 1 : current - 1;
  };

  const getNextIndex = (current) => {
    return (current + 1) % blog.images.length;
  };

  const goToNext = () => {
    if (isAnimating) return;
    setDirection("next");
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex(getNextIndex(currentIndex));
      setIsAnimating(false);
    }, 600);
  };



  useEffect(() => {
    if (blog.images.length <= 1) return;

    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 4000); 

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, blog.images.length]);

  const prevIndex = getPrevIndex(currentIndex);
  const nextIndex = getNextIndex(currentIndex);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-md">
      <img
        src={`http://localhost:5000/${blog.images[currentIndex]}`}
        alt={`${blog.title} - image ${currentIndex + 1}`}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-600 ease-in-out ${
          isAnimating 
            ? direction === "next" 
              ? "transform -translate-x-full" 
              : "transform translate-x-full"
            : "transform translate-x-0"
        }`}
      />

      <img
        src={`http://localhost:5000/${blog.images[direction === "next" ? nextIndex : prevIndex]}`}
        alt={`${blog.title} - ${direction === "next" ? "next" : "previous"} image`}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-600 ease-in-out ${
          isAnimating 
            ? direction === "next" 
              ? "transform translate-x-0" 
              : "transform translate-x-0"
            : direction === "next" 
              ? "transform translate-x-full" 
              : "transform -translate-x-full"
        }`}
      />

    </div>
  );
}