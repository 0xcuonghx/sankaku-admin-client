import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./dashboard/Dashboard";
import SignIn from "./sign-in/SignIn";
import RequireAuth from "./auth/RequireAuth";
import { createConfig, http, WagmiProvider } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SmartAccount from "./dashboard/smart-accounts/SmartAccount";
import Subscriptions from "./dashboard/subscriptions/Subscriptions";
import Home from "./dashboard/home/Home";

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
            >
              <Route index element={<Home />} />
              <Route path="smart-accounts" element={<SmartAccount />} />
              <Route path="subscriptions" element={<Subscriptions />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
}
