import "./Styles/login.css"
import { BsGoogle } from "react-icons/bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";

export const Login = ({ onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext)

  const loginIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch({ type: "LOGIN", payload: user });
      navigate("/home")
    } catch (err) {
      toast.error("Password or email is incorrect, or the account doesn't exist.")
    }
  }

  const loginWithGoogle = async (e) => {
    //e.preventDefault();

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      dispatch({ type: "LOGIN", payload: user });
      navigate("/home")
    } catch (err) {
      toast.error("Some error occurred while trying to log in with Google. Please try again or contact Google support for assistance.")
    }
  }

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <form action="" className='form-email'>
        <input type="email" placeholder='Email' className='input-email' autoComplete='off' onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder='Password...' className='input-password' autoComplete='off' onChange={(e) => setPassword(e.target.value)} required />
      </form>
      <div className='btns'>
        <button className='btn-login' onClick={loginIn}>Login</button>
        <button className="google-btn" onClick={loginWithGoogle}>
          Login with Google<BsGoogle className='icon-googles' />
        </button>

      </div>
      <p>Don't have an account?</p>
      <span onClick={onRegisterClick} className='underline-link'> <u>Create an Account</u></span>
    </div>
  )
}