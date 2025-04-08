import { ReactNode } from 'react';
import clsx from 'clsx';

interface TextProps {
  children: ReactNode;
  variant?: 'title' | 'subtitle' | 'body' | 'label';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  className?: string;
}

export function Text({
  children,
  variant = 'body',
  color = 'default',
  className = '',
}: TextProps) {
  const variantStyles = {
    title: 'text-2xl font-bold',
    subtitle: 'text-xl font-semibold',
    body: 'text-base',
    label: 'text-sm font-medium',
  };

  const colorStyles = {
    default: 'text-gray-900 dark:text-gray-100',
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-gray-600 dark:text-gray-400',
    success: 'text-green-500 dark:text-green-400',
    danger: 'text-red-500 dark:text-red-400',
    warning: 'text-yellow-500 dark:text-yellow-300',
  };

  return (
    <span className={clsx(variantStyles[variant], colorStyles[color], className)}>
      {children}
    </span>
  );
} 