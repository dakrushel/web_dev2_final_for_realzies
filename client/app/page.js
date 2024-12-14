'use client';
import { useEffect } from 'react';
import { useUser } from './components/UserContext';
import RNGesus from './components/RNGesus';

export default function Home() {
  const { user } = useUser();

    useEffect(() => {
    console.log("User state in Home:", user);
  }, [user]);
  

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-background">
      {/* Centered Dice Roller Title */}
      <header className="row-start-1 text-center">
        <h1 className="text-4xl font-bold text-white">
          {user ? `Welcome, ${user.name}` : 'Dice Roller'}
        </h1>
        <p className="text-sm text-white">
          {user ? 'Your rolls will be saved.' : 'Sign in to save your roll history.'}
        </p>
      </header>

      {/* RNGesus Component */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <RNGesus user={user} />
      </main>
    </div>
  );
}


// Update the user state from localStorage
  // const updateUserFromLocalStorage = () => {
  //   const userId = localStorage.getItem('userId');
  //   const userName = localStorage.getItem('userName');
  //   if (userId) {
  //     setUser({ id: userId, name: userName });
  //   } else {
  //     setUser(null);
  //   }
  // };

  // useEffect(() => {
  //   // Initialize user state on component mount
  //   updateUserFromLocalStorage();

  //   // Add a listener to detect localStorage changes
  //   const handleStorageChange = () => {
  //     updateUserFromLocalStorage();
  //   };

  //   window.addEventListener('storage', handleStorageChange);
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   // Check if the user is logged in
  //   const userId = localStorage.getItem('userId');
  //   const userName = localStorage.getItem('userName');
  //   if (userId) {
  //     setUser({ id: userId, name: userName });
  //   }
  // }, []);
