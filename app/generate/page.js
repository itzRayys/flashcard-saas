"use client";

import { useUser } from "@clerk/nextjs";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { doc, getDoc, writeBatch, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { db } from "@/firebase";
import Navbar from "../components/Navbar";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await fetch("api/generate", {
        method: "POST",
        body: text,
      });
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    try {
      const batch = writeBatch(db);
      const userDocRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        if (collections.find((f) => f.name === name)) {
          alert("Flashcard collection with the same name already exists.");
          return;
        } else {
          collections.push({ name });
          batch.set(userDocRef, { flashcards: collections }, { merge: true });
        }
      } else {
        batch.set(userDocRef, { flashcards: [{ name }] });
      }

      const colRef = collection(userDocRef, name);
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef);
        batch.set(cardDocRef, flashcard);
      });

      await batch.commit();
      handleClose();
      router.push("/flashcards");
    } catch (error) {
      console.error("Error saving flashcards:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <Box
          sx={{
            mt: 8,
            mb: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Generate Flashcards
          </Typography>
          <Paper
            sx={{
              p: 4,
              width: "100%",
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
            }}
          >
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="Enter Text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{ mb: 3, backgroundColor: "#fff", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              sx={{
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1.1rem",
                textTransform: "none",
              }}
            >
              Submit
            </Button>
          </Paper>
        </Box>

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Flashcards Preview
            </Typography>
            <Grid container spacing={3}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      perspective: "1000px",
                      transition: "transform 0.6s ease-in-out",
                      transformStyle: "preserve-3d",
                      position: "relative",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        transform: flipped[index]
                          ? "rotateY(0deg)"
                          : "rotateY(180deg)",
                      },
                    }}
                    onClick={() => handleCardClick(index)}
                  >
                    <CardActionArea>
                      <CardContent
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "200px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#ffffff",
                          borderRadius: 2,
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                            boxSizing: "border-box",
                            backfaceVisibility: "hidden",
                          }}
                        >
                          <Typography variant="h5" component="div">
                            {flashcard.front}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                            boxSizing: "border-box",
                            transform: "rotateY(180deg)",
                            backfaceVisibility: "hidden",
                          }}
                        >
                          <Typography variant="h5" component="div">
                            {flashcard.back}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpen}
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  textTransform: "none",
                }}
              >
                Save Flashcards
              </Button>
            </Box>
          </Box>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Save Flashcards</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your flashcards collection
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Collection Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={saveFlashcards} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}
