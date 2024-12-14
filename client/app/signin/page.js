'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import styles from './SignIn.module.css'; // Add a CSS module for styling

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize router

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('trying to post from /signin/page')
      console.log('Form data being sent: ', formData)
      const res = await fetch('http://localhost:5000/api/signin', { // Ensure the correct endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('Fetch response: ', res)

      if (!res.ok) {
        const data = await res.json().catch(() => {
          throw new Error('Invalid server response. Please try again.');
        });
        throw new Error(data.error || 'Sign-in failed');
      }

      const data = await res.json();
      console.log('Signed in successfully:', data);

      // Save userId in localStorage
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userEmail', data.user.email);
      
      alert('Signed In');
      router.push('/'); // Redirect to the home page
    } catch (err) {
      console.error('Error during sign-in:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <div className={styles.box}>
        <form onSubmit={handleSubmit} className={styles.form}>
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
            Sign In
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;