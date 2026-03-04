import React from 'react'
import { CloseButton, Dialog, Portal } from "@chakra-ui/react"
import styles from '../styles/DeleteDialog.module.css'
import { useAuth } from "../Contexts/AuthContext";
import { useSchedule } from '../Contexts/ScheduleContext';
import { useNavigate } from 'react-router-dom';

const DeleteDialog = ({className, type}) => {
    const {deleteSchedule} = useSchedule();
    const {deleteAccount} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = () => {
        if(type === "schedule"){
            deleteSchedule();
            navigate("/app")
        }else if(type === "user"){
            deleteAccount();
            navigate("/")
        }
    }
  return (
    <Dialog.Root placement='center' role="alertdialog">
      <Dialog.Trigger asChild>
        <button className={className}>{type === "schedule" ? "Deletar Cronograma" : "Deletar Conta"}</button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Positioner>
          <Dialog.Content className={styles.content}>
            <Dialog.Header>
              <Dialog.Title className={styles.title}>Tem certeza?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body className={styles.body}>
              <p>
                Essa ação não poderá ser revertida. Todos os dados serão excluídos.
              </p>
            </Dialog.Body>
            <Dialog.Footer className={styles.footer}>
              <Dialog.ActionTrigger asChild>
                <button className={styles.cancelButton}>Cancelar</button>
              </Dialog.ActionTrigger>
              <button onClick={handleSubmit} className={styles.deleteButton}>Deletar</button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton className={styles.closeButton} size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DeleteDialog