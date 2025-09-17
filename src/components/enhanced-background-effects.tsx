import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function EnhancedBackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms for different elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main blue gradient - more visible like in reference */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.4) 30%, rgba(59, 130, 246, 0.1) 60%, transparent 100%)'
        }}
      />
      
      {/* Purple gradient with parallax */}
      <motion.div 
        style={{ y: y2, rotate: rotate1 }}
        className="absolute -top-60 -left-60 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.7) 0%, rgba(147, 51, 234, 0.3) 40%, rgba(147, 51, 234, 0.1) 70%, transparent 100%)'
        }}
      />
      
      {/* Orange/Pink gradient moving */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute top-1/2 -left-60 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.6) 0%, rgba(236, 72, 153, 0.4) 50%, transparent 100%)'
        }}
      />
      
      {/* Green accent with rotation */}
      <motion.div 
        style={{ y: y1, rotate: rotate2 }}
        className="absolute -bottom-40 -right-60 w-[700px] h-[700px] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.6) 0%, rgba(6, 182, 212, 0.4) 50%, transparent 100%)'
        }}
      />
      
      {/* Smaller floating elements */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/4 left-1/3 w-[200px] h-[200px] rounded-full opacity-15 blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%)'
        }}
      />
      
      <motion.div 
        style={{ y: y3 }}
        className="absolute top-2/3 right-1/4 w-[300px] h-[300px] rounded-full opacity-20 blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.7) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)'
        }}
      />
      
      {/* Interactive hover areas */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full pointer-events-auto group cursor-pointer">
        <div 
          className="w-full h-full rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, transparent 70%)'
          }}
        />
      </div>
      
      <div className="absolute top-2/3 right-1/3 w-40 h-40 rounded-full pointer-events-auto group cursor-pointer">
        <div 
          className="w-full h-full rounded-full opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)'
          }}
        />
      </div>
    </div>
  );
}