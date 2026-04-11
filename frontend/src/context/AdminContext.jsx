import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('admin_logged_in') === 'true';
  });

  // Hardcoded admin credentials (change as needed)
  const ADMIN_EMAIL = "admin@siyathemba.gov.za";
  const ADMIN_PASSWORD = "admin123";

  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_logged_in', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_logged_in');
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}