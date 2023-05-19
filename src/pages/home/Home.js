import { Logout } from "./components/Logout"
import { CreateTitle } from "./components/CreateTitle"
import { CreateMovie } from "./components/CreateMovie"
import { MovieList } from "./components/MovieList"
import { useState } from "react"

export const Home = () => {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!show)
  }
  return (
    <>
      <Logout />
      {show ? <CreateMovie /> : <CreateTitle handleToggle={handleToggle} />}
      <MovieList />
    </>
  )
}
