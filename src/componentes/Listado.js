import React from 'react';
import { Link, Navigate } from "react-router-dom";
import { useStateValue } from '../reducer/StateProvider';




const Listado = (props) => {   

  const[{filterMovies}, dispatch] = useStateValue();

  let token  = sessionStorage.getItem('token');  
  
  
  
  return (
    
   <>
    {!token && <Navigate replace to="/" />}
    <div className="row my-2 mx-2">
    {
        filterMovies?.map( (oneMovie, index) => {
          return(
            
                  <div className="col-3" key={index}>
                    <div className="card my-2">
                      <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} style={{height:"300px"}} className="card-img-top" alt="..."/>
                        <button className="favorito"
                        onClick={props.addOrRemoveFromFavs}
                        data-movie-id={oneMovie.id}>🖤
                        </button>
                       <div className="card-body text-center" style={{height:"220px"}}>
                          <h5 className="card-title">{oneMovie.title.substring(0, 30)}</h5>
                          <p className="card-text">{oneMovie.overview.substring(0, 50)}...</p>
                          <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-dark" >View details</Link>
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



export default Listado