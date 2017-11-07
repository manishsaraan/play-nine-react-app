import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';
import axios from 'axios';

class Game extends React.Component{
    render(){
       return(
              <div>
                <h3>App</h3>
              </div>
        );
    }
}

class App extends React.Component{
   render(){
     return(
             <div>
               <Game/>
             </div>
       );
   }
}
ReactDOM.render(<App/>,document.getElementById('container'))