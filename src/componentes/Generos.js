import React from 'react'
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { actionType } from '../reducer/reducer';
import { useStateValue } from '../reducer/StateProvider';

const Generos = () => {
  
  let navigate = useNavigate();

  const[{movies, filterGenero, filterMovies}, dispatch] = useStateValue();

  const data = [   
      {
        "id": 28,
        "name": "Acción"
      },
      {
        "id": 12,
        "name": "Aventura"
      },
      {
        "id": 16,
        "name": "Animación"
      },
      {
        "id": 35,
        "name": "Comedia"
      },
      {
        "id": 80,
        "name": "Crimen"
      },
      {
        "id": 99,
        "name": "Documental"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Familia"
      },
      {
        "id": 14,
        "name": "Fantasía"
      },
      {
        "id": 36,
        "name": "Historia"
      },
      {
        "id": 27,
        "name": "Terror"
      },
      {
        "id": 10402,
        "name": "Música"
      },
      {
        "id": 9648,
        "name": "Misterio"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Ciencia ficción"
      },
      {
        "id": 10770,
        "name": "Película de TV"
      },
      {
        "id": 53,
        "name": "Suspense"
      },
      {
        "id": 10752,
        "name": "Bélica"
      },
      {
        "id": 37,
        "name": "Western"
      }
  ]



  const filtroGeneros=(value) =>{
    dispatch({
      type: actionType.FILTERMOVIES,
      value:value
    })

    console.log(value)
  } 



  

 
   

 
   return(
            <>
           
                return(
                     <>
                     {data.map((peli) => (       
                      <div className="peli" key={peli.id}>
                     
                      <Link to="/resultados" className='btn text-white' onClick={() => filtroGeneros(peli.name)}>
                      <h3>{peli.name}</h3>                
                      </Link>                    
                       
                    </div>       
                  ))} 
                     </>

                )


          
            
            </>


   )
    
    
    
    
    
    
    
    
    
  
}

export default Generos