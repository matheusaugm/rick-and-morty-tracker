import { useState } from 'react';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';
import { Character } from '../../services/api';
import { Text } from '../atoms/Text';
import { Image } from '../atoms/Image';
import { usePortal } from '../../contexts/PortalContext';
import { CharacterDetailModal } from './CharacterDetailModal';
import { Portal } from '../atoms/Portal';

interface CharacterCardProps {
  character: Character;
  className?: string;
}

export function CharacterCard({ character, className }: CharacterCardProps) {
  const { t } = useTranslation('common');
  const { showPortal } = usePortal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive':
        return 'success';
      case 'Dead':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getTranslatedStatus = (status: string) => {
    switch (status) {
      case 'Alive':
        return t('alive');
      case 'Dead':
        return t('dead');
      default:
        return t('unknown');
    }
  };

  return (
    <>
      <div 
        data-testid="character-card"
        className={cn(
          'rounded-lg overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer',
          showPortal
            ? 'backdrop-blur-md bg-white/15 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 hover:bg-white/25 dark:hover:bg-gray-800/30'
            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700',
          className
        )}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-col h-full relative">
          <div className="relative z-10">
            <Image 
              src={character.image} 
              alt={character.name} 
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div>
          </div>
          <div className={cn(
            "p-4 flex flex-col flex-grow relative z-10",
            showPortal ? "text-white dark:text-gray-100" : "text-gray-900 dark:text-gray-100"
          )}>
            <Text variant="subtitle" color="success" className={cn(
              "mb-2 px-0.5 font-semibold",
              showPortal ? "text-shadow" : ""
            )}>
              {character.name}
            </Text>
            
            <div className="mt-2 px-0.5">
              <div className={cn(
                "flex flex-col gap-0.5 pb-0.5 border-b",
                showPortal ? "border-white/10 dark:border-gray-700/15" : "border-gray-200 dark:border-gray-700"
              )}>
                <Text variant="label" color="secondary" className={cn(
                  "pb-0.5",
                  showPortal ? "text-shadow" : ""
                )}>
                  {t('status')}:
                </Text>
                <Text color={getStatusColor(character.status)} className={cn(
                  "pl-1.5 pb-1",
                  showPortal ? "text-shadow" : ""
                )}>
                  {getTranslatedStatus(character.status)} - {character.species}
                </Text>
              </div>
              
              <div className={cn(
                "mt-3 flex flex-col gap-0.5 pb-0.5 border-b",
                showPortal ? "border-white/10 dark:border-gray-700/15" : "border-gray-200 dark:border-gray-700"
              )}>
                <Text variant="label" color="secondary" className={cn(
                  "pb-0.5",
                  showPortal ? "text-shadow" : ""
                )}>
                  {t('lastKnownLocation')}:
                </Text>
                <Text className={cn(
                  "pl-1.5 pb-1",
                  showPortal ? "text-shadow" : ""
                )}>
                  {character.location.name}
                </Text>
              </div>
              
              <div className="mt-3 flex flex-col gap-0.5">
                <Text variant="label" color="secondary" className={cn(
                  "pb-0.5",
                  showPortal ? "text-shadow" : ""
                )}>
                  {t('firstSeenIn')}:
                </Text>
                <Text className={cn(
                  "pl-1.5 pb-1",
                  showPortal ? "text-shadow" : ""
                )}>
                  {character.origin.name}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Character Detail Modal - Rendered in a portal directly to body */}
      {isModalOpen && (
        <Portal>
          <CharacterDetailModal 
            character={character}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Portal>
      )}
    </>
  );
} 