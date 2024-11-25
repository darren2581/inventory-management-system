import React, { useState } from 'react';
import { auth, db } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import '../styles/Authentication.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create a new user document in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
            });

            console.log('Account Created');
            navigate('/newProfileDetails');
        } catch (error) {
            console.log('Error', error.message);
        }
    };

    return (
        <div className='box-container'>
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">Sign Up</button>
                    <p>
                        Already Registered? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
