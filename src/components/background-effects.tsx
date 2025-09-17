export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Purple gradient blob - top left */}
      <div 
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)'
        }}
      />
      
      {/* Blue gradient blob - top right */}
      <div 
        className="absolute -top-20 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)'
        }}
      />
      
      {/* Orange gradient blob - middle left */}
      <div 
        className="absolute top-1/2 -left-48 w-72 h-72 rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, rgba(251, 146, 60, 0.1) 50%, transparent 100%)'
        }}
      />
      
      {/* Pink gradient blob - middle right */}
      <div 
        className="absolute top-1/3 -right-40 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 100%)'
        }}
      />
      
      {/* Green gradient blob - bottom left */}
      <div 
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, rgba(34, 197, 94, 0.1) 50%, transparent 100%)'
        }}
      />
      
      {/* Cyan gradient blob - bottom right */}
      <div 
        className="absolute -bottom-40 -right-48 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)'
        }}
      />
      
      {/* Additional smaller accent blobs */}
      <div 
        className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full opacity-10 blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)'
        }}
      />
      
      <div 
        className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full opacity-10 blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.6) 0%, transparent 70%)'
        }}
      />
    </div>
  );
}