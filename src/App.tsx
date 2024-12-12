import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./dashboard/Dashboard";
import SignIn from "./sign-in/SignIn";
import RequireAuth from "./auth/RequireAuth";
import { createConfig, http, WagmiProvider } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const config = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
          </Routes>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
}
