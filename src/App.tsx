import { useTranslation } from 'react-i18next';
import { CharactersPage } from './pages/CharactersPage';
import { ThemeProvider } from './components/theme-provider';
import { PortalBackground } from './components/atoms/PortalBackground';
import { PortalProvider, usePortal } from './contexts/PortalContext';
import { LanguageSwitcher } from './components/molecules/LanguageSwitcher';
import { GlowButton } from './components/atoms/GlowButton';
import './App.css';

function AppContent() {
  const { showPortal, togglePortal } = usePortal();
  const { t } = useTranslation('common');

  return (
    <>
      {showPortal ? (
        <PortalBackground />
      ) : (
        <div className="fixed inset-0 w-full h-full bg-gray-100 dark:bg-gray-900 -z-10" />
      )}
      <div className="fixed top-4 right-4 z-50">
        
        <GlowButton onClick={togglePortal}>
          {showPortal ? t('hidePortal', 'Hide Portal') : t('showPortal', 'Show Portal')}
        </GlowButton>
      </div>
      <div className="fixed top-4 left-4 z-50">
        <LanguageSwitcher className="bg-black/70 text-white rounded-md p-1" />
      </div>
      <CharactersPage />
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="rick-morty-theme">
      <PortalProvider>
        <AppContent />
      </PortalProvider>
    </ThemeProvider>
  );
}

export default App;
