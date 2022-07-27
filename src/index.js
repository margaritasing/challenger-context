import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StateProvider } from './reducer/StateProvider';
import reducer, {inicialState} from './reducer/reducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateProvider inicialState={inicialState} reducer ={reducer}>     
      <App />    
   </StateProvider>,
);


