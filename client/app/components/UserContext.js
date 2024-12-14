'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Update the user state from localStorage
  const updateUserFromLocalStorage = () => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    if (userId) {
      setUser({ id: userId, name: userName });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // Initialize user state on mount
    updateUserFromLocalStorage();

    // Listen for changes to localStorage
    const handleStorageChange = () => {
      updateUserFromLocalStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
