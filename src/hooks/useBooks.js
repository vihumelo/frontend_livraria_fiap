import useQuery from 'swr';

export default function useBooks({ search = '' } = {}) {
  const { data, isLoading } = useQuery(() => `/livros?q=${search}&limit=100`);

  return {
    books: data?.data?.items || [],
    isLoadingBooks: isLoading,
  };
}
