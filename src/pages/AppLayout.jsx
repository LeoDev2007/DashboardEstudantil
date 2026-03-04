import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function AppLayout() {
  const { setLoading, cancelOnboarding } = useAuth();
  useEffect(() => {
    setLoading(false);
  }, []);
  
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
