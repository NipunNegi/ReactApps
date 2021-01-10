import React,{useContext,useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import { ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CTX} from './Store'

const useStyles=makeStyles(theme =>({
    root:{margin: '50px',
            padding:theme.spacing(3,2),
        },
        flex:{
            display:'flex',
            alignItems:'center'
        },
        topicswindow:{
            width:'30%',
            height:'300px',
            borderRight:'2px solid grey'

        },
        chatWindow:{
            width:'70%',
            height:'300px',
            padding:'20px',
            overflowY:'scroll'
        },
        chatBox:{
            width:'85%'
        },
        Button:{
            width:'15%'
        }
    
}))

function Dashboard() {
    
    const {Chats,sendChatAction,user}= useContext(CTX);
    
    const classes = useStyles();
    const topics=Object.keys(Chats);
    
    const [textValue, changeTextValue]=useState('');
    const [activeTopics, changeActiveTopics]=useState(topics[0]);
   // const [ textValue, changeTextValue]= useState('');    

    return (
        <>
        <Paper elevation={5} className={classes.root}>
            <Typography component='h4' varient='h4'>
                Chatting app
            </Typography>
            <Typography component='h5' varient='h5'>
                {activeTopics}
            </Typography>

            <div className={classes.flex}>
                <div className={classes.topicWindow}>
                <List>
                        {
                          topics.map(topic=>(
                                    <ListItem onClick = {(e)=> changeActiveTopics(e.target.innerText)} key={topic} button>
                                        <ListItemText primary={topic}></ListItemText>
                                    </ListItem>
                                )
                            )
                        }
                </List>
                </div>
                <div className={classes.chatWindow}>
                      
                        {
                          Chats[activeTopics].map((chat,i)=>(
                                  <div className={classes.flex} key={i}>
                                      <Chip label={chat.from} className={classes.flex}/>
                                      <Typography varient='p' >{chat.msg}</Typography>
                                </div>
                                )
                            )
                        }
                
                </div>

            </div>
            <div className={classes.flex}>
             <TextField
                    id="standard-multiline-flexible"
                    label="Send a Chat"
                    className={classes.flex}
                    multiline
                    rowsMax={2}
                    onChange={e => changeTextValue(e.target.value)}
                    value={textValue}

                    />
                
            <Button variant="contained" 
            color="primary" 
            
            onClick={()=> {sendChatAction({from : user, msg:textValue, topic:activeTopics})
                changeTextValue('')
            }}>
            
                send
                    </Button>
                

            </div>
        </Paper >
        </>
    )
}

export default Dashboard
