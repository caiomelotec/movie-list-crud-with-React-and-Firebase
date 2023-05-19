import { Routes, Route, Navigate } from "react-router-dom"
import { PageNotFound, Home, LoginPage } from "../pages"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export const AllRoutes = () => {

  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  console.log(currentUser);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="home" element={<RequireAuth> <Home /> </RequireAuth>} />


        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}
