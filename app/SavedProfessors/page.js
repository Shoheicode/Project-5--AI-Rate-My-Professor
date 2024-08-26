'use client'
import NavBar from '@/components/navbar/navbar'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import '@/app/CSS/LandingPage.css'
import { useUser } from '@clerk/nextjs'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { database } from '../firebase'
import CoolCard from '@/components/Cards/professorCards'

export default function Home() {

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
        
        // const flashcds = docy
        // console.log(flashcds)
        // setProfessors(flashcds)
      }
      getFlashcard()
    }, [user])

    return (
      <Box>
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
        <Box>
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
                  <CoolCard
                    name={val["professor"]}
                    subject={val["subject"]}
                    review={parseInt(val["stars"])}
                  />
                </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
}
