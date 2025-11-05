import { ChevronDown, Info, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import heroBg from "@/assets/andrew_intro.mp4";
import { useRef, useState, useEffect } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Always start muted for autoplay
  const [volume, setVolume] = useState(() => {
    // Check localStorage for volume preference, default to 0.7
    const stored = localStorage.getItem("heroVideoVolume");
    return stored !== null ? parseFloat(stored) : 0.7;
  });
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [greeting, setGreeting] = useState<string>("");
  const [isLoadingGreeting, setIsLoadingGreeting] = useState(true);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Fetch AI-generated greeting
  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await fetch('/.netlify/functions/greeting');
        
        // Check if response is actually JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.log('Greeting function not available (running locally or not deployed yet)');
          setGreeting('Welcome! <span class="greeting-emoji">👋</span>'); // Placeholder greeting
          setIsLoadingGreeting(false);
          return;
        }
        
        if (response.ok) {
          const data = await response.json();
          setGreeting(data.text);
        } else {
          console.log('Greeting function returned error:', response.status);
          setGreeting('Welcome! <span class="greeting-emoji">👋</span>'); // Placeholder greeting
        }
      } catch (error) {
        // Use placeholder greeting when function is not available
        console.log('Greeting function not available:', error instanceof Error ? error.message : 'Unknown error');
        setGreeting('Welcome! <span class="greeting-emoji">👋</span>');
      } finally {
        setIsLoadingGreeting(false);
      }
    };

    fetchGreeting();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.volume = volume;
      
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      
      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, [volume]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
      setShowVolumeSlider(!video.muted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    const video = videoRef.current;
    if (video) {
      video.volume = newVolume;
      // Persist volume to localStorage
      localStorage.setItem("heroVideoVolume", String(newVolume));
      
      if (newVolume === 0) {
        video.muted = true;
        setIsMuted(true);
        setShowVolumeSlider(false);
      } else if (video.muted) {
        video.muted = false;
        setIsMuted(false);
        setShowVolumeSlider(true);
      }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Subtle bottom gradient matching website background - 100% opacity */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-90% to-background/100" />
      </div>

      {/* Video Controls */}
      <div className="absolute top-20 left-4 z-20 flex items-center gap-2">
        {/* Play/Pause Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlayPause}
          className="bg-background/20 backdrop-blur-sm border-white/30 hover:bg-background/40 text-white hover:text-white transition-all duration-300"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMute}
            className="bg-background/20 backdrop-blur-sm border-white/30 hover:bg-background/40 text-white hover:text-white transition-all duration-300"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          {/* Volume Slider */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showVolumeSlider ? 'w-24 opacity-100' : 'w-0 opacity-0'
            }`}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-primary"
              style={{
                background: `linear-gradient(to right, #007bff 0%, #007bff ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%, rgba(255,255,255,0.3) 100%)`
              }}
              aria-label="Volume slider"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          Andrew Girgis
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 max-w-3xl mx-auto font-light">
          Data Scientist • Economist 
        </p>
        
        {/* AI-Generated Greeting */}
        {!isLoadingGreeting && greeting && (
          <div 
            className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-medium animate-fade-in"
            dangerouslySetInnerHTML={{ __html: greeting }}
          />
        )}
        
        {/* <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Turning complex data into meaningful solutions
        </p> */}
        <Button
          onClick={scrollToAbout}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Learn More About Me
          <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
        </Button>
      </div>

      {/* Info Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-20 right-4 z-20 bg-background/20 backdrop-blur-sm border-white/30 hover:bg-background/40 text-white hover:text-white transition-all duration-300"
          >
            <Info className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">About This Video</DialogTitle>
            <DialogDescription className="text-base pt-2">
              The hero video showcases various aspects of my life and passions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="text-primary">🎓</span> Education & Research
              </h3>
              <p className="text-sm text-muted-foreground pl-7">
                Footage from my time at Brock University and University of Waterloo, where I developed my foundation in economics and data science.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="text-primary">💼</span> Professional Work
              </h3>
              <p className="text-sm text-muted-foreground pl-7">
                Clips showcasing my work in data analysis, economic modeling, and building AI solutions that drive business impact.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="text-primary">🏋️</span> Fitness & Health
              </h3>
              <p className="text-sm text-muted-foreground pl-7">
                Moments from my fitness journey - staying active and healthy is essential for maintaining peak performance in demanding analytical work.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="text-primary">✈️</span> Travel & Exploration
              </h3>
              <p className="text-sm text-muted-foreground pl-7">
                Adventures from around the world that broaden my perspective and inspire creative problem-solving in my work.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="text-primary">🎯</span> Hobbies & Interests
              </h3>
              <p className="text-sm text-muted-foreground pl-7">
                Activities that keep me balanced - from coding personal projects to exploring new technologies and staying curious about the world.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="text-primary">👥</span> Community & Connections
              </h3>
              <p className="text-sm text-muted-foreground pl-7">
                Time spent with friends, family, and professional networks - collaboration and meaningful relationships drive my best work.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/60" />
      </div>
    </section>
  );
};

export default HeroSection;