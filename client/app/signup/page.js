'use client';
import React, { useState } from 'react';
import styles from './SignUp.module.css'; // Add a CSS module for styling

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
  
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      // Check Content-Type
      const contentType = res.headers.get('Content-Type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Invalid server response: Expected JSON');
      }
  
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Sign-up failed');
      }
  
      localStorage.setItem('userId', data.user._id);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      // console.error('Error:', err.message);
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