'use client'
import NavBar from '@/components/navbar/navbar'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import { useState } from 'react'
import '@/app/CSS/LandingPage.css'

export default function Home() {

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
    </Box>
  );
}
