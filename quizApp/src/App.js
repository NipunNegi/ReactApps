
import React,{useState, useEffect}from 'react'
import axios from 'axios'

import './App.css';
import Questions from './comp/Questions';
import button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 
const questionDetials={'difficulty':null,'category':null,'question':null,
  'correct_answer':null,'incorrect_answers':[]};

  const [qList,setqList]=useState({questionNo:0,data:[],dataLoaded:false,score:0});
  const [q,setq]=useState({Correct:false});
  
  
  const triviaCall = async() => {
     const response = await axios.get('https://opentdb.com/api.php?amount=10');
     
     setqList({...qList,data:response.data.results});
    
     if(qList.data.length>0){
      setqList({...qList,dataLoaded:true});
      }
  }
  // useEffect(()=>{
  //     },[qList]);

  const nextQuestionPlease=()=>{
debugger;
    if(qList.questionNo<10){
      setqList({...qList,questionNo:((qList.questionNo)+1)});
    }
    else  setqList({...qList,dataLoaded:false});
  }
  
  const checkAnswer = (e) => {
      if(e)
      {
          setqList({...qList,score:((qList.score)++)});       
          nextQuestionPlease();   
      }
      else nextQuestionPlease();

  }
  const nextQuestion = () => {
    nextQuestionPlease();
  }
  return (
    <>
    <div className="App">
      <h1> Question Trevia </h1>
      <div className= "correct Questions">Score:{qList.score}</div>
      {!qList.dataLoaded && <button onClick={triviaCall}>Start Trivia</button>}
       
          {qList.dataLoaded?
            <Questions data={qList.data[qList.questionNo]} questions={qList.questionNo} onChange={checkAnswer}></Questions>:
          <h1> Start the Trivia </h1>}
    </div>
    {qList.dataLoaded &&
    <div className="button-div">
      <button className="btn btn-primary next" onClick={nextQuestion}>Next</button>
    </div>}
    </>
  );
}

export default App;
