import React from "react";
import { useSchedule } from "../Contexts/ScheduleContext";
import styles from "../styles/DashboardStatics.module.css";

const DashboardStatics = () => {
  const { statics, schedule } = useSchedule();
  console.log(schedule);

  const hours = Math.floor(statics.totalMinutes / 60);
  const minutes = statics.totalMinutes % 60;
  return (
    schedule.length === 0 ? (
      <h2 className={styles.noSchedule}>Nenhum cronograma criado ainda.</h2>
    ) : (
      <div className={styles.staticsCard}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Estatísticas</h1>
        </div>
        <div className={styles.content}>
          <p>Total de sessões concluídas: {statics.totalSessions}</p>
          <p>
            Total de tempo estudado: {hours} horas e {minutes} minutos
          </p>
        </div>
      </div>
    </div>
    )
    
  );
};

export default DashboardStatics;
