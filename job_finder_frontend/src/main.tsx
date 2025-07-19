import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Theme from "./Theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme />
    </QueryClientProvider>
  </StrictMode>,
);
