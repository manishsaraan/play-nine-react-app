import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';
import axios from 'axios';
class Start extends React.Component{
   render(){
      return(
            <div className="col-5">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </div>
        );
   }
}

class Button extends React.Component{
   render(){
      return(
            <div className="col-2">
              <button>=</button>
            </div>
        );
   }
}

class Answer extends React.Component{
   render(){
      return(
            <div className="col-5">
              ....
            </div>
        );
   }
}

class Game extends React.Component{
    render(){
       return(
              <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div  className="row">
                  <Start/>
                  <Button/>
                  <Answer/>
                </div>
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