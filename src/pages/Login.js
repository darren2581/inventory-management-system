import React, { useState } from 'react';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/Authentication.css';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Use navigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login Successfully');
            navigate('/dashboard'); // Redirect to dashboard page after successful login
        } catch (error) {
            console.log('Error:', error.message);
        }
    }

    return (
        <div className="box-container">
            <div className='auth-container'>
                <form className='auth-form' onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <label>
                        Email
                        <input type='email' name='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Password
                        <input type='password' name='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type='submit'>Log In</button>
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
