import React from 'react'
import swal from 'sweetalert';
import { useNavigate, Navigate } from "react-router-dom";
import {actionType } from "../reducer/reducer"
import { useStateValue } from '../reducer/StateProvider';


const Buscador = () => {

    const[{filterMovies, movies}, dispatch] = useStateValue();

    let navigate = useNavigate();

    const inputSearch = (event) =>{
        event.preventDefault()
        dispatch({
        type:actionType.FILTER,
        value:{value: event.target.value}
      })      
      navigate("/resultados")
  }

    /* const submitHandler = e => {
        e.preventDefault()
        const keyword = e.currentTarget.keyword.value.trim();
        if (keyword.length === 0) {
            swal("Error","Tienes que escribir alguna busqueda","error");            
        }else if(keyword.length < 4){
            swal("Error","Tienes que escribir mas de 4 caracteres","error");            
        }else{
            e.currentTarget.keyword.value = '';
            navigate(`/resultados?keyword=${keyword}`)
        
    } */

    

  return (
    <>
     
    <div>
   
            <form className=" d-flex align-items-center" type="submit" >
                     <label className="form-label mb-0 mx-2">                     
                        <input type='text' name='keyword' onChange={inputSearch} style={{borderRadius:"10px", height:"40px"}} placeholder=' Buscar' />          
                  </label>                           
                  <button className="btn btn-warning  text-center" style={{width:"90px", height:"40px"}} type='submit'>Buscar</button>   
            </form>  
    </div>
    </>
  )
}

export default Buscador