import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import swal from 'sweetalert';




const Resultados = (props) => {
 
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');
   

    const[moviesResult, setMovieResult] = useState([]);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=75b9f04bb9ba776a3e2318bbe7838f21&language=es-ES&include_adult=false&query=${keyword}`
        axios.get(endPoint).then(response =>{
            const movieArrays = response.data.results;
            if (movieArrays.length === 0) {
                swal("Error","No hubo resultados","error"); 
            }
            setMovieResult(movieArrays)                
        })
        .catch(error =>{
          swal("Error", "Hubo un error", "error")
        })
      
    }, [keyword])

    
    let token  = sessionStorage.getItem('token');

  return (
    <>

    {!token && <Navigate replace to="/" />}

          
        {moviesResult.length === 0 && <h3 className='text-white'>No hay resultados</h3>}     
        <div className="row my-2 mx-2">
    {
        moviesResult.map( (oneMovie, index) => {
          return(
               <div className="col-4" key={index}>
                <div className="card my-2">
                  <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} style={{height:"400px"}} className="card-img-top" alt="..."/>
                  <button className="favorito"
                  onClick={props.addOrRemoveFromFavs}
                  data-movie-id={oneMovie.id}>🖤
                  </button>  
                  <div className="card-body text-center" style={{height:"200px"}}>
                      <h5 className="card-title">{oneMovie.title.substring(0, 30)}</h5>  
                      <p className="card-text">{oneMovie.overview.substring(0, 100)}...</p>                   
                      <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-dark">View details</Link>                    
                    </div>
                </div>     
            </div>  
          )
        })
    }
         
  </div>
    
    </>
  )
}

export default Resultados