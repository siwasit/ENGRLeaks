'use client';

import React, { useCallback, useEffect, useState } from 'react';
import './style.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Authenticate() {
    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [error, setError] = useState('');
    const [confirmPasswordRegister, setConfirmPasswordRegister] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [accountName, setAccountName] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');

    const [previousPage, setPreviousPage] = useState('login');

    const router = useRouter();

    const selectTab = useCallback((tab: string, skipValidation = false) => {
        const loginFormElement = document.getElementById("loginFormElement") as HTMLFormElement;
        const registrationFormElement = document.getElementById("registerFormElement") as HTMLFormElement;
        const slider = document.getElementById("slider") as HTMLElement;
        const loginBtn = document.getElementById("loginBtn") as HTMLElement;
        const registerBtn = document.getElementById("registerBtn") as HTMLElement;

        if (!skipValidation) {
            console.log(`Validating form for tab: ${tab}, previousPage: ${previousPage}`);
            if (tab === 'register' && previousPage === 'register') {
          console.log('Checking validity for registration form...');
          if (!registrationFormElement.checkValidity()) {
              console.log('Registration form is invalid.');
              registrationFormElement.reportValidity();
          } else {
              console.log('Registration form is valid. Submitting...');
              (registrationFormElement.querySelector('button[type="submit"]') as HTMLButtonElement)?.click();
          }
            } else if (tab === 'login' && previousPage === 'login') {
          console.log('Checking validity for login form...');
          if (!loginFormElement.checkValidity()) {
              console.log('Login form is invalid.');
              loginFormElement.reportValidity();
          } else {
              console.log('Login form is valid. Submitting...');
              (loginFormElement.querySelector('button[type="submit"]') as HTMLButtonElement)?.click();
          }
            }
        }

        if (tab === 'register') {
            slider.style.left = '0';
            registerBtn.classList.add('active');
            loginBtn.classList.remove('active');
            loginFormElement.style.display = 'none';
            registrationFormElement.style.display = 'block';
        } else {
            slider.style.left = '50%';
            loginBtn.classList.add('active');
            registerBtn.classList.remove('active');
            loginFormElement.style.display = 'block';
            registrationFormElement.style.display = 'none';
        }
    }, [previousPage]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/token/', {
                email: emailLogin,
                password: passwordLogin,
            });

            if (res.status === 200) {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                router.push('/home'); // Redirect on success
            }
        } catch (err: any) {
            console.error('Login failed:', err.response ?? err.message);

            // Display error message based on response
            if (err.response) {
                if (err.response.status === 401) {
                    setError('Invalid email or password.');
                } else {
                    setError('An error occurred. Please try again.');
                }
            } else {
                setError('Network error. Please try again later.');
            }
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            email: emailRegister,
            account_name: accountName,
            name: name,
            surname: surname,
            role: role,
            password: passwordRegister,
            confirm_password: confirmPasswordRegister,
        };

        //* Function to check if passwords match
        if (passwordRegister !== confirmPasswordRegister) {
            e.preventDefault();
            alert('Passwords do not match. Please ensure both password fields are the same.');
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert(`${accountName} registered successfully`);
                selectTab('login', true); // Switch to login tab after successful registration
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    useEffect(() => {
        const selectedRole = document.getElementById('role') as HTMLSelectElement;

        function updateSelectColor() {
            if (selectedRole?.value === "") {
                selectedRole.classList.add('placeholder');
            } else {
                selectedRole.classList.remove('placeholder');
            }
        }

        updateSelectColor();
        selectedRole?.addEventListener('change', updateSelectColor);
        selectTab('login', true);
    }, []);

    return (
        <div>
            <div className="container">
                <div className="nebula-img-container">
                    <img
                        src="https://freenaturestock.com/wp-content/uploads/freenaturestock-1719-1024x683.jpg"
                        alt=""
                    />
                </div>
                <div className="wrapper">
                    <div className="form-wrapper">
                        <div className="loginForm">
                            <form id="loginFormElement" onSubmit={handleLogin}>
                                <h1 className='text-[2.5rem] font-bold'>ENGRLeaks</h1>
                                <div className="input-box">
                                    <input type="email" placeholder="Email" id="email" value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)} required />
                                </div>
                                <div className="input-box">
                                    <input type="password" id="password" value={passwordLogin} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordLogin(e.target.value)} placeholder="Password" required />
                                </div>
                                <br />
                                <button type="submit" style={{ display: 'none' }}></button>
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            </form>
                        </div>

                        <div className="registrationForm">
                            <form id="registerFormElement" onSubmit={handleRegister}>
                                <h1 className='text-[2.5rem] font-bold'>ENGRLeaks</h1>
                                <div className="input-box">
                                    <input type="email" value={emailRegister} onChange={(e) => setEmailRegister(e.target.value)} placeholder="Email" required />
                                </div>
                                <div className="input-box">
                                    <input type="password" value={passwordRegister} onChange={(e) => setPasswordRegister(e.target.value)} placeholder="Password" required />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPasswordRegister}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPasswordRegister(e.target.value)}
                                        placeholder="Confirm Password"
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Account name" required />
                                </div>
                                <div className="row-container">
                                    <div className="input-box">
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                                    </div>
                                    <div className="input-box" id="surname-box">
                                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" required />
                                    </div>
                                </div>
                                <div className="input-box">
                                    <select
                                        id="role"
                                        value={role}
                                        onChange={(e) => {
                                            setRole(e.target.value);
                                            const selectedRole = document.getElementById('role') as HTMLSelectElement;
                                            if (selectedRole?.value === "") {
                                                selectedRole.classList.add('placeholder');
                                            } else {
                                                selectedRole.classList.remove('placeholder');
                                            }
                                        }}
                                        name="role"
                                        required
                                        style={{ outline: '1px solid #DF7432' }}
                                    >
                                        <option value="">Role</option>
                                        <option value="student">Student</option>
                                        <option value="lecturer">Lecturer</option>
                                    </select>
                                </div>
                                <label className="tos-label">
                                    <input type="checkbox" id="tos-checkbox" required />
                                    <span className="checkmark"></span>
                                    <span className="tos-text">
                                        By checking this box, you agree to our{' '}
                                        <a href="#" target="_blank">terms of service</a>
                                    </span>
                                </label>
                                <button type="submit" style={{ display: 'none' }}></button>
                            </form>
                        </div>
                        <br />
                        <div className="toggle-btn-container">
                            <div className="slider" id="slider"></div>
                            <button 
                                className={`toggle-btn ${previousPage === 'register' ? 'active' : ''}`} 
                                onClick={() => { 
                                    setPreviousPage('register'); 
                                    selectTab('register'); 
                                }} 
                                id="registerBtn"
                            >
                                Register
                            </button>
                            <button 
                                className={`toggle-btn ${previousPage === 'login' ? 'active' : ''}`} 
                                onClick={() => { 
                                    setPreviousPage('login'); 
                                    selectTab('login'); 
                                }} 
                                id="loginBtn"
                            >
                                Login
                            </button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
