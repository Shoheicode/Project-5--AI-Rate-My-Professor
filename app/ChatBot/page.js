"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState, Fragment } from "react";
import { database } from "../firebase";
import { collection, deleteDoc, doc, getDoc, setDoc, writeBatch } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import NavBar from "@/components/navbar/navbar";
import '@/app/CSS/MovingBackground.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ]);
  const { isLoaded, isSignedIn, user } = useUser()
  const [message, setMessage] = useState("");
  const [firstMessage, setFirstMessage] = useState(null);
  let ranFirst = false;
  const [likedMessages, setLikes] = useState([])

  const sendMessage = async () => {
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      return reader.read().then(async function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });

        if (!ranFirst) {
          //Right here, we have to figure out if the professors are saved in the firebase
          let lis = []
          ranFirst = true;
          for(var i = 0; i < JSON.parse(text).data.length; i++){
            try {
              const userDocRef = doc(collection(database, 'users'), user.id)
              const userDocSnap = await getDoc(userDocRef)
          
              const batch = writeBatch(database)
          
              if (userDocSnap.exists()) {
                const userData = userDocSnap.data()
                console.log(userData.Professor)
                console.log("JSON " + JSON.parse(text).data)
                if (!userData.Professor.includes(JSON.parse(text).data[i].professor)){
                  lis.push(false)
                }
                else{
                  lis.push(true)
                }
                
              } else {
                batch.set(userDocRef, { Professor: [] })
                lis = [false, false, false]
              }
            }
            catch (error) {
              console.error('Error saving professors:', error)
              alert('An error occurred while saving professors. Please try again.')
            }
          }
          setLikes(lis)
          setFirstMessage(JSON.parse(text));
        } else {
          setMessages((messages) => {
            let lastMessage = messages[messages.length - 1];
            let otherMessages = messages.slice(0, messages.length - 1);
            return [
              ...otherMessages,
              { ...lastMessage, content: lastMessage.content + text },
            ];
          });
        }

        return reader.read().then(processText);
      });
    });
  };

  const saveProfessor = async (professor) => {
    console.log("HIHIHIHIHI")
    console.log(professor);

    try {
      const userDocRef = doc(collection(database, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)
  
      const batch = writeBatch(database)
      
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data()
        console.log(userData.Professor)
        if (!userData.Professor.includes(professor['professor'])){
          const updatedSets = [...(userData.Professor || []), professor['professor'] ]
          batch.update(userDocRef, { Professor: updatedSets })
        }
        
      } else {
        batch.set(userDocRef, { Professor: [professor['professor']] })
      }
  
      const setDocRef = doc(collection(userDocRef, 'Professor'), professor['professor'])
      batch.set(setDocRef, professor)
  
      await batch.commit()
  
      alert('Professors saved successfully!')
      //handleCloseDialog()

    } catch (error) {
      console.error('Error saving professors:', error)
      alert('An error occurred while saving professors. Please try again.')
    }

  };

  const removeProfessor = async (professor) => {

    try {
      const name = professor['professor']
      const userDocRef = doc(collection(database, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)
      const deletingDocument = doc(collection(userDocRef, 'Professor'), name)

      //const batch = writeBatch(database)

      await deleteDoc(deletingDocument);



      // const batch = writeBatch(database)
      
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data()
          console.log(userData.Professor)
          console.log("Name: " + name)
          if (userData.Professor.includes(name)){
            const index = userData.Professor.indexOf(name);
            console.log(index)
            userData.Professor.splice(index, 1);
            let profs = userData.Professor
            await setDoc(userDocRef, {Professor: profs})
          }
      }

    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }

  };

  const handleClick = (prof, index) => {
    if (!likedMessages[index]) {
      saveProfessor(prof)
      console.log("SAVING PROFESSOR")
    } else {
      // setCount(count + 1);
      removeProfessor(prof);
      console.log("Deleting PROFESSOR")
    }
    setLikes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  };


  return (
    <Box>
      <NavBar />
      <Box
        min-width="100vw"
        min-height="100vh"
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        
      >
        <Stack
          className="moving-background-chatbot"
          direction={"column"}
          width="500px"
          height="700px"
          border="1px solid black"
          p={2}
          spacing={3}
        >
          <Stack
            direction={"column"}
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === "assistant" ? "flex-start" : "flex-end"
                }
              >
                
                <Box
                  bgcolor={
                    message.role === "assistant"
                      ? "primary.main"
                      : "secondary.main"
                  }
                  color="white"
                  borderRadius={10}
                  p={3}
                >
                  {message.content.split("\n").map((line, i) => (
                    <Fragment key={i}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <TextField
              sx={
                {
                  backgroundColor: "white!important",
                  borderRadius: "5px"
                }
              }
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" onClick={sendMessage}>
              Send
            </Button>
          </Stack>
        </Stack>
        {firstMessage && <Box>
            {//console.log("HIHIHIHIHHI")
            }
            {firstMessage.data.map((jsonFile, index) => (
              <Box
                key={index}
              >
                <Typography>
                  {jsonFile['professor']}
                </Typography>
                <Button
                  onClick={() => handleClick(jsonFile, index)}
                >
                  {
                    console.log(likedMessages)
                  }
                  {
                    likedMessages[index] ? <FavoriteIcon/> : <FavoriteBorderIcon/>
                  }
                </Button>
              </Box>
            ))
            }
          </Box>
        }
      </Box>
    </Box>
  );
}