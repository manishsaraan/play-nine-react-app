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
     let button;    
     switch(props.answerToCorrect){
       case true:
       button =  
          <button className="btn btn-success" onClick={props.acceptAnswer}>
            <i className="fa fa-check"></i>
          </button>          
       break;
       case false:
       button =  
        <button className="btn btn-danger">
            <i className="fa fa-times"></i>
          </button>
       break;
       default:
       button =  
       <button 
       onClick = {props.checkAnswer}
       disabled={ props.selectedNumbers.length === 0 } className="btn">=</button>
       break;
     }
      return(
            <div className="col-2">
              {button}
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
     if(props.usedNumbers.indexOf(number) >= 0){
         return "used";
     }
     if( props.selectedNumbers.indexOf(number) >= 0 )
     {
      return "selected" ;
     }
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
   randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
   answerToCorrect : null,
   usedNumbers : []
}
selectNumber = (clicked) => {
    if(this.state.selectedNumbers.indexOf(clicked) !== -1) {return;}
    this.state.answerToCorrect = null;
    this.setState({selectedNumbers : this.state.selectedNumbers.concat(clicked)});
};
unselectNumber = (clicked) => {
    this.setState({selectedNumbers : this.state.selectedNumbers.
                                     filter(number => number !== clicked)});
};
checkAnswer = () =>{
 this.setState({
  answerToCorrect : this.state.randomNumberOfStars === this.state.selectedNumbers.reduce((acc, n) => acc + n, 0)
 })
};
acceptAnswer = () => {
  this.setState({
     usedNumbers : this.state.usedNumbers.concat(this.state.selectedNumbers),
     selectedNumbers : [],
     answerToCorrect : null,
     randomNumberOfStars: 1 + Math.floor(Math.random() * 9)
  })
}
   render(){
     const { selectedNumbers, randomNumberOfStars, usedNumbers} = this.state;
     return(
             <div className="container">
             <h3>Play Nine</h3>
             <hr/>
             <div className="row">
                <Stars numberOfStars = {randomNumberOfStars}/>
                <Button selectedNumbers = {selectedNumbers}
                        checkAnswer = {this.checkAnswer}
                        answerToCorrect = {this.state.answerToCorrect}
                        acceptAnswer = {this.acceptAnswer }
                   />
                <Answer selectedNumbers = {selectedNumbers}
                        unselectNumber = {this.unselectNumber}/>
             </div>
              <br/>
               <Numbers selectedNumbers = {selectedNumbers}
                         selectNumber = {this.selectNumber}
                        usedNumbers = {usedNumbers}
                         />
             </div>
       );
   }
}


ReactDOM.render(<App/>,document.getElementById('container'))