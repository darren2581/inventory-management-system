import React, { useState } from 'react';
import { auth } from '../Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import '../styles/Authentication.css';
import { Link } from 'react-router-dom';

export const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(''); // State to store error messages
    const [successMessage, setSuccessMessage] = useState(''); // State to store success message

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error messages
        setSuccessMessage(''); // Clear previous success messages

        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage('Password reset email sent successfully! Please check your inbox.');
        } catch (error) {
            console.log('Error:', error.message);
            handleFirebaseError(error.code); // Handle specific error codes
        }
    };

    const handleFirebaseError = (code) => {
        switch (code) {
            case 'auth/user-not-found':
                setError('No user found with this email address.');
                break;
            case 'auth/invalid-email':
                setError('Invalid email format.');
                break;
            default:
                setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="box-container">
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h1>Reset Password</h1>
                    {error && <p className="error-message">{error}</p>} {/* Display error messages */}
                    {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <button type="submit">Send Reset Email</button>

                    <p>
                        Remembered your password? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
