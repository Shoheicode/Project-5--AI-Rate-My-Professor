'use client'
import NavBar from '@/components/navbar/navbar'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import '@/app/CSS/LandingPage.css'
import { useUser } from '@clerk/nextjs'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { database } from '../firebase'

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
        >
          <Typography variant="h4" component="h1" gutterBottom id='generateText'>
            AStar Rate my Professor
          </Typography> 
          
        </Box>
        {console.log(professors.length)}
          
          <Box>
              {professors.map((val, index) => (
                <Box
                  key={index}
                >
                  <Typography variant='h1' color={"black"}>
                    {console.log(val['professor'])}
                    {val['professor']}
                  </Typography>
                  <Typography>
                    {"Subject: " + val['subject']}
                  </Typography>
                  <Typography>
                    {"Star: " + val['stars']}
                  </Typography>
                </Box>
                  )
                )
              }
            </Box>
            <Typography>
              HIHIHIHI
            </Typography>
      </Box>
    );
}
