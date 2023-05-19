import React from 'react'
import "./Styles/register.css"
import { useState } from 'react';
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = ({ onLoginClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const createAccount = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Password doesn't match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account creation successful.')
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    } catch (err) {
      toast.error('Error occurred while trying to create an account. Please try again.')
    }

  };


  return (
    <div className="register-container">

      <h1 className='h1-register'>Register</h1>

      <form action="" className='register-form-email'>

        <input type="email" placeholder='Email' className='input-email-register' autoComplete='off' onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder='Password...' className='input-password-register' autoComplete='off' onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder='Please enter your password again.' className='input-password-register' autoComplete='off' onChange={(e) => setConfirmPassword(e.target.value)} required />

        <div className='btns-register'>
          <button className='btn-register' onClick={createAccount}>Register</button>
        </div>
      </form>

      <a onClick={onLoginClick} className='register-underline-link'> <u >Back to login</u></a>
    </div>
  )
}
