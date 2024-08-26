"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState, Fragment } from "react";
import { database } from "../firebase";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import NavBar from "@/components/navbar/navbar";

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

      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });

        if (!ranFirst) {
          ranFirst = true;
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
      const setDocSnap = await getDoc(userDocRef)
      if(setDocSnap.exists()){
        console.log("I EXIST! I AM INVINCIBLE")
      }
      batch.set(setDocRef, professor)
  
      await batch.commit()
  
      alert('Flashcards saved successfully!')
      //handleCloseDialog()

    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }

  };

  return (
    <Box>
      <NavBar />
      <Box
        width="100vw"
        min-height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
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
                  onClick={() => saveProfessor(jsonFile)}
                >
                  Press Button
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