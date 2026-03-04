import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import RootLayout from "../RootLayout";
import RouteGuard from "./RouteGuard";
import AppLayout from "../pages/AppLayout";
import { Dashboard } from "../pages/Dashboard";
import CreateScheduleForm from "../pages/CreateScheduleForm";
import Lesson from "../pages/Lesson";
import Profile from "../pages/Profile";
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: (
          <RouteGuard type="public">
            <AuthPage />
          </RouteGuard>
        ),
        children: [
          { index: true, element: <LoginForm /> },
          { path: "register", element: <RegisterForm /> },
        ],
      },

      {
        path: "app",
        element: (
          <RouteGuard type="private">
            <AppLayout />
          </RouteGuard>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: "/app/createForm", element: <CreateScheduleForm /> },
          {path: "/app/lesson", element: <Lesson />},
          {path: "/app/profile", element: <Profile />},
        ],
      },
    ],
  },
]);
export default router;
