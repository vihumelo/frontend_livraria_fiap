import useQuery from 'swr';

export default function useAuthors() {
  const { data, isLoading } = useQuery('/autores');

  return {
    authors: data?.data?.items || [],
    isLoadingAuthors: isLoading,
  };
}
