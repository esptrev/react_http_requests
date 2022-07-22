import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    /* FETCHING FROM API CAN BE  JUST LIKE JAVASCRIPT--- OR WE CAN USE AXIOS---NEED TO LOOK UP*/

    // function fetchMoviesHandler(){
    //    fetch('https://swapi.dev/api/films/')
    //       .then(res => {
    //           return res.json()
    //       }).then(data => {
    //           const transformedMovies = data.results.map(movieData => {
    //               return {
    //                   id : movieData.episode_id,
    //                   title : movieData.title,
    //                   openingText : movieData.opening_crawl,
    //                   releaseDate : movieData.release_date
    //               };
    //           });
    //            setMovies(transformedMovies);
    //   });
    // }

    async function fetchMoviesHandler() {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('https://swapi.dev/api/films/')

            if(!res.ok){
                throw new Error('Oops...Something went wrong!');
            }
            const data = await res.json();
            const transformedMovies = data.results.map(movieData => {
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date
                };
            });
            setMovies(transformedMovies);
        } catch (error){
            setError(error.message);
        }
        setIsLoading(false);
    }

    let content = <p>Trying to connect.....</p>;
    if(movies.length > 0){
        content = <MoviesList movies={movies}/>;
    }
    if(error){
        content = <p>{error}</p>
    }
    if(isLoading){
        content = <p>LOADING........ </p>;
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>{content}</section>
        </React.Fragment>
    );
}

export default App;
