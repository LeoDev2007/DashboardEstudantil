import { createContext, useContext, useMemo, useState } from "react";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("sessionUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  async function register({ name, email, password }) {
  setLoading(true);

  try {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = users.some((u) => u.email === email);
    if (alreadyExists) {
      setLoading(false);
      return { ok: false, message: "E-mail já cadastrado", };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    
    return await login({ email, password });

  } catch {
    setLoading(false);
    return { ok: false, message: "Falha ao cadastrar" };
  }
}

  async function login({ email, password }) {
  setLoading(true);
  try {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      setLoading(false);
      return { ok: false, message: "E-mail ou senha inválidos" };
    }

    const sessionUser = {
      id: found.id,
      name: found.name,
      email: found.email
    };

    setUser(sessionUser);
    localStorage.setItem("sessionUser", JSON.stringify(sessionUser));

    return { ok: true, user: sessionUser };

  } catch {
    setLoading(false);
    return { ok: false, message: "Falha ao fazer login" };
  }
}

  function logout() {
    setUser(null);
    localStorage.removeItem("sessionUser");
  }

  function deleteAccount() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.filter(u => u.id !== user.id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    logout();
  }

  



  function editUser({ name, email }) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    const updatedUsers =  users.map(u => {
      if (u.id === user.id) {
        return { ...u, name, email };
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    const updatedUser = { ...user, name, email };
    setUser(updatedUser);
    localStorage.setItem("sessionUser", JSON.stringify(updatedUser));

    
  }


  const value = useMemo(
    () => ({ user, loading, setLoading, register, login, logout, deleteAccount, editUser, isAuthenticated: !!user }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
  
 
}
