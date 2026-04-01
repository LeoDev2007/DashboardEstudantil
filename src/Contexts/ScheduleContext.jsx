import { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const ScheduleContext = createContext(null);

export function ScheduleProvider({ children }) {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem(`schedule_${user.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [statics, setStatics] = useState(() => {
    const saved = localStorage.getItem(`statics_${user.id}`);
    return saved ? JSON.parse(saved) : { totalSessions: 0, totalMinutes: 0 };
  });

  function saveStatics(minutes) {
    const updated = {
      totalSessions: statics.totalSessions + 1,
      totalMinutes: statics.totalMinutes + minutes,
    };

    setStatics(updated);
    localStorage.setItem(`statics_${user.id}`, JSON.stringify(updated));
  }

  const [conclued, setConclued] = useState(() => {
    const saved = localStorage.getItem(`conclued_${user.id}`);
    if (!saved) return [];

    const today = new Date().toISOString().split("T")[0];
    const parsed = JSON.parse(saved);

    return parsed.filter((s) => s.date === today);
  });

  function concludeSession(sessionSubject, minutes) {
    const today = new Date().toISOString().split("T")[0];
    const updated = [...conclued, { subject: sessionSubject, date: today }];
    setConclued(updated);
    localStorage.setItem(`conclued_${user.id}`, JSON.stringify(updated));
    saveStatics(minutes);
  }

  function createSchedule(subjects, days, hoursPerDay, selectedDays) {
    const totalMinutesPerDay = hoursPerDay * 60;
    const plan = [];

    let subjectIndex = 0; // começa na primeira matéria

    // percorre os dias
    for (let dayIndex = 0; dayIndex < days; dayIndex++) {
      let minutesLeft = totalMinutesPerDay;
      const daySchedule = [];

      // enquanto houver tempo no dia
      while (minutesLeft > 0) {
        const subject = subjects[subjectIndex];

        if (minutesLeft >= subject.time) {
          daySchedule.push({
            subject: subject.name,
            minutes: subject.time,
            background: subject.backgroundColor,
            titleClass: subject.titleClass,
            contentClass: subject.contentClass,
          });
          minutesLeft -= subject.time;
        } else {
          break; // se não couber, encerra o dia
        }

        // avança para próxima matéria, voltando ao início se chegar no fim
        subjectIndex = (subjectIndex + 1) % subjects.length;
      }

      plan.push({
        day: dayIndex + 1,
        sessions: daySchedule,
      });
    }

    setSchedule(plan);
    localStorage.setItem(`schedule_${user.id}`, JSON.stringify(plan));
    localStorage.setItem(`scheduleDate_${user.id}`, new Date().toISOString());
    localStorage.setItem(`studyDays_${user.id}`, JSON.stringify(selectedDays));
  }

  

  function deleteSchedule() {
    setSchedule([]);
    localStorage.removeItem(`schedule_${user.id}`);
    localStorage.removeItem(`scheduleDate_${user.id}`);
    localStorage.removeItem(`studyDays_${user.id}`);
    setConclued([]);
    localStorage.removeItem(`conclued_${user.id}`);
    setStatics({ totalSessions: 0, totalMinutes: 0 });
    localStorage.removeItem(`statics_${user.id}`);
  }

  const value = useMemo(
    () => ({
      schedule,
      createSchedule,
      concludeSession,
      conclued,
      statics,
      deleteSchedule,
    }),
    [schedule, conclued, statics],
  );

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  return useContext(ScheduleContext);
}
