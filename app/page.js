'use client'
import NavBar from '@/components/navbar/navbar'
import { Box, Button, Stack, TextField, Typography , Grid} from '@mui/material'
import Head from 'next/head'
import { useState } from 'react'
import '@/app/CSS/LandingPage.css'
import InfoCard from '@/components/infoCard/infoCard'
import DevicesIcon from "@mui/icons-material/Devices";
import TextsmsIcon from "@mui/icons-material/Textsms";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function Home() {

  return (
    <Box>
      <Head>
        <title>AStar Rate my Professor</title>
        <meta name="description" content="AStar Rate my Professor" />
      </Head>

      <NavBar />
      <Box 
          width={"100%"}
          height={"100vh"}
          sx={{ textAlign: "center" }}
          bgcolor={"black"}  
          color={"white"}
          margin={"0px"}
          padding={10}
        >
          <Typography variant="h4" component="h1" gutterBottom id='generateText'>
            AStar Rate my Professor
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom className="apply">
            The easiest way to start figuring out which professor is for you!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mr: 2 }}
            href="/ChatBot"
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ mt: 2 }}
            href="/learnmore"
          >
            Learn More
          </Button>
        </Box>

        <Box 
          // sx={{ my: 6 }}
          padding={10}  
          bgcolor={"darkblue"}
          color={"white"}
          height={"100vh"}
        >
          <Typography variant="h2" component="h2" gutterBottom className="apply">
            Features
          </Typography>
          <Grid container spacing={4}>
            {/* Feature items */}
            <InfoCard
              
              icon={<TextsmsIcon />}
              title="Text to Cards in Seconds"
              subtitle="Transform your notes with just a few keystrokes"
            />
            <InfoCard
              icon={<DevicesIcon />}
              title="Easy Access"
              subtitle="Flashcards are accessible anytime, anywhere."
            />
            <InfoCard
              icon={<AutoAwesomeIcon />}
              title="Harness Artificial Intelligence"
              subtitle="Watch AI generate flashcards in seconds"
            />
          </Grid>
        </Box>
            {/* <Button variant="contained" onClick={sendMessage}>
              Send
            </Button> */}
            {/* <Button
              variant="contained"
              onClick={() => {
                fetch("/api/addSingleReview", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    professor: "prof",
                    review: "man he really",
                    subject: "Love",
                    stars: 1041342,
                  }),
                }).then((res) => {});
              }}
            >
              PRESS
            </Button> */}
      </Box>
  );
}
