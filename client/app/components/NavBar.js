'use client';
import React from 'react';
import styles from './NavBar.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NavBar = () => {
  const router = useRouter();

  const handleHome = () => {  
    router.push('/'); // Navigate to the home page
    };

  const handleSignIn = () => {
    router.push('/signin'); // Navigate to the sign-in page
  };

  const handleSignUp = () => {
    router.push('/signup'); // Navigate to the signup page
  };
  
  return (
    <div className={styles.navbar}>

        {/*sign in and sign up buttons*/}
        <ul className={styles.navLinks}>
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
