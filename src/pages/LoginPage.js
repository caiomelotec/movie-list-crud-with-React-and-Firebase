import { Login } from '../components'
import { Register } from '../components'
import "./Styles/loginpage.css"
import { useState } from 'react'


export const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false);

  const handleCreateAccountClick = () => {
    setShowRegister(!showRegister);
  }

  return (
    <>
      <div className='img-container'>
      </div>
      {showRegister ? <Register onLoginClick={handleCreateAccountClick} /> : <Login onRegisterClick={handleCreateAccountClick} />}
    </>
  )
}
