import "./register.css"
import swal from 'sweetalert';
import { useNavigate, Navigate, Link } from "react-router-dom";

import axios from "axios";



function Register() {

  let navigate = useNavigate();
 
  async function NewUser(e){
    e.preventDefault()  
   const username = e.target[0].value;                                                
   const email = e.target[1].value;
   const password= e.target[2].value;
   
   const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (email === '' || password === '') {
           swal("Error","Los campos no pueden estar vacios","error");   
           return      
        }

        if(email !== '' && !regexEmail.test(email)){
           swal("Error","Debes escribir un correo valido","error");
           return
        }
               
 
   await axios.post("http://localhost:5000/api/auth/register",{username, email, password})   
   .then(res=> {
      
      const creado = res.statusText;
       if (creado === "Created") {
         swal("Perfecto", "Ahora Logueate", "success");
                
       }

         
   
   
   })
 
  }
  

  
  


 
  return (
    <>
 
    <div className="afl-container">
      <form className="form-login-container" type="submit" onSubmit={NewUser}>
        <div className="full-width">
          <h2 className="form-title text-align-center">Registro</h2>
          <h3 className="form-body text-align-center">
            Por favor registrate
          </h3>
        </div>
        <div className="full-width form-inputs-container">
          <label>
            <input
              className="form-input"
              name="firstname"
              id="firstname"
              type="text"
              placeholder="Enter your user name"
            />
          </label>      
          <label>
            <input
              className="form-input"
              type="email"
              id="email"
              name="email"           
              placeholder="Enter your email"
            />
          </label>
        
          <label>
            <input className="form-input" type="password" placeholder="Password" />
          </label>       
        </div>
        <div className="full-width">
          <button type="submit" className="form-login__button--send">Create Account</button>
        </div>      
        <div className="full-width">
         
          <Link to="/login">You have an Account?</Link>
              
          
          
        </div>
      </form>
    </div>
    </>
  );
}
export default Register;