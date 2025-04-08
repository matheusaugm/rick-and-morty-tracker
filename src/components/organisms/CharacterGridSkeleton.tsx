import clsx from 'clsx';
import { CharacterCardSkeleton } from '../molecules/CharacterCardSkeleton';

interface CharacterGridSkeletonProps {
  count?: number;
  className?: string;
}

export function CharacterGridSkeleton({ count = 8, className = '' }: CharacterGridSkeletonProps) {
  return (
    <div className={clsx('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <CharacterCardSkeleton key={index} />
      ))}
    </div>
  );
} 