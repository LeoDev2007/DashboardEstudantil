import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function RouteGuard({ children, type }) {
  const { user } = useAuth();

  // rota publica (login/register)
  if (type === "public") {
    if (!user) return children;
    return <Navigate to="/app" replace />;
  }

  // onboarding
  if (type === "onboarding") {
    if (!user) return <Navigate to="/" replace />;
    if (user.completed) return <Navigate to="/app" replace />;
    return children;
  }

  // privada
  if (!user) return <Navigate to="/" replace />;

  return children;
}
