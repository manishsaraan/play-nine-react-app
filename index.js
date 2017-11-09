import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';
import axios from 'axios';
const Stars = (props) => {
  const  numberOfStars = 1 + Math.floor(Math.random() * 9);
  // let stars = [];
  // for(let i=0;i<numberOfStars;i++){
  //    stars.push(<i key={i} className="fa fa-star"></i>);
  // }
       return(
            <div className="col-5">
             {_.range(numberOfStars).map(i => 
                  <i key={i} className="fa fa-star"></i>
             )}
            </div>
        );
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
                  <Stars/>
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
   const arrayOfNumbers = _.range(1, 10);
   
   return(
        <div className="card text-center">
           <div>
              {arrayOfNumbers.map((number, i) => 
                  <span key={i}>{number}</span>
              )}
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