import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Character } from '../../services/api';
import { cn } from '../../lib/utils';
import { Text } from '../atoms/Text';
import { Image } from '../atoms/Image';
import { usePortal } from '../../contexts/PortalContext';
import { useFontPreference } from '../../contexts/FontContext';


interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface CharacterDetailModalProps {
  character: Character;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterDetailModal({ character, isOpen, onClose }: CharacterDetailModalProps) {
  const { t } = useTranslation('common');
  const { showPortal } = usePortal();
  const { isRickMode } = useFontPreference();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);


  const getEpisodeIds = useCallback(() => {
    return character.episode.map(url => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    });
  }, [character.episode]);


  useEffect(() => {
    if (!isOpen) return;
    
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        const episodeIds = getEpisodeIds();
        const url = `https://rickandmortyapi.com/api/episode/${episodeIds.join(',')}`;
        const response = await fetch(url);
        const data = await response.json();
        

        if (Array.isArray(data)) {
          setEpisodes(data);
        } else if (data && data.id) {
          setEpisodes([data]);
        }
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [character, isOpen, getEpisodeIds]);


  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

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

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    }}>
      {/* Backdrop */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: showPortal ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(3px)'
        }}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        data-testid="character-modal"
        className={cn(
          "w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl",
          "p-6 animate-in fade-in zoom-in-95 duration-300",
          showPortal
            ? "backdrop-blur-md bg-black/40 border border-white/20"
            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
          isRickMode && showPortal && "font-wubba text-green-400"
        )}
        style={{
          position: 'relative',
          zIndex: 1
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose} 
          className={cn(
            "absolute top-4 right-4 p-2 rounded-full z-10",
            showPortal
              ? "bg-black/40 hover:bg-black/60 text-white hover:text-white"
              : "hover:bg-gray-200/20 text-gray-400 hover:text-white"
          )}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Character Image */}
          <div className="md:w-1/3 flex-shrink-0">
            <Image 
              src={character.image} 
              alt={character.name} 
              className="w-full rounded-lg object-cover shadow-lg"
            />
            <div className={cn(
              "mt-4 p-3 rounded-lg",
              showPortal
                ? "bg-white/10 dark:bg-black/30"
                : "bg-gray-100 dark:bg-gray-700"
            )}>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  character.status === "Alive" ? "bg-green-500" : 
                  character.status === "Dead" ? "bg-red-500" : "bg-gray-500"
                )}></div>
                <Text color={getStatusColor(character.status)} className={cn(
                  "font-medium",
                  showPortal ? "text-shadow text-white" : "",
                  isRickMode && showPortal && "text-green-400"
                )}>
                  {t(character.status.toLowerCase(), character.status)} - {character.species}
                </Text>
              </div>
            </div>
          </div>

          {/* Character Details */}
          <div className={cn(
            "md:w-2/3",
            showPortal ? "text-white" : "text-gray-900 dark:text-white",
            isRickMode && showPortal && "text-green-400"
          )}>
            <h2 className={cn(
              "text-3xl font-bold mb-4",
              showPortal ? "text-shadow" : "",
              isRickMode && showPortal && "text-green-500"
            )}>
              {character.name}
            </h2>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className={cn(
                "grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-lg",
                showPortal
                  ? "bg-white/10 dark:bg-black/30"
                  : "bg-gray-100 dark:bg-gray-700"
              )}>
                <div className="space-y-2">
                  <Text variant="label" className={cn(
                    "font-medium", 
                    showPortal ? "text-shadow" : "",
                    isRickMode && showPortal && "text-green-300"
                  )}>
                    {t('gender')}:
                  </Text>
                  <Text className={cn(
                    "pl-2", 
                    showPortal ? "text-shadow" : "",
                    isRickMode && showPortal && "text-green-400"
                  )}>
                    {character.gender}
                  </Text>
                </div>

                {character.type && (
                  <div className="space-y-2">
                    <Text variant="label" className={cn("font-medium", showPortal ? "text-shadow" : "")}>
                      {t('type')}:
                    </Text>
                    <Text className={cn("pl-2", showPortal ? "text-shadow" : "")}>
                      {character.type || t('unknown')}
                    </Text>
                  </div>
                )}

                <div className="space-y-2">
                  <Text variant="label" className={cn("font-medium", showPortal ? "text-shadow" : "")}>
                    {t('origin')}:
                  </Text>
                  <Text className={cn("pl-2", showPortal ? "text-shadow" : "")}>
                    {character.origin.name}
                  </Text>
                </div>

                <div className="space-y-2">
                  <Text variant="label" className={cn("font-medium", showPortal ? "text-shadow" : "")}>
                    {t('lastKnownLocation')}:
                  </Text>
                  <Text className={cn("pl-2", showPortal ? "text-shadow" : "")}>
                    {character.location.name}
                  </Text>
                </div>

                <div className="space-y-2">
                  <Text variant="label" className={cn("font-medium", showPortal ? "text-shadow" : "")}>
                    {t('created')}:
                  </Text>
                  <Text className={cn("pl-2", showPortal ? "text-shadow" : "")}>
                    {formatDate(character.created)}
                  </Text>
                </div>
              </div>

              {/* Episodes */}
              <div className="mt-8">
                <Text variant="subtitle" className={cn(
                  "mb-4", 
                  showPortal ? "text-shadow" : "",
                  isRickMode && showPortal && "text-green-300"
                )}>
                  {t('episodes')}:
                </Text>
                
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className={cn(
                      "animate-spin rounded-full h-8 w-8",
                      showPortal
                        ? "border-t-2 border-b-2 border-green-400"
                        : "border-t-2 border-b-2 border-gray-400 dark:border-white"
                    )}></div>
                  </div>
                ) : (
                  <div className={cn(
                    "rounded-lg overflow-hidden",
                    showPortal
                      ? "bg-white/10 dark:bg-black/30"
                      : "bg-gray-100 dark:bg-gray-700"
                  )}>
                    <div className="max-h-60 overflow-y-auto">
                      <table className="w-full">
                        <thead className={cn(
                          "sticky top-0",
                          showPortal
                            ? "bg-black/50 text-white text-shadow"
                            : "bg-gray-200 dark:bg-gray-600",
                          isRickMode && showPortal && "text-white"
                        )}>
                          <tr>
                            <th className="py-3 px-4 text-left font-medium">{t('episode')}</th>
                            <th className="py-3 px-4 text-left font-medium">{t('name')}</th>
                            <th className="py-3 px-4 text-left font-medium hidden sm:table-cell">{t('airDate')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {episodes.map((episode) => (
                            <tr key={episode.id} className={cn(
                              "border-t",
                              showPortal
                                ? "border-white/10 hover:bg-white/10 text-white text-shadow"
                                : "border-gray-200 dark:border-gray-600 hover:bg-gray-200/50 dark:hover:bg-gray-600/50",
                              isRickMode && showPortal && "text-white"
                            )}>
                              <td className="py-3 px-4 font-mono">{episode.episode}</td>
                              <td className="py-3 px-4">{episode.name}</td>
                              <td className="py-3 px-4 hidden sm:table-cell">{episode.air_date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 