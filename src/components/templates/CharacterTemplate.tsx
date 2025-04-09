import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CharacterTemplateProps {
  header: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function CharacterTemplate({
  header,
  content,
  footer,
  className,
}: CharacterTemplateProps) {
  return (
    <div className={cn('min-h-screen bg-transparent px-4 py-8 transition-colors', className)}>
      <div className="container mx-auto">
        <header className="mb-8 backdrop-blur-[2px] bg-white/15 dark:bg-black/10 p-4 rounded-xl border border-white/10 dark:border-gray-800/10">
          {header}
        </header>

        <main>
          {content}
        </main>

        {footer && (
          <footer className="mt-8">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
} 