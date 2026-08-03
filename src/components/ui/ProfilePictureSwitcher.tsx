import { useState, useEffect } from "react";

const images = [
  "/about/AndrewPhoto.jpg",
  "/about/Andrew_HxH.png",
  "/about/Andrew_juju.png",
  "/about/Andrew_solo.png",
];

interface ProfilePictureSwitcherProps {
  className?: string;
  storageKey?: string;
}

const ProfilePictureSwitcher = ({ 
  className = "", 
  storageKey = "profilePicture" 
}: ProfilePictureSwitcherProps) => {
  // Initialize state from localStorage or default to 0
  const [currentImageIndex, setCurrentImageIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem(storageKey);
    const index = stored !== null ? parseInt(stored, 10) : 0;
    return Number.isInteger(index) && index >= 0 && index < images.length ? index : 0;
  });

  // Sync with localStorage whenever index changes
  useEffect(() => {
    localStorage.setItem(storageKey, currentImageIndex.toString());
  }, [currentImageIndex, storageKey]);

  // Handle click to cycle through images
  const handleClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Click to change profile picture style"
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
    >
      <img
        src={images[currentImageIndex]}
        alt="Andrew Girgis"
        loading="lazy"
        className={`cursor-pointer transition-all duration-300 ${className}`}
      />
    </button>
  );
};

export default ProfilePictureSwitcher;
