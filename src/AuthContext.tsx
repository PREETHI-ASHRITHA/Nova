import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import emailjs from "emailjs-com";
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_SIGNUP, EMAILJS_TEMPLATE_RESET, EMAILJS_PUBLIC_KEY } from "./emailConfig";

const AuthContext = createContext(null);

function getLocalUser() {
  try {
    const stored = localStorage.getItem('tdesign-user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getLocalUser());

  useEffect(() => {
    if (user) localStorage.setItem('tdesign-user', JSON.stringify(user));
    else localStorage.removeItem('tdesign-user');
  }, [user]);

  const login = useCallback((email, password) => {
    const db = JSON.parse(localStorage.getItem('tdesign-users') || '[]');
    const found = db.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (found) {
      setUser({ email: found.email, name: found.name });
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const db = JSON.parse(localStorage.getItem('tdesign-users') || '[]');
    if (db.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already registered' };
    }
    db.push({ name, email, password });
    localStorage.setItem('tdesign-users', JSON.stringify(db));
    setUser({ email, name });
    // Send welcome email via EmailJS if set
    if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_SIGNUP) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_SIGNUP,
          { to_name: name, to_email: email },
          EMAILJS_PUBLIC_KEY
        );
      } catch (e) {
        // Just log error
        console.error('EmailJS signup email error:', e);
      }
    }
    return { success: true };
  }, []);

  const forgotPassword = useCallback(async (email) => {
    // Always resolve true for demo, but if keys set, send email
    if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_RESET) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_RESET,
          { to_email: email },
          EMAILJS_PUBLIC_KEY
        );
      } catch (e) {
        console.error('EmailJS reset email error:', e);
      }
    }
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, forgotPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
