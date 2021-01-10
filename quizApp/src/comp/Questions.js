import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


function Questions(props){

   
   const {category,question,difficulty,correct_answer,incorrect_answers} = props.data;

  // const randNo=Math.ceil(Math.random(incorrect_answers.length));
  // incorrect_answers.splice(randNo,0,correct_answer);

   // incorrect_answers.slice(0,randNo);
   // break;
   //incorrect_answers.splice(0,0);
   const newAnswers=[...incorrect_answers,correct_answer];
        newAnswers.sort();
   const answerClicked=(e) =>{
      const detected= e.target.innerText;      
      if(detected === correct_answer)
      {
            props.onChange(true)
      }
      else {
         props.onChange(false)
      }
   }
   return(
   <>
   <div className="mainContainer">
      <div className="questionContainer">
         <header>
            <p style={{width:"90%"}} className="headerLeft">{category}</p>
            <p style={{width:"10%"}} className="headerRight">{props.questions}/10</p>
         </header>
         <h4 dangerouslySetInnerHTML ={{__html:question}} />
      </div>
      <div className="optionContainer">
         <ul className="optionAnswer" >
            {newAnswers.map((answer,index) => 
            <li onClick={answerClicked} key={index} dangerouslySetInnerHTML ={{__html:answer}}/>)}
         </ul>
      </div>
   </div>
   </>);
}

export default Questions
