import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'

export default function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [passType, setPassType] = useState('password');
    const [isResponseEmpty, setIsResponseEmpty] = useState(false);
    const [isPassCpassMatch, setIsPassCpassMatch] = useState(false);

    const handleEmail = (event) => {
        if (event.target.value === '') {
            setIsEmailEmpty(true);
            setEmail(event.target.value);
        }
        else {
            setIsEmailEmpty(false);
            setEmail(event.target.value);
        }
    }
    const handlePassword = (event) => {
        if (event.target.value === '') {
            setIsPasswordEmpty(true);
            setPassword(event.target.value);
        }
        else {
            setIsPasswordEmpty(false);
            setPassword(event.target.value);
        }
    }
    const handleConfirmPassword = (event) => {
        if (event.target.value === '') {
            setIsConfirmPasswordEmpty(true);
            setConfirmPassword(event.target.value);
        }
        else if (event.target.value !== '' && password === '') {
            setIsPasswordEmpty(true);
            setIsPassCpassMatch(true);
            setIsConfirmPasswordEmpty(false);
            setConfirmPassword(event.target.value);
        }
        else if (event.target.value !== password) {
            setIsPassCpassMatch(true);
            setIsConfirmPasswordEmpty(false);
            setConfirmPassword(event.target.value);
        }
        else {
            setIsPassCpassMatch(false);
            setIsConfirmPasswordEmpty(false);
            setConfirmPassword(event.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        setIsLoading(true);
        setIsResponseEmpty(false);

        if (password === confirmPassword) {
            setIsPassCpassMatch(false);
        }
        else {
            setIsPassCpassMatch(true);
            setIsLoading(false);
        }

        if (email === '' && password === '' && confirmPassword !== '') {
            setIsEmailEmpty(true);
            setIsPasswordEmpty(true);
            setIsConfirmPasswordEmpty(false);
            setIsLoading(false);
        }
        else if (email === '' && password !== '' && confirmPassword === '') {
            setIsEmailEmpty(true);
            setIsPasswordEmpty(false);
            setIsConfirmPasswordEmpty(true);
            setIsLoading(false);
        }
        else if (email !== '' && password === '' && confirmPassword === '') {
            setIsEmailEmpty(false);
            setIsPasswordEmpty(true);
            setIsConfirmPasswordEmpty(true);
            setIsLoading(false);
        }
        else if (email !== '' && password !== '' && confirmPassword === '') {
            setIsEmailEmpty(false);
            setIsPasswordEmpty(false);
            setIsConfirmPasswordEmpty(true);
            setIsLoading(false);
        }
        else if (email !== '' && password === '' && confirmPassword !== '') {
            setIsEmailEmpty(false);
            setIsPasswordEmpty(true);
            setIsConfirmPasswordEmpty(false);
            setIsLoading(false);
        }
        else if (email === '' && password !== '' && confirmPassword !== '') {
            setIsEmailEmpty(true);
            setIsPasswordEmpty(false);
            setIsConfirmPasswordEmpty(false);
            setIsLoading(false);
        }
        else if (email === '' && password === '' && confirmPassword === '') {
            setIsEmailEmpty(true);
            setIsPasswordEmpty(true);
            setIsConfirmPasswordEmpty(true);
            setIsLoading(false);
        }
        else {
            if (password === confirmPassword) {
                setIsEmailEmpty(false);
                setIsPasswordEmpty(false);
                setIsConfirmPasswordEmpty(false);

                setIsResponseEmpty(false);
                await axios.post('http://localhost:3001/register', userData).then((res) => {
                    setIsLoading(false);
                    setIsResponseEmpty(true);
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setTimeout(() => {
                        setIsResponseEmpty(false);
                    }, 5000);
                }).catch((err) => {
                    alert("Error: ", err.message);
                });
            }
            else{
                setIsPassCpassMatch(true);
            }
        }
    };

    const handleCheck = (event) => {
        setIsChecked(event.target.checked);
        if (isChecked) {
            setPassType('password');
        }
        else {
            setPassType('text');
        }
    }

    // const validateEmail = () => {
    //     if(email === ''){
    //         setIsEmailEmpty(true);
    //     }
    //     else{
    //         setIsEmailEmpty(false);
    //     }
    // }

    return (
        <>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label className="font-catamaran email">Enter Your Email:</label> <br />
                <input className="font-catamaran input" placeholder="Enter your email" value={email} onChange={handleEmail} type="text" name="email" /> <br />
                {isEmailEmpty && <p className="error-message">Enter your email-id</p>}

                <label className="font-catamaran">Set Password:</label> <br />
                <input className="font-catamaran input" placeholder="Set the password" value={password} onChange={handlePassword} type={passType} name="password" /><br />
                {isPasswordEmpty && <p className="error-message">Set your password</p>}

                <label className="font-catamaran">Confirm Password:</label> <br />
                <input className="font-catamaran input" placeholder="Confirm password" value={confirmPassword} onChange={handleConfirmPassword} type={passType} name="confirm-password" /><br />
                {isConfirmPasswordEmpty && <p className="error-message">Enter confirm password</p>}
                {isPassCpassMatch && <p className="error-message">Password and Confirm Password should be same</p>}

                <input className="font-catamaran checkbox" onChange={handleCheck} type="checkbox" name="showPassword" />
                <label className="font-catamaran password">Show Password</label><br />

                <button className="font-catamaran btn" type="submit">{isLoading ? <div className="loading"></div> : "Sign Up"}</button>
                {isResponseEmpty && <p className="reg-message">User Registered Successfully</p>}
            </form>
        </>
    )
}
