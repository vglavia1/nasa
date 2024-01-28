import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./ts";

const queryClient = new QueryClient();

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};
