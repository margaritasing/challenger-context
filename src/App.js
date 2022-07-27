
import { BrowserRouter,Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import  { actionType } from './reducer/reducer'
import { useStateValue } from "./reducer/StateProvider";
import Login from './componentes/Login';
import Listado from "./componentes/Listado";
import Header from "./componentes/Header";
import Detalle from "./componentes/Detalle";
import Resultados from "./componentes/Resultados";
import Favoritos from "./componentes/Favoritos";
import Generos from "./componentes/Generos";
import swal from 'sweetalert';
import axios from 'axios';
import "./App.css"


function App() { 
  const[{filterMovies, movies}, dispatch] = useStateValue();

  useEffect(() => {       
    const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=75b9f04bb9ba776a3e2318bbe7838f21&language=es-ES&page=1';
    axios.get(endPoint).then(response =>{
        dispatch({
          type:actionType.MOVIES,
          movies: response.data.results
        })       
    })
    .catch(error =>{
        swal("Error", "Hubo un error", "error")
    })
  
    }, [])
 




  const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const favInLocal = localStorage.getItem('favs');
       
        if (favInLocal !== null) {
          const favsArrays = JSON.parse(favInLocal);
         
          setFavoritos(favsArrays);        
        }
    }, [])
    

  const addOrRemoveFromFavs=  e =>{

    const favMovie = localStorage.getItem('favs');

    let tempMoviesInFavs;
  
    if (favMovie === null) {
      tempMoviesInFavs = []    
    }else{    
      tempMoviesInFavs = JSON.parse(favMovie)
    }


    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title =  parent.querySelector('h5').innerText;
    const overview =  parent.querySelector('p').innerText;
    const movieData = {
      imgURL, title, overview,
      id:btn.dataset.movieId
    }

    let movieIsInArray = tempMoviesInFavs.find(oneMovie =>{
      return oneMovie.id === movieData.id
    }) 

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);      
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavoritos(tempMoviesInFavs);
      swal("Bien","Se agrego la pelicula a favoritos","success");             
    } else {
        let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
        return oneMovie.id !== movieData.id
      })
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavoritos(moviesLeft);
      swal("Bien","Se elimino la pelicula de favoritos","success");
    } 
 
  }

  return (
    <BrowserRouter>
    <Header favoritos={favoritos} />
      <div className="container">
          <Routes>
            <Route exact path="/" element={<Login />} />     
            <Route path="/listado"  element={  <Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
            <Route path="/detalle"  element={<Detalle />} />
            <Route path="/resultados"  element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs}  />} />
            <Route path="/favoritos"  element={<Favoritos favoritos={favoritos} addOrRemoveFromFavs={addOrRemoveFromFavs}  />} />
            <Route path="/generos" element={<Generos />}/>
          </Routes> 
      </div>
     
    </BrowserRouter>  
  );
}

export default App;
