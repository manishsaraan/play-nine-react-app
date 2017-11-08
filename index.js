import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';
import axios from 'axios';
class Start extends React.Component{
  numberOfStars = 5;
  stars = [];
  for(i=0,i<numberOfStars,i++){
     stars.push(<i key={i} className="fa fa-star"></i>);
  }
   render(){
      return(
            <div className="col-5">
             {starts}
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
                <hr/>
                <Numbers/>
              </div>
        );
    }
}
const Numbers = (props) => {
   return(
        <div className="card text-center">
           <div>
              <span>1</span>
              <span className="selected">2</span>
              <span className="used">3</span>
           </div>
        </div>
    );
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