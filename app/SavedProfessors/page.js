'use client'
import NavBar from '@/components/navbar/navbar'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import '@/app/CSS/LandingPage.css'
import { useUser } from '@clerk/nextjs'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { database } from '../firebase'

export default function Home() {

    const { isLoaded, isSignedIn, user } = useUser()
    const [professors, setProfessors] = useState([]);

    useEffect(() => {
        async function getProfessors() {
          //If there is no user, end the function
          if (!user) return
          const docRef = doc(collection(database, 'users'), user.id)
          const docSnap = await getDoc(docRef)
          
          if (docSnap.exists()) {
            const collections = docSnap.data().Professors || []
            setProfessors(collections)
          } else {
            await setDoc(docRef, { Professors: [] })
          }
        }
        getProfessors()
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
        >
          <Typography variant="h4" component="h1" gutterBottom id='generateText'>
            AStar Rate my Professor
            {console.log(professors)}
          </Typography> 
          
        </Box>
      </Box>
    );
}
