import { useState } from 'react';
import { Flower2 } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  fallbackTitle?: string;
}

export function SafeImage({ src, alt, className = '', aspectRatio = 'aspect-[4/3]', fallbackTitle }: SafeImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#FDF0F2] via-[#FCEAEF] to-[#F5D8E0] p-6 text-center text-[#A45266] ${aspectRatio} ${className}`}>
        <div className="w-12 h-12 rounded-full bg-white/80 shadow-xs flex items-center justify-center mb-2">
          <Flower2 className="w-6 h-6 text-[#A45266]" />
        </div>
        <span className="text-xs font-semibold tracking-wide uppercase text-[#A45266]">Bloom Events Studio</span>
        <span className="text-sm font-serif mt-1 text-[#2B2627] line-clamp-1">{fallbackTitle || alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-[#F7EAEF] animate-pulse flex items-center justify-center">
          <Flower2 className="w-6 h-6 text-[#A45266]/40 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
}
