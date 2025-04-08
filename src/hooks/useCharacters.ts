import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getCharacters } from '../services/api';
import { useEffect } from 'react';

interface UseCharactersProps {
  page?: number;
  name?: string;
}


class PageCache {
  private pages: string[] = [];
  private maxSize: number;

  constructor(maxSize = 5) {
    this.maxSize = maxSize;
  }

  add(pageKey: string): void {

    this.pages = this.pages.filter(key => key !== pageKey);


    this.pages.push(pageKey);


    if (this.pages.length > this.maxSize) {
      this.pages.shift();
    }
  }

  has(pageKey: string): boolean {
    return this.pages.includes(pageKey);
  }
}


const pageCache = new PageCache(5);

export function useCharacters({ page = 1, name = '' }: UseCharactersProps = {}) {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const queryKey = ['characters', { page, name }];
  const pageKey = `${name}:${page}`;


  useEffect(() => {

    pageCache.add(pageKey);


    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ['characters', { page: page - 1, name }],
        queryFn: async () => getCharacters(page - 1, name),
      });
    }


    queryClient.prefetchQuery({
      queryKey: ['characters', { page: page + 1, name }],
      queryFn: async () => {
        try {
          return await getCharacters(page + 1, name);
        } catch (error) {

          if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null;
          }
          throw error;
        }
      },
    });
  }, [page, name, queryClient, pageKey]);

  return useQuery({
    queryKey,
    queryFn: async () => {

      await new Promise(resolve => setTimeout(resolve, 200));

      try {
        return await getCharacters(page, name);
      } catch (error) {

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          throw new Error(
            name
              ? t('errorSearching', { name })
              : t('noCharactersFound')
          );
        }
        throw error;
      }
    },
    placeholderData: (previousData) => previousData,
    retry: (failureCount, error: unknown) => {

      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },

    gcTime: 10 * 60 * 1000,
    staleTime: 0,
  });
} 