import useQuery from 'swr';

export default function usePublishers() {
  const { data, isLoading } = useQuery('/editoras');

  return {
    publishers: data?.data?.items || [],
    isLoadingPublishers: isLoading,
  };
}
