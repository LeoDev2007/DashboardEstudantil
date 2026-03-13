import React from "react";
import { useState } from "react";
import { Drawer, Portal } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import styles from "../styles/Drawer.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Drawner = () => {
  const [open, setOpen] = useState(false);

  const {logout} = useAuth()

  const navigate = useNavigate();

  const handleBack = () => {
    logout();
    navigate("/");
  };

  const returnToDashboard = () => {
    navigate("/app");
  }

  const intoProfile = () => {
    navigate("/app/profile");
  }

  return (
    <div>
      {/* Drawner */}
      <Drawer.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement="start"
      >
        <Drawer.Trigger asChild>
          <button className={styles.openBtn}>
            <FaBars size={30} color="#fff" />
          </button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner padding="4">
            <Drawer.Content rounded="md">
              <Drawer.Header>
                <Drawer.CloseTrigger asChild>
                  <button className={styles.closeBtn}>
                    <FaArrowLeft size={20} />
                  </button>
                </Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body>
                <nav className={styles.navButtons}>
                  <button className={styles.defaultButton} onClick={returnToDashboard}>Inicio</button>
                  <button className={styles.defaultButton} onClick={intoProfile}>Perfil</button>
                  <button onClick={handleBack} className={styles.logoutButton}>Sair</button>
                </nav>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </div>
  );
};

export default Drawner;
