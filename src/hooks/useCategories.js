import useQuery from "swr";

export default function useCategories() {
  const { data, isLoading } = useQuery("/categorias");

  return {
    categories: data?.data?.items || [],
    isLoadingCategories: isLoading,
  };
}
