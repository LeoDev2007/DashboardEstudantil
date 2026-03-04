import React from "react";
import styles from "../styles/Lesson.module.css";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {dataSubjects} from "../data/DataSubjects.jsx";
import { useNavigate } from "react-router-dom"
import { useSchedule } from "../Contexts/ScheduleContext";

const Lesson = () => {
  // Renderização da aula, com título, conteúdo e botão para marcar como concluída
  const { concludeSession } = useSchedule();

  const { state } = useLocation();
  const session = state?.session;
  const navigate = useNavigate();

  const subject = dataSubjects.find((s) => s.name === session?.subject);

  const markConcluded = () => {
    concludeSession(session.subject, session.minutes);
    navigate("/app");
  };

 console.log(session.content);
  return (
    <div className={styles.lessonContainer}>
      <div className={styles.lessonTitle}>
        <h1>{subject ? subject.titleClass : "Nenhuma aula disponível hoje"}</h1>
      </div>
      <div className={styles.lessonContent}>
        {subject ? (
          <ReactMarkdown>{subject.content}</ReactMarkdown>
        ) : (
          <p>Descanse hoje! Volte amanhã para mais uma aula.</p>
        )}
      </div>
      <div >
        <button className={styles.lessonButton} onClick={() => markConcluded()}>
          Marcar como concluída
        </button>
      </div>
    </div>
  );
};

export default Lesson;
