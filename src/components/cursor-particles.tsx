import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  velocity: { x: number; y: number };
  life: number;
  maxLife: number;
}

export function CursorParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particleIdRef = useRef(0);
  const lastSpawnTime = useRef(0);

  const colors = [
    'rgba(59, 130, 246, 0.8)',   // Blue
    'rgba(147, 51, 234, 0.8)',   // Purple  
    'rgba(236, 72, 153, 0.8)',   // Pink
    'rgba(34, 197, 94, 0.8)',    // Green
    'rgba(251, 146, 60, 0.8)',   // Orange
    'rgba(6, 182, 212, 0.8)',    // Cyan
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const now = Date.now();
      // Spawn particles every 50ms when moving
      if (now - lastSpawnTime.current > 50) {
        lastSpawnTime.current = now;
        
        // Create 2-3 particles per spawn
        for (let i = 0; i < Math.random() * 2 + 1; i++) {
          const newParticle: Particle = {
            id: particleIdRef.current++,
            x: e.clientX + (Math.random() - 0.5) * 20,
            y: e.clientY + (Math.random() - 0.5) * 20,
            size: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: 1,
            velocity: {
              x: (Math.random() - 0.5) * 2,
              y: (Math.random() - 0.5) * 2 - 1, // Slight upward bias
            },
            life: 0,
            maxLife: 1000 + Math.random() * 1000, // 1-2 seconds
          };

          setParticles(prev => [...prev, newParticle]);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.velocity.x,
            y: particle.y + particle.velocity.y,
            life: particle.life + 16, // ~60fps
            opacity: Math.max(0, 1 - (particle.life / particle.maxLife)),
          }))
          .filter(particle => particle.life < particle.maxLife)
      );
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </AnimatePresence>
      
      {/* Cursor glow effect */}
      <motion.div
        className="absolute w-8 h-8 rounded-full pointer-events-none"
        style={{
          left: mousePos.x - 16,
          top: mousePos.y - 16,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
        }}
        animate={{
          x: 0,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
    </div>
  );
}