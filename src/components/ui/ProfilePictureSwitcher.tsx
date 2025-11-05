import { useState, useEffect } from "react";

// Import all profile images
import profilePhoto from "@/assets/AndrewPhoto.jpg";
import profileHxH from "@/assets/Andrew_HxH.png";
import profileJuju from "@/assets/Andrew_juju.png";
import profileSolo from "@/assets/Andrew_solo.png";

interface ProfilePictureSwitcherProps {
  className?: string;
  storageKey?: string;
}

const ProfilePictureSwitcher = ({ 
  className = "", 
  storageKey = "profilePicture" 
}: ProfilePictureSwitcherProps) => {
  // Array of profile images
  const images = [
    profilePhoto,  // Original
    profileHxH,    // Hunter x Hunter style
    profileJuju,   // Jujutsu Kaisen style
    profileSolo,   // Solo Leveling style
  ];

  // Initialize state from localStorage or default to 0
  const [currentImageIndex, setCurrentImageIndex] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored !== null ? parseInt(stored, 10) : 0;
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
    <img
      src={images[currentImageIndex]}
      alt="Andrew Girgis"
      className={`cursor-pointer transition-all duration-300 ${className}`}
      onClick={handleClick}
    />
  );
};

export default ProfilePictureSwitcher;
