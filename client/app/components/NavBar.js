'use client';
import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import { useRouter } from 'next/navigation';
import { useUser } from './UserContext';
// import Link from 'next/link';

const NavBar = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
  console.log('Current user:', user);
}, [user]);

  const handleHome = () => {  
    router.push('/'); // Navigate to the home page
    };

  const handleSignUp = () => {
    router.push('/signup'); // Navigate to the signup page
  };

  const handleSignIn = () => {
    router.push('/signin'); // Navigate to the sign-in page
  };

  useEffect(() => {
    console.log('Current user:', user);
  }, [user]);

  const handleSignOut = () => {
    //Clear user data from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    setUser(null);   //Update state to reflect sign-out
    router.push('/');
  };
  
  return (
    <div className={styles.navbar}>

        {/*sign in and sign up buttons*/}
        <ul className={styles.navLinks}>
        {user ? (
          <li>
            <button className={styles.navButton} onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
          ) : (
          <>
            <li>
              <button className={styles.navButton} onClick={handleSignIn}>
                Sign In
              </button>
            </li>
            <li>
              <button className={styles.navButton} onClick={handleSignUp}>
                Sign Up
              </button>
            </li>
          </>
          )}
        </ul>

        {/*pressable logo*/}
      <div className={styles.logo}>
        <button onClick={handleHome}>
        <h1>RNGesus</h1>
        </button>
      </div>
    </div>
  );
};

export default NavBar;


  // // Also pdate the user state from localStorage
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
  //   const userId = localStorage.getItem('userId');
  //   const userName = localStorage.getItem('userName');
  //   if (userId) {
  //     setUser({ id: userId, name: userName });
  //   } else {
  //     setUser(null);
  //   }
  // }, []);

  // useEffect(() => {
  //   updateUserFromLocalStorage();

  //   // Listen for changes in localStorage (e.g., from another tab or Home component)
  //   const handleStorageChange = () => {
  //     updateUserFromLocalStorage();
  //   };

  //   window.addEventListener('storage', handleStorageChange);
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);
