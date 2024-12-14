'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const updateUserFromLocalStorage = () => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    // const userEmail = localStorage.getItem('userEmail');

    if (userId) {
      setUser({ id: userId, name: userName});
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

  

  // useEffect(() => {
  //   // Initialize user state on mount
  //   const storedUserId = localStorage.getItem('userId');
  //   const storedUserName = localStorage.getItem('userName');
  //   const storedUserEmail = localStorage.getItem('userEmail');

  //   if (storedUserId && storedUserName) {
  //     setUser({ id: storedUserId, name: storedUserName, email: storedUserEmail });
  //   } else {
  //     setUser(null);
  //   }
  // }, []);

  // Update the user state from localStorage

   // Listen for storage changes to update user state
//    useEffect(() => {
//     const handleStorageChange = () => {
//       const storedUserId = localStorage.getItem('userId');
//       const storedUserName = localStorage.getItem('userName');
//       const storedUserEmail = localStorage.getItem('userEmail');

//       if (storedUserId && storedUserName) {
//         setUser({ id: storedUserId, name: storedUserName, email: storedUserEmail });
//       } else {
//         setUser(null);
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

  