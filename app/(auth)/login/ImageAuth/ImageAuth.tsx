import Image from 'next/image';

export function ImageAuth() {
  return (
    <div className="relative w-full h-full">
      {/* Use Next.js Image component for optimized loading */}
      <Image 
        src="/images/login3.jpg"
        alt="Login background"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  );
}
