import { cn } from '../../lib/utils';
import { Character } from '../../services/api';
import { CharacterCard } from '../molecules/CharacterCard';
import { usePortal } from '../../contexts/PortalContext';

interface CharacterGridProps {
  characters: Character[];
  className?: string;
}

export function CharacterGrid({ characters, className }: CharacterGridProps) {
  const { showPortal } = usePortal();

  if (characters.length === 0) {
    return (
      <div data-testid="empty-results" className="flex justify-center items-center h-64">
        <p data-testid="no-characters-message" className="text-gray-500 text-lg">No characters found</p>
      </div>
    );
  }

  return (
    <div 
      data-testid="character-grid"
      className={cn(
        'p-8 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
        showPortal
          ? 'backdrop-blur-[2px] bg-transparent border border-white/10 dark:border-gray-800/10 shadow-xl'
          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md',
        className
      )}
    >
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
} 