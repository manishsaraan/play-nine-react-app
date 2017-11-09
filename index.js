import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';
import axios from 'axios';
const Stars = (props) => {
 // const  numberOfStars = 1 + Math.floor(Math.random() * 9);
  // let stars = [];
  // for(let i=0;i<numberOfStars;i++){
  //    stars.push(<i key={i} className="fa fa-star"></i>);
  // }
       return(
            <div className="col-5">
             {_.range(props.numberOfStars).map(i => 
                  <i key={i} className="fa fa-star"></i>
             )}
            </div>
        );
}

const Button  = (props) => {
      return(
            <div className="col-2">
              <button  disabled={ props.selectedNumbers.length === 0 } className="btn">=</button>
            </div>
        );  
}

const Answer =  (props) => {
      return(
            <div className="col-5">
             {props.selectedNumbers.map((number,i) => 
                  <span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>
             )}
            </div>
        );
}

const Numbers = (props) => {
  // const arrayOfNumbers = _.range(1, 10);
   const numberClassName = (number) => {
     return ( props.selectedNumbers.indexOf(number) >= 0 )? "selected" : "";
   }
   return(
        <div className="card text-center">
           <div>
              {Numbers.list.map((number, i) => 
                  <span key={i} className={numberClassName(number)}
                  onClick={() => props.selectNumber(number)}
                  >{number}</span>
              )}
           </div>
        </div>
    );
}

Numbers.list  =  _.range(1, 10);

class App extends React.Component{
state = {
   selectedNumbers : [],
   randomNumberOfStars: 1 + Math.floor(Math.random() * 9)
}
selectNumber = (clicked) => {
    if(this.state.selectedNumbers.indexOf(clicked) !== -1) {return;}
    this.setState({selectedNumbers : this.state.selectedNumbers.concat(clicked)});
};
unselectNumber = (clicked) => {
    this.setState({selectedNumbers : this.state.selectedNumbers.
                                     filter(number => number !== clicked)});
}
   render(){
     const { selectedNumbers, randomNumberOfStars } = this.state;
     return(
             <div className="container">
             <h3>Play Nine</h3>
             <hr/>
             <div className="row">
                <Stars numberOfStars = {randomNumberOfStars}/>
                <Button selectedNumbers = {selectedNumbers}/>
                <Answer selectedNumbers = {selectedNumbers}
                        unselectNumber = {this.unselectNumber}/>
             </div>
              <br/>
               <Numbers selectedNumbers = {selectedNumbers}
                         selectNumber = {this.selectNumber}/>
             </div>
       );
   }
}
 
ReactDOM.render(<App/>,document.getElementById('container'))