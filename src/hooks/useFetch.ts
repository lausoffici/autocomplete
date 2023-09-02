import { useState, useEffect } from "react";

interface UseFetchResponse<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isIdle: boolean;
  status: Status;
}

export type Status = "idle" | "resolved" | "error" | "pending";

type useFetchArgs = {
  url: string;
  enabled?: boolean;
};

const useFetch = <T>({
  url,
  enabled = true,
}: useFetchArgs): UseFetchResponse<T> => {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<T | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (!enabled) return;

      setStatus("pending");

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const responseData = (await response.json()) as T;
        setData(responseData);

        setStatus("resolved");
      } catch (err) {
        setStatus("error");
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    isLoading: status === "pending",
    isError: status === "error",
    isSuccess: status === "resolved",
    isIdle: status === "idle",
    status,
  };
};

export default useFetch;
