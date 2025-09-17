import { motion } from 'motion/react';
import { useState } from 'react';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function FloatingCard({ children, className = "", intensity = 'medium' }: FloatingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const intensityConfig = {
    low: { scale: 1.02, y: -5, rotateX: 2 },
    medium: { scale: 1.05, y: -10, rotateX: 5 },
    high: { scale: 1.08, y: -15, rotateX: 8 }
  };

  return (
    <motion.div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? intensityConfig[intensity].scale : 1,
        y: isHovered ? intensityConfig[intensity].y : 0,
        rotateX: isHovered ? intensityConfig[intensity].rotateX : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, className = "", strength = 20 }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / rect.width * strength;
    const deltaY = (e.clientY - centerY) / rect.height * strength;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlowEffect({ children, className = "", glowColor = "rgba(59, 130, 246, 0.5)", intensity = 'medium' }: GlowEffectProps) {
  const [isHovered, setIsHovered] = useState(false);

  const intensityConfig = {
    low: { blur: 'blur-md', scale: 1.05, opacity: 0.4 },
    medium: { blur: 'blur-lg', scale: 1.1, opacity: 0.6 },
    high: { blur: 'blur-xl', scale: 1.2, opacity: 0.8 }
  };

  const config = intensityConfig[intensity];

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`absolute inset-0 rounded-full ${config.blur} -z-10`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? config.opacity : 0,
          scale: isHovered ? config.scale : 0.8,
        }}
        transition={{ duration: 0.3 }}
        style={{ 
          backgroundColor: glowColor,
          transform: 'translate(0, 0)' // Prevent overflow
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className = "", maxTilt = 15 }: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((y - centerY) / centerY) * maxTilt;
    const tiltY = ((centerX - x) / centerX) * maxTilt;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}