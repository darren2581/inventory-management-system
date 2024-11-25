import React from 'react';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Authentication.css';

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth); // Perform sign out
            console.log('Successfully signed out');
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            console.log('Error signing out:', error.message);
        }
    };

    return (
        <div className='box-container'>
            <div className="auth-container">
                <div className="auth-form">
                    <h1>Sign Out</h1>
                    <p>Are you sure you want to sign out?</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </div>
    );
};

export default SignOut;
