import "./login.css";
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate, Navigate } from "react-router-dom";

import { useStateValue } from '../../reducer/StateProvider';
import { actionType } from '../../reducer/reducer';



function Login() {

  const [{ user }, dispatch] = useStateValue();

  let navigate = useNavigate();



    async function loginUser(event) {
        event.preventDefault() 
         
          
         const email = event.target[0].value
         const password= event.target[1].value
       

        await axios.post("http://localhost:5000/api/auth/login",{email, password} )
            .then(response =>
            console.log(response.data)

                

            )
        function displayMessages(data) {
         
            if (!data.success) {
              swal("Error","The username and/or password is incorrect!", "error")
            }   
            else {
              localStorage.setItem("token", data.response.token)
              swal("Perfecto", "Welcome", "sucesss")   
              navigate("/listado")              
              
              }
            

            dispatch({
                type: actionType.USER,
                user: data.response
            })

           
            
        }
       
    }

   
  

  return (
    <>
   
    <div className="afl-container">
      <form className="form-login-container" onSubmit={loginUser}>
        <div className="full-width">
          <h2 className="form-title text-align-center">Login</h2>
          <h3 className="form-body text-align-center">Por favor Logueate</h3>
        </div>
        <div className="full-width form-inputs-container">
          <label>
            <input
              className="form-input"
              type="email"
              placeholder="Email"
            />
          </label>
          <label>
            <input className="form-input" type="password" placeholder="Password" />
          </label>
        </div>
       
        <div className="full-width">
          <button className="form-login__button--send" type="submit">Login</button>
        </div>        
       
      </form>
    </div>
    
    
    
    
    
    
    </>
  );
}

export default Login