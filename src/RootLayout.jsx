import { Outlet } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";
import ScreenLoading from "./components/ScreenLoading";

export default function RootLayout() {
  const { loading } = useAuth();

  return (
    <>
      {loading && <ScreenLoading />}
      <Outlet />
    </>
  );
}