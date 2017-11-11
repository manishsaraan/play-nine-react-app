import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';
import axios from 'axios';

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Stars = (props) => {
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
            <div className="col-2 text-center">
              {button}
              <br/><br/>
              <button className="btn btn-warning btn-sm" 
                 disabled = {props.redraws === 0}
                 onClick={props.redraw}>
                <i className="fa fa-refresh"></i>{props.redraws}
              </button>
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
const DoneFrame = (props) =>{
   return(
        <div className="text-center">
           <h2>{props.doneStatus}</h2>
           <button className="btn btn-secondary" onClick={props.resetGame}>
           Play Again!
           </button>
        </div>
    )
}
class App extends React.Component{
static randomNumberOfStars = () => {
      return 1 + Math.floor(Math.random() * 9);
}
static initialState = () => {
    return {
   selectedNumbers : [],
   randomNumberOfStars: App.randomNumberOfStars(),
   answerToCorrect : null,
   usedNumbers : [],
   redraws : 5,
   doneStatus : null
 };
}
state = App.initialState();
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
 this.setState(prevState => ({
     usedNumbers : this.state.usedNumbers.concat(this.state.selectedNumbers),
     selectedNumbers : [],
     answerToCorrect : null,
     randomNumberOfStars: App.randomNumberOfStars()
 }),this.updateDoneStatus);

}
redraw = () =>{
  //if redraws is zero do nothing
  if(this.state.redraws === 0 ) { return; };
  this.setState(prevState => ({
     selectedNumbers : [],
     answerToCorrect : null,
     randomNumberOfStars:App.randomNumberOfStars(),
     redraws : this.state.redraws - 1
  }),this.updateDoneStatus); 
};
possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
   const possibleNumbers = _.range(1,10).filter(number => 
                             usedNumbers.indexOf(number) === -1
                          );
  return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
}
updateDoneStatus = () =>{
   this.setState(prevState => {
      if(prevState.usedNumbers.length === 9){
       return {doneStatus : 'Done Nice!'}
      };
      if(prevState.redraws === 0 && !this.possibleSolutions(prevState)){
       return { doneStatus : 'Game Over!'}
      }
   })
};
resetGame = () => {
  this.setState( App.initialState() );
}
   render(){
     const {
     selectedNumbers,
     randomNumberOfStars,
     usedNumbers,
     redraws,
     doneStatus
     } = this.state;
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
                        redraw = {this.redraw}
                        redraws = {redraws}
                   />
                <Answer selectedNumbers = {selectedNumbers}
                        unselectNumber = {this.unselectNumber}/>
             </div>
              <br/>
              {doneStatus ? 
                <DoneFrame 
                         resetGame = {this.resetGame}
                         doneStatus = {doneStatus}
                         /> :
                <Numbers selectedNumbers = {selectedNumbers}
                         selectNumber = {this.selectNumber}
                        usedNumbers = {usedNumbers}
                         />
              }
               
              
               
             </div>
       );
   }
}
ReactDOM.render(<App/>,document.getElementById('container'))