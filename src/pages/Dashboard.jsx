import React, { useMemo } from "react";
import { useAuth } from "../Contexts/AuthContext";
import styles from "../styles/Dashboard.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSchedule } from "../Contexts/ScheduleContext";
import { Card } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import DashboardStatics from "../components/DashboardStatics";
import DeleteDialog from "../components/DeleteDialog";

export const Dashboard = () => {
  const [remainingDays, setRemainingDays] = useState(null);
  const { schedule, conclued } = useSchedule();

  const dayNames = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const todayName = dayNames[new Date().getDay()];

  const todaySchedule = useMemo(() => {
    const startDate = localStorage.getItem("scheduleDate");
    const studyDays = JSON.parse(localStorage.getItem("studyDays") || "[]");
    if (!startDate || schedule.length === 0) return null;

    if (!studyDays.includes(todayName)) {
      return null;
    }

    const start = new Date(startDate);
    const scheduleToday = new Date();

    start.setHours(0, 0, 0, 0);
    scheduleToday.setHours(0, 0, 0, 0);

    let studyDayCount = 0;
    const cursor = new Date(start);

    while (cursor <= scheduleToday) {
      const cursorDayName = dayNames[cursor.getDay()];
      if (studyDays.includes(cursorDayName)) {
        studyDayCount++;
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    const dayIndex = studyDayCount % schedule.length;
    return schedule[dayIndex];
  }, [schedule]);

  useEffect(() => {
    const today = new Date();
    const enemDate = new Date("2026-11-08");

    today.setHours(0, 0, 0);
    enemDate.setHours(0, 0, 0);

    const differenceDays = enemDate - today;
    const days = Math.ceil(differenceDays / (1000 * 60 * 60 * 24));
    setRemainingDays(days);
  }, []);

  const remainingSessions = todaySchedule?.sessions.filter(
    (session) => !conclued.some((c) => c.subject === session.subject),
  );

  const navigate = useNavigate();
  const { user } = useAuth();

  const totalSessions = todaySchedule?.sessions.length || 0;
  const concluedToday = conclued.filter((c) =>
    todaySchedule?.sessions.some((s) => s.subject === c.subject),
  ).length;

  const progress =
    totalSessions > 0 ? Math.round((concluedToday / totalSessions) * 100) : 0;
  return (
    <>
      <div className={styles.dashboardHeader}>
        <div className={styles.dashboardTitle}>
          <h2>Boas vindas, {user.name}!</h2>
        </div>

        <div className={styles.dashboardSubtitle}>
          {remainingDays > 0 ? (
            <span>Faltam {remainingDays} dias para o ENEM 2026</span>
          ) : (
            <span>O ENEM já foi realizado!</span>
          )}
        </div>
      </div>

      {schedule.length === 0 ? (
        <div className={styles.dashboardMiddle}>
          <button
            className={styles.btn}
            onClick={() => navigate("/app/createForm")}
          >
            Criar Cronograma
          </button>
          <DashboardStatics />
        </div>
      ) : (
        <>
          <div style={{ padding: "10px 20px", display: "flex", gap: "20px" }}>
            <h3>Estudos de hoje - {todayName}</h3>

            {schedule.length > 0 && (
              <DeleteDialog type="schedule" className={styles.btn} />
            )}
          </div>

          <div className={styles.dashboardContainer}>
            {!remainingSessions || remainingSessions.length === 0 ? (
              <p>Parabéns! Você concluiu todas as sessões de hoje.</p>
            ) : (
              <Card.Root className={styles.dashboardCard}>
                <h3>Cronograma</h3>
                {todaySchedule?.sessions
                  .filter(
                    (session) =>
                      !conclued.some((c) => c.subject === session.subject),
                  )
                  .map((session, index) => (
                    <Card.Body
                      key={index}
                      className={styles.session}
                      style={{ backgroundColor: session.background }}
                    >
                      <NavLink
                        to={`/app/lesson`}
                        state={{ session }}
                        className={session.titleClass}
                      >
                        <h4>{session.subject}</h4>
                        <p>{session.minutes} minutos</p>
                      </NavLink>
                    </Card.Body>
                  ))}
              </Card.Root>
            )}

            <div>
              <DashboardStatics />
            </div>
          </div>

          <div className={styles.progressContainer}>
            <p>{progress}% concluído</p>
            <progress
              value={progress}
              max={100}
              className={styles.progressBar}
            />
          </div>
        </>
      )}
    </>
  );
};
