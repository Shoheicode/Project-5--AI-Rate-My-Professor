'use client'
import NavBar from '@/components/navbar/navbar'
import { Box, Button, Grid, Rating, Stack, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import '@/app/CSS/LandingPage.css'
import { useUser } from '@clerk/nextjs'
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { database } from '../firebase'
import CoolCard from '@/components/Cards/professorCards'
import styled from 'styled-components';

export default function Home() {

    //STYLES FOR THE CARD!!

    const CardContainer = styled.div`
      width: 300px;
      height: 300px;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      border-radius: 20px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      transition: transform 0.3s ease-in-out;

      &:hover {
        transform: translateY(-10px);
      }
    `;

    const CardContent = styled.div`
      padding: 20px;
      color: white;
    `;

    const CardTitle = styled.h2`
      font-size: 24px;
      margin-bottom: 10px;
    `;

    const CardDescription = styled.p`
      font-size: 16px;
      line-height: 1.5;
    `;

    const CardButton = styled.button`
      background-color: white;
      color: #ff6b6b;
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #f0f0f0;
      }
    `;

    const { isLoaded, isSignedIn, user } = useUser()
    const [professors, setProfessors] = useState([]);

    useEffect(() => {
      async function getFlashcard() {
        if (!user) return
        
        const collectReference = collection(doc(collection(database, 'users'), user.id), 'Professor')
        const docy = await getDocs(collectReference)

        let list = []

        docy.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          list.push(doc.data())
        });

        setProfessors(list)
      }
      getFlashcard()
    }, [user])

    const removeProfessor = async (professor) => {

    try {
      const name = professor['professor']
      const userDocRef = doc(collection(database, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)
      const deletingDocument = doc(collection(userDocRef, 'Professor'), name)

      //const batch = writeBatch(database)

      await deleteDoc(deletingDocument);

      const collectReference = collection(doc(collection(database, 'users'), user.id), 'Professor')
      const docy = await getDocs(collectReference)

      let list = []

      docy.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push(doc.data())
      });

      setProfessors(list)


      // const batch = writeBatch(database)
      
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data()
          if (userData.Professor.includes(name)){
            const index = userData.Professor.indexOf(name);
            userData.Professor.splice(index, 1);
            let profs = userData.Professor
            
            await setDoc(userDocRef, {Professor: profs})
            //setProfessors(profs.data)
          }
      }

    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }

    };

    return (
      <Box
        min-height= "100vh"
      >
        <Head>
          <title>AStar Rate my Professor</title>
          <meta name="description" content="AStar Rate my Professor" />
        </Head> 
        <NavBar />
        
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bgcolor={"blue"}
        >
          <Typography variant="h4" component="h1" gutterBottom id='generateText'>
            Saved Professors
          </Typography> 
          
        </Box>
        {professors.length > 0 && <Box>
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {professors.map((val, index) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  key={index}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CardContainer>
                    {/* <CardImage src="https://picsum.photos/300/200" alt="Random" /> */}
                    <CardContent>
                      <Stack
                        gap={3}
                      >
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          <CardTitle>{val["professor"]}</CardTitle>
                          <Button
                            variant='contained'
                            color='error'
                            className='buttonColor'
                            onClick={() => removeProfessor(val)}
                          >
                            X
                          </Button>
                        </Box>
                        <CardDescription>
                          {val["subject"]}
                        </CardDescription>
                        <Rating name="read-only" value={parseInt(val["stars"])} readOnly />
                        <CardButton>Learn More</CardButton>
                      </Stack>
                    </CardContent>
                  </CardContainer>
                </Grid>
            ))}
          </Grid>
        </Box>
        }
      </Box>
    );
}
