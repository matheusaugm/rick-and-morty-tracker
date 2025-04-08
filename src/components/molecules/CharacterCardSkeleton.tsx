import clsx from 'clsx';
import { Skeleton } from '../atoms/Skeleton';

interface CharacterCardSkeletonProps {
  className?: string;
}

export function CharacterCardSkeleton({ className = '' }: CharacterCardSkeletonProps) {
  return (
    <div className={clsx('border rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 h-[400px]', className)}>
      <div className="flex flex-col h-full">
        {/* Image skeleton */}
        <Skeleton className="w-full h-48" />
        
        <div className="p-4 flex flex-col flex-grow">
          {/* Name skeleton */}
          <Skeleton className="h-6 w-3/4 mb-4" />
          
          {/* Status skeleton */}
          <div className="mt-2">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          
          {/* Location skeleton */}
          <div className="mt-2">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          
          {/* Origin skeleton */}
          <div className="mt-2">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/6" />
          </div>
        </div>
      </div>
    </div>
  );
} 