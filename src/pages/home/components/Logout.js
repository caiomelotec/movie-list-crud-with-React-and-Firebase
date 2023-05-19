import { signOut } from "firebase/auth";
import "./styles/logout.css"
import { TbLogout } from "react-icons/tb";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export const Logout = () => {

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext)

  const logOut = async () => {
    try {
      await signOut(auth)

      dispatch({ type: "LOGOUT", payload: null });
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='logout'>
      <button className="logout-button" onClick={logOut}>Logout</button>
      <TbLogout className="logout-icon" />
    </div>
  )
}
