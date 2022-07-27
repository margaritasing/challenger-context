import React from 'react'
import { Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import swal from 'sweetalert'
import axios from 'axios';

const Detalle = () => {

    const [movie, setMovie] = useState(null)
    let token  = sessionStorage.getItem('token');

    let query = new URLSearchParams(window.location.search);
    let movieID= query.get('movieID')


    useEffect(() => {       
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=75b9f04bb9ba776a3e2318bbe7838f21&language=es-ES`
        axios.get(endPoint).then(response =>{
            const movieData = response.data;
            setMovie(movieData)
        })
        .catch(error =>{
            swal("Error", "Hubo un error", "error")
        })
      
        }, [movieID])
    

  return (
    <div className="row text-white">
    {!token && <Navigate replace to="/" />}
    {!movie && <h2>Cargando</h2>}
    { movie &&
        <>
        <h2>{movie.title} </h2>
        <div className="col-4">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movie poster"/>
        </div>
        <div className="col-8">             
             <h5>Fecha de estreno: {movie.release_date} </h5>
             <h5>Reseña: </h5>
             <p>{movie.overview}</p>
             <h5>Rating: {movie.vote_average} </h5>
             <h5> Votos Totales: {movie.vote_count}</h5>
             <h5>Generos: </h5>
                <ul>
                   {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}               
                </ul>
        </div>
        </>    
        }    
    </div>
  )
}

export default Detalle