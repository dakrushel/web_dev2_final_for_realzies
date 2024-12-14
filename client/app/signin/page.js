'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import styles from './SignIn.module.css'; // Add a CSS module for styling
import { useUser } from '../components/UserContext'; // Adjust the path if needed
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase function
import { auth } from '../../firebase'; // Import Firebase auth instance


const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize router
  const { setUser } = useUser(); // Get setUser from the UserContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Signing in with Firebase:', formData.email);
      
      // Use Firebase to sign in
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      console.log('Firebase User signed in:', user);

      // Retrieve Firebase ID Token
      const idToken = await user.getIdToken();

      // Optionally send the token to your backend for secure operations
      console.log('Firebase ID Token:', idToken);

      // Save user details in localStorage and context
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userName', user.displayName || 'Guest');
      localStorage.setItem('userEmail', user.email);

      setUser({ id: user.uid, name: user.displayName || 'Guest' });

      alert('Signed In Successfully');
      router.push('/'); // Redirect to the home page
    } catch (err) {
      console.error('Error during Firebase sign-in:', err.message);
      setError(err.message);
    }
  };

  //     console.log('trying to post from /signin/page')
  //     console.log('Form data being sent: ', formData)
  //     const res = await fetch('http://localhost:5000/api/signin', { // Ensure the correct endpoint
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     });

  //     console.log('Fetch response: ', res)
  //     console.log('Response status:', res.status); //debugging added by Gabby
  //     console.log('Response headers:', res.headers.get('content-type')); //debugging added by Gabby 

  //     if (!res.ok) {
  //       const data = await res.json().catch(() => {
  //         throw new Error('Invalid server response. Please try again.');
  //       });
  //       throw new Error(data.error || 'Sign-in failed');
  //     }

  //     const data = await res.json();
  //     console.log('Signed in successfully:', data);

  //     // Save userId in localStorage
  //     localStorage.setItem('userId', data.user.id);
  //     localStorage.setItem('userName', data.user.name);
  //     localStorage.setItem('userEmail', data.user.email);

  //     setUser({ id: data.user.id, name: data.user.name }); 
      
  //     alert('Signed In');
  //     router.push('/'); // Redirect to the home page
  //   } catch (err) {
  //     console.error('Error during sign-in:', err.message);
  //     setError(err.message);
  //   }
  // };

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