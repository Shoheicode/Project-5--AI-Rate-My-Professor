"use client";
import NavBar from "@/components/navbar/navbar";
import UserReviewForm from "@/components/userform/userReviewForm";
import { Box, Button, collapseClasses, Stack, TextField, Typography } from "@mui/material";
import { useState, Fragment } from "react";
import { database } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import '@/app/CSS/LandingPage.css'
import '@/app/CSS/MovingBackground.css'

export default function Home() {
  
  const [questName, setQuestName] = useState('')
  const [question, setQuestion] = useState('')
  const {isSignedIn, isLoaded, user} = useUser()
  let ranFirst = false;

  const textAreaStyle = {
    height: '100px'
  }

  const addQuestion = async (name, question) =>{
    if (name == ''){
        alert("NO MESSAGE YOU DUMB BUTT")
      return;
    }
    

    const docRef = doc(collection(database, 'Question'), user.id)
    const docSnap = await getDoc(docRef)
    
    await setDoc(docRef, {
            name: name,
            question: question
        }
    )
    

  }

  return (
    <Box
        className="moving-background-help"
        minheight="100vh"
    >
        <NavBar />
        <Box
        width="100vw"
        height="80vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        >
            <Stack 
            width={"50vw"}
            gap={3}
            bgcolor={"white"}
            padding={10}
            borderRadius={5}
            >
            <Typography variant="h4" className="apply">
                What can we do to improve this site?
            </Typography>
                
            <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                fullWidth ={true}
                value={questName}
                onChange={(e) => setQuestName(e.target.value)}
                >
                
            </TextField>
            <TextField
                id="outlined-basic"
                label="Question"
                variant="outlined"
                fullWidth ={true}
                value={question}
                sx={textAreaStyle}
                onChange={(e) => setQuestion(e.target.value)}
                >
                
                </TextField>
                <Button 
                variant="outlined"
                onClick={ () => {
                    addQuestion(questName, question)
                    setQuestName('')
                    setQuestion('')
                    }  
                }
                >
                Send
                </Button>
            </Stack>
        </Box>
    </Box>
  );
}