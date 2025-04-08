import clsx from 'clsx';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function Image({ src, alt, className = '' }: ImageProps) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={clsx('object-cover', className)}
    />
  );
} 