'use client';
import React, { useState } from 'react';
import styles from './SignUp.module.css'; // Add a CSS module for styling
import { useUser } from '../components/UserContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase'; // Import Firebase auth instance

const SignUp = () => {
  const { setUser } = useUser();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Track success state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false); // Reset success state

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Use Firebase to create a new user
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Update Firebase user profile with the name
      await updateProfile(user, { displayName: formData.name });

      console.log('Firebase User signed up:', user);

      // Retrieve Firebase ID Token
      const idToken = await user.getIdToken();

      // Optionally send the token and user data to the backend to create a MongoDB record
      await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ name: formData.name }),
      });

      // Save user details in localStorage and context
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userName', user.displayName);
      localStorage.setItem('userEmail', user.email);

      setUser({ id: user.uid, name: user.displayName });

      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      console.error('Error during Firebase sign-up:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <div className={styles.box}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {success && (
          <p className={styles.success}>Sign-up successful! Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
