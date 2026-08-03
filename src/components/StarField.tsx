import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    const STAR_COUNT = 200;
    const MAX_SHOOTING_STARS = 3;
    const SHOOTING_STAR_CHANCE = 0.003;
    let isDarkTheme = document.documentElement.classList.contains("dark");

    const getStarColor = (opacity: number) => {
      return isDarkTheme
        ? `rgba(200, 220, 255, ${opacity})`
        : `rgba(55, 55, 55, ${opacity})`;
    };

    const getShootingStarColor = (opacity: number) => {
      return isDarkTheme
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(55, 55, 55, ${opacity})`;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
    };

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.7 + 0.4,
          opacity: Math.random() * 0.85 + 0.25,
          speed: Math.random() * 0.003 + 0.001,
        });
      }
    };

    const spawnShootingStar = () => {
      if (shootingStars.length >= MAX_SHOOTING_STARS) return;
      const angle = (Math.random() * 15 + 15) * (Math.PI / 180);
      const goingRight = Math.random() > 0.5;
      shootingStars.push({
        x: goingRight
          ? Math.random() * width * 0.6
          : width * 0.4 + Math.random() * width * 0.6,
        y: Math.random() * height * 0.6,
        length: Math.random() * 60 + 60,
        speed: Math.random() * 4 + 4,
        angle: goingRight ? angle : Math.PI - angle,
        opacity: 1,
        life: Math.floor(Math.random() * 30 + 30),
        maxLife: 0,
      });
      shootingStars[shootingStars.length - 1].maxLife =
        shootingStars[shootingStars.length - 1].life;
    };

    let time = 0;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const twinkle = prefersReducedMotion
          ? star.opacity
          : star.opacity * (0.5 + 0.5 * Math.sin(time * star.speed * 60 + star.x));

        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx!.fillStyle = getStarColor(isDarkTheme ? twinkle : Math.max(twinkle, 0.35));
        ctx!.fill();
      }

      if (!prefersReducedMotion) {
        if (Math.random() < SHOOTING_STAR_CHANCE) {
          spawnShootingStar();
        }

        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const ss = shootingStars[i];
          ss.x += Math.cos(ss.angle) * ss.speed;
          ss.y += Math.sin(ss.angle) * ss.speed;
          ss.life--;
          ss.opacity = ss.life / ss.maxLife;

          if (ss.life <= 0) {
            shootingStars.splice(i, 1);
            continue;
          }

          const tailX = ss.x - Math.cos(ss.angle) * ss.length * ss.opacity;
          const tailY = ss.y - Math.sin(ss.angle) * ss.length * ss.opacity;

          const gradient = ctx!.createLinearGradient(
            ss.x,
            ss.y,
            tailX,
            tailY
          );
          gradient.addColorStop(0, getShootingStarColor(ss.opacity * 0.9));
          gradient.addColorStop(1, getShootingStarColor(0));

          ctx!.beginPath();
          ctx!.moveTo(ss.x, ss.y);
          ctx!.lineTo(tailX, tailY);
          ctx!.strokeStyle = gradient;
          ctx!.lineWidth = 1.5;
          ctx!.lineCap = "round";
          ctx!.stroke();

          ctx!.beginPath();
          ctx!.arc(ss.x, ss.y, 1.5, 0, Math.PI * 2);
          ctx!.fillStyle = getShootingStarColor(ss.opacity);
          ctx!.fill();
        }
      }

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    initStars();
    animate();

    const handleResize = () => {
      resize();
      initStars();
      shootingStars.length = 0;
    };

    const themeObserver = new MutationObserver(() => {
      isDarkTheme = document.documentElement.classList.contains("dark");
    });

    window.addEventListener("resize", handleResize);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-screen w-screen pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default StarField;
