import { useEffect, useState } from "react";
import "./styles/movielist.css"
import OscarIcon from "./svg/oscar.png"
import { db } from "../../../config/firebase";
import { getDocs, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

export const moviesCollRef = collection(db, "movies");

export const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  // New state variable to track the edited movie ID
  const [editedMovieId, setEditedMovieId] = useState(null);
  //movie title state
  const [updateMovieTitle, setUpdateMovieTitle] = useState("");


  const fetchMovieList = async () => {
    try {
      //read the data
      // set the movie list
      const data = await getDocs(moviesCollRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setMovieList(filterData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  const deleteMovie = async (id) => {


    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    fetchMovieList();
  };

  const updateTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {
      title: updateMovieTitle
    });

    fetchMovieList();
    setEditedMovieId(null); // Reset edited movie ID after update
  };


  /*
      editedMovieId state variable, which keeps track of the currently edited movie's ID. When rendering the movie list,
      I check if the editedMovieId matches the current movie's ID. If they match,
      I display the input field and update button for editing the movie title.
      */
  return (
    <>
      {movieList.map(movie => (
        <div key={movie.id}>
          {editedMovieId === movie.id ? (
            <div className="input-new-title-div">
              <input
                className="input-new-title-field"
                placeholder="New Title..."
                id="inputNewTitleId"
                onChange={(e) => setUpdateMovieTitle(e.target.value)}
              />
              <button className="edit" onClick={() => updateTitle(movie.id)}>
                Update
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}

      {movieList.map((movie) => (
        <div className="movie" key={movie.id}>


          <div className="movie-details">
            <h3 className="movie-title">Title: {movie.title}</h3>
            <p className="release-date">Release Date: {movie.releaseDate}</p>
          </div>

          <div className="icons-btns">
            <div className="oscar-ctn">
              {movie.hasAnOscar ? (
                <img className="icon-oscar" src={OscarIcon} alt="" />
              ) : (
                ""
              )}
            </div>
            <div className="btns-remove-edit">
              <button className="remove" onClick={() => deleteMovie(movie.id)}>
                Delete
              </button>
              <button
                className="edit"
                onClick={() => setEditedMovieId(movie.id)}
              >
                Edit Title
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
