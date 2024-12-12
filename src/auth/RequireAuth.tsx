import { Navigate, useLocation } from "react-router";
import { PropsWithChildren } from "react";
import { useAccount } from "wagmi";

export default function RequireAuth({ children }: PropsWithChildren) {
  let { isConnected } = useAccount();
  let location = useLocation();

  console.log("isConnected", isConnected);

  if (!isConnected) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}
