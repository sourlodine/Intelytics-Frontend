import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API as string) + "/api",
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default api;
