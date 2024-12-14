'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase method
import { auth } from '../../firebase'; // Ensure this points to your Firebase config file

// Create UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Monitor Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email, // Use name or email
          email: firebaseUser.email,
        });
      } else {
        setUser(null); // No user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
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

  