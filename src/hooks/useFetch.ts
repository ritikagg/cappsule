import { useEffect, useState } from "react";

interface FetchResponse<T> {
  data: T | null;
  isLoading: boolean;
  refetch: () => void;
}

interface FetchOptions {
  skip?: boolean;
}

const useFetch = <T>(
  url: string,
  options: FetchOptions = {},
): FetchResponse<T> => {
  const { skip = false } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData: T = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!skip) {
      fetchData();
    }
  }, [skip]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, refetch };
};

export default useFetch;
