
import { useAuth } from "./Contexts/AuthContext";
import { ScheduleProvider } from "./Contexts/ScheduleContext";

export function AppWithSchedule({ children }) {
  const { user } = useAuth();
  
  return <ScheduleProvider userId={user?.id}>{children}</ScheduleProvider>;
}