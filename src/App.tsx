import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./dashboard/Dashboard";
import SignIn from "./sign-in/SignIn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
