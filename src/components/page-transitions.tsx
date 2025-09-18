import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  id: string;
  className?: string;
}

export function PageTransition({ children, id, className = "" }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [id]);

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isVisible ? 1 : 0.7,
        y: isVisible ? 0 : 20,
        scale: isVisible ? 1 : 0.98
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

interface SmoothScrollProps {
  targetId: string;
  children: ReactNode;
  offset?: number;
}

export function SmoothScroll({ targetId, children, offset = 80 }: SmoothScrollProps) {
  const scrollToTarget = () => {
    const target = document.getElementById(targetId);
    if (target) {
      const targetPosition = target.offsetTop - offset;

      // Smooth scroll with easing
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = Math.min(Math.abs(distance) / 2, 1000); // Max 1 second
      let start: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <div onClick={scrollToTarget} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
}

export function SectionDivider() {
  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full" />
      <motion.div
        className="absolute top-0 left-0 h-px bg-gradient-to-r from-primary/50 to-transparent"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </motion.div>
  );
}


