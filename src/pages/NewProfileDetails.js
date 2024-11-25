import React, { useState } from 'react';
import { auth, db } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/NewProfileDetails.css';

const NewProfileDetails = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate(); // Add navigation hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;
            if (user) {
                // Save profile information to Firestore under the current user's uid
                await setDoc(doc(db, 'users', user.uid), {
                    fullName,
                    username,
                    gender,
                    address,
                }, { merge: true });

                console.log('Profile Information Saved');
                navigate('/dashboard'); // Redirect to dashboard page
            } else {
                console.log('No user is signed in');
            }
        } catch (error) {
            console.error('Error saving profile information:', error);
        }
    };

    return (
        <div className="signup-container">
            <form className="profile-form" onSubmit={handleSubmit}>
                <h1>Profile Information</h1>

                <label>
                    Full Name
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </label>

                <label>
                    Username
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <label>
                    Gender
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </label>

                <label>
                    Address
                    <textarea
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>

                <button type="submit">Save Profile</button>
            </form>
        </div>
    )
}

export default NewProfileDetails