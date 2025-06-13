import { colors } from "@constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.black },
          headerTitleStyle: { color: colors.white },
        }}
      />
    </QueryClientProvider>
  );
};
