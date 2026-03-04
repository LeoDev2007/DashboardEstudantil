import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "../styles/AuthPage.module.css";

const AuthPage = () => {
  return (
    <div className={styles.main}>
      <h2>Boas vindas Estudante</h2>

      <div className={styles.container}>
        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Cadastro
          </NavLink>
        </nav>

        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AuthPage;
