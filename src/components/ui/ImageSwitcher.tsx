import { useState, useEffect } from "react";

// Import your cartoon images
import cartoonBlue from "@/assets/Cartoon_me_blue.png";
import cartoonRed from "@/assets/Cartoon_me_red.png";
import cartoonGreen from "@/assets/Cartoon_me_green.png";
import cartoonPolo from "@/assets/Cartoon_me_polo.png";
import cartoonSuit from "@/assets/Cartoon_me_suit.png";

const NavIconSwitcher = () => {
  const images = [cartoonBlue, cartoonRed, cartoonGreen, cartoonPolo, cartoonSuit];
  
  // Load saved image from localStorage or use first image
  const [currentImageIndex, setCurrentImageIndex] = useState(() => {
    const stored = localStorage.getItem("navIcon");
    if (stored) {
      const index = images.indexOf(stored);
      return index >= 0 ? index : 0;
    }
    return 0;
  });

  // Save to localStorage when image changes
  useEffect(() => {
    localStorage.setItem("navIcon", images[currentImageIndex]);
  }, [currentImageIndex, images]);

  // Click to change to next image
  const handleClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <img
      src={images[currentImageIndex]}
      alt="Andrew's Avatar"
      className="w-10 h-10 rounded-full cursor-pointer transition-transform hover:scale-110"
      onClick={handleClick}
      title="Click to change avatar"
    />
  );
};

export default NavIconSwitcher;