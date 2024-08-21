import {
  Box,
  FormControl,
  Button,
  TextField,
  Rating,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function UserReviewForm() {
  const [stars, setStars] = useState(0);
  const [professor, setProfessor] = useState("");
  const [subject, setSubject] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/api/addSingleReview", {
      method: "POST",
      body: JSON.stringify({
        professor: professor,
        stars: stars,
        subject: subject,
        review: review,
      }),
    });
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <div>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="simple-controlled"
            value={stars}
            onChange={(event, newValue) => {
              setStars(newValue);
            }}
          />
        </div>

        {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
        <TextField
          id="outlined-basic"
          label="Professor"
          variant="outlined"
          value={professor}
          onChange={(e) => setProfessor(e.target.value)}
          required
        />
        <TextField
          id="outlined-basic"
          label="Subject"
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <TextField
          id="outlined-basic"
          label="Review"
          variant="outlined"
          rows={3}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          multiline
        />
        {/* <Input id="my-input" aria-describedby="my-helper-text" /> */}
        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
}
