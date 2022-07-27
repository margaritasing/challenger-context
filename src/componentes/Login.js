import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import styled from "styled-components";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {

   let navigate = useNavigate();

    const submitHandler = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (email === '' || password === '') {
           swal("Error","Los campos no pueden estar vacios","error");   
           return      
        }

        if(email !== '' && !regexEmail.test(email)){
           swal("Error","Debes escribir un correo valido","error");
           return
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
           swal("Error", "Credenciales Invalidas", "error");
            return       
        }
        axios.post('http://challenge-react.alkemy.org', {email, password})
        .then( res =>{
           swal("Perfecto", "Lista de Peliculas", "success");          

           const tokenRecibido = res.data.token;
           sessionStorage.setItem('token', tokenRecibido);
           
           navigate("/listado");         
           
         })
      }

      let token  = sessionStorage.getItem('token');     
      
      return (
      <>
      {token && <Navigate replace to="/listado" />}

      <Section className='principal'>
          <div className='login'>            
           <h3>Formulario de login</h3>
            <form onSubmit={submitHandler} className="formulario">
                  <label>
                     <span>Correo electronico: </span> <br/>
                        <input type='email' name='email' placeholder='Email' />          
                  </label>
                  <br/>

                  <label>
                  <span>Contraseña: </span><br/>
                        <input type='password' name='password' placeholder='Contraseña'/>          
                  </label>     
                  <br/>
                  <br/>
                  <button type='submit'>Ingresar</button>   
            </form>              
         </div>       
      </Section>
      </>
  )
}

const Section = styled.section`


   
   width: 100%;  
   display:flex;
   justify-content: center;
   align-items: center;
  


.login{
   background-color:#FFF9CA;
   width: 400px; 
   height: 250px;
   padding:10px;
   margin-top:30px;
   border-radius:25px; 
}

input{
   border-radius:15px;
   border:none;
   width: 350px; 
   height: 30px;
   margin:10px 10px 10px 0;
   background-color:#fff;
}

.login h3{
   text-align:center;
   font-size:20px;
}

.login button{
   width: 100%; 
   height: 30px;
   border-radius:25px;
   background-color:#B2A4FF;
   border:none;
}

button:hover {
   background-color:#FFB4B4;
 }
 
`;

export default Login