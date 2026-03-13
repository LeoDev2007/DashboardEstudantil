import React from "react";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import styles from "../styles/Dialog.module.css";

const DialogWarning = ({ open, onClose, message }) => {
  return (
    
    <Dialog.Root
      open={open}
      onOpenChange={(e) => !e.open && onClose()}
      placement="top"
    >
      <Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Positioner gap="4">
          <Dialog.Content className={styles.content} mt="4">
            <Dialog.Body className={styles.body}>
              <p>{message}</p>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton className={styles.closeButton} size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    
  );
};

export default DialogWarning;
