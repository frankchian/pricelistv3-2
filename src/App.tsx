import React, { useCallback, useEffect, useState, useRef } from 'react';
import { PriceList } from './pages/PriceList';
import { Login } from './pages/Login';
import { useLocalStorage } from './hooks/useLocalStorage';
const SESSION_KEY = 'app_session';
const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour in ms
function getSession(): {
  loggedIn: boolean;
  lastActive: number;
} | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function setSession(loggedIn: boolean) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      loggedIn,
      lastActive: Date.now()
    })
  );
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
function isSessionValid(): boolean {
  const session = getSession();
  if (!session || !session.loggedIn) return false;
  return Date.now() - session.lastActive < SESSION_TIMEOUT;
}
export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => isSessionValid());
  const [password, setPassword] = useLocalStorage('app_password', 'Admin');
  const loggingOut = useRef(false);
  const handleLogout = useCallback(() => {
    loggingOut.current = true;
    clearSession();
    setIsLoggedIn(false);
    // Reset flag after a tick so future clicks don't re-set session
    setTimeout(() => {
      loggingOut.current = false;
    }, 100);
  }, []);
  const handleLogin = useCallback(() => {
    setSession(true);
    setIsLoggedIn(true);
  }, []);
  // Update lastActive on user interaction
  useEffect(() => {
    if (!isLoggedIn) return;
    const updateActivity = () => {
      // Don't update session if we're in the process of logging out
      if (loggingOut.current) return;
      if (!isSessionValid()) return;
      setSession(true);
    };
    window.addEventListener('click', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('scroll', updateActivity);
    const interval = setInterval(() => {
      if (!isSessionValid()) {
        handleLogout();
      }
    }, 60 * 1000);
    return () => {
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('scroll', updateActivity);
      clearInterval(interval);
    };
  }, [isLoggedIn, handleLogout]);
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} correctPassword={password} />;
  }
  return (
    <PriceList
      onLogout={handleLogout}
      onChangePassword={(newPassword) => {
        setPassword(newPassword);
        alert('Password changed successfully!');
      }} />);


}