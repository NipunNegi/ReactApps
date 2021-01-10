import React from 'react';
import io from 'socket.io-client'
export const CTX= React.createContext();

const initState={
    general:[{from:'aaron', msg:"I am aaron"},
    {from:'aaron', msg:"I am aaron"},
    {from:'aaron', msg:"I am aaron"}],
    topic2:[{from:'aanipunron', msg:"I am aaron"},
    {from:'aarndnson', msg:"I am aaron"},
    {from:'aaron', msg:"I am aaron"}]

}

function reducer(state,action){
    const{from,msg,topic}=action.payload;
    switch(action.type){
    case 'Receive_message':
    return{
        ...state,
        [action.payload.topic]:[
            ...state[topic],
            {from, msg}
        ]

    }
    default:
    return state
}
}
let socket;

function sendChatAction(value){
socket.emit('chatMessage',value);
}


function Store(props) {

    const [Chats,dispatch] = React.useReducer(reducer,initState);
    if(!socket){
        socket = io(':3001');
        socket.on('chatMessage',function(msg){    
           console.log("this is me");
            dispatch({type:'Receive_message', payload:msg});
        })
        };
        
    
    const user ='aron'+ Math.random(100).toFixed(2);

    return (
        <div>
            <CTX.Provider value={{Chats, sendChatAction, user}}>
            {props.children}
            </CTX.Provider>
        </div>
    )
}

export default Store
