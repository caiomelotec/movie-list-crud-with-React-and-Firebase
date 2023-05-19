import "./styles/createmovie.css"
import { useState } from "react"
import { addDoc } from "firebase/firestore";
import { moviesCollRef } from "./MovieList"
import { auth } from "../../../config/firebase";


export const CreateMovie = () => {
  // New Movies States
  const [movieTitle, setMovieTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [hasOscar, setHasOscar] = useState(false);

  const onSubmit = async () => {

    try {
      await addDoc(moviesCollRef, {
        title: movieTitle,
        releaseDate: releaseDate,
        hasAnOscar: hasOscar,
        userId: auth.currentUser.uid
      });
      window.location.reload();
    } catch (err) {
      console.error(err)
    }
  }

  return (

    <div className="container-ct">
      <form>
        <input className="movie-title-input" type="text" placeholder='Movie title...' onChange={(e) => setMovieTitle(e.target.value)} required />

        <div className="div-checkbox">
          <label className="label-checkbox">Received an Oscar ?</label>
          <input className="checkbox" checked={hasOscar} type="checkbox" onChange={(e) => setHasOscar(e.target.checked)} />
        </div>

        <input className="release-date-ipt" type="number" placeholder="Release Date" onChange={(e) => setReleaseDate(Number(e.target.value))} required />

      </form>
      <button className="submit-movie-btn" onClick={onSubmit}>Submit Movie</button>
    </div>

  )
}
