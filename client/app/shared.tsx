"use client";
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const QueryComponent = ({ endpoint }: { endpoint: string }) => {
  const query = useQuery({
    queryKey: [endpoint],
    queryFn: () => fetch(endpoint).then((res) => res.json()),
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {(query.error as any).message}</div>;
  }

  return (
    <div>
      <h1>{endpoint}</h1>
      <pre>{JSON.stringify(query.data, null, 2)}</pre>

      <h2>{query.isFetching ? "isFetching" : null}</h2>
    </div>
  );
};

export const Demo = ({ endpoint }: { endpoint: string }) => {
  return (
    <QueryProvider>
      <QueryComponent endpoint={endpoint} />
    </QueryProvider>
  );
};
