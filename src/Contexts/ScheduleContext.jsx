import { createContext, useContext, useMemo, useState, useEffect } from "react";

const ScheduleContext = createContext(null);

export function ScheduleProvider({ children, userId }) {

  const [schedule, setSchedule] = useState(() => {
    if (!userId) return [];
    const saved = localStorage.getItem(`schedule_${userId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [statics, setStatics] = useState(() => {
    if (!userId) return { totalSessions: 0, totalMinutes: 0 };
    const saved = localStorage.getItem(`statics_${userId}`);
    return saved ? JSON.parse(saved) : { totalSessions: 0, totalMinutes: 0 };
  });

  function saveStatics(minutes) {
    const updated = {
      totalSessions: statics.totalSessions + 1,
      totalMinutes: statics.totalMinutes + minutes,
    };

    setStatics(updated);
    localStorage.setItem(`statics_${userId}`, JSON.stringify(updated));
  }

  const [conclued, setConclued] = useState(() => {
    if (!userId) return [];
    const saved = localStorage.getItem(`conclued_${userId}`);
    if (!saved) return [];

    const today = new Date().toISOString().split("T")[0];
    const parsed = JSON.parse(saved);

    return parsed.filter((s) => s.date === today);
  });

  function concludeSession(sessionSubject, minutes) {
    const today = new Date().toISOString().split("T")[0];
    const updated = [...conclued, { subject: sessionSubject, date: today }];
    setConclued(updated);
    localStorage.setItem(`conclued_${userId}`, JSON.stringify(updated));
    saveStatics(minutes);
  }

  useEffect(() => {
    if (!userId) return;
    const saved = localStorage.getItem(`schedule_${userId}`);
    setSchedule(saved ? JSON.parse(saved) : []);

    const savedStatics = localStorage.getItem(`statics_${userId}`);
    setStatics(
      savedStatics
        ? JSON.parse(savedStatics)
        : { totalSessions: 0, totalMinutes: 0 },
    );

    const savedConclued = localStorage.getItem(`conclued_${userId}`);
    if (savedConclued) {
      const today = new Date().toISOString().split("T")[0];
      setConclued(JSON.parse(savedConclued).filter((s) => s.date === today));
    } else {
      setConclued([]);
    }
  }, [userId]);

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
    localStorage.setItem(`schedule_${userId}`, JSON.stringify(plan));
    localStorage.setItem(`scheduleDate_${userId}`, new Date().toISOString());
    localStorage.setItem(`studyDays_${userId}`, JSON.stringify(selectedDays));
  }

  function deleteSchedule() {
    setSchedule([]);
    localStorage.removeItem(`schedule_${userId}`);
    localStorage.removeItem(`scheduleDate_${userId}`);
    localStorage.removeItem(`studyDays_${userId}`);
    setConclued([]);
    localStorage.removeItem(`conclued_${userId}`);
    setStatics({ totalSessions: 0, totalMinutes: 0 });
    localStorage.removeItem(`statics_${userId}`);
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
