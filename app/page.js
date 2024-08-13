import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Navbar from "./components/Navbar";

const HeroSection = () => (
  <Box
    sx={{
      height: "70vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      background: "linear-gradient(to right, #3a7bd5, #3a6073)",
      color: "#fff",
      padding: "20px 0",
    }}
  >
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
        Welcome to Flashcard SaaS
      </Typography>
      <Typography variant="h6" paragraph>
        The easiest way to create flashcards from your text.
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mx: 1 }}
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          sx={{ mx: 1, borderColor: "#fff", color: "#fff" }}
        >
          Learn More
        </Button>
      </Box>
    </Container>
  </Box>
);

const FeatureSection = () => (
  <Box sx={{ py: 8 }}>
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Features
      </Typography>
      <Grid container spacing={4} mt={4}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "grey.100",
              padding: 3,
              textAlign: "center",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Easy Text Input
              </Typography>
              <Typography paragraph>
                Simply input your text and let our software do the rest.
                Creating flashcards has never been easier.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "grey.100",
              padding: 3,
              textAlign: "center",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Smart Flashcards
              </Typography>
              <Typography paragraph>
                Our AI intelligently breaks down your text into concise
                flashcards, perfect for studying.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "grey.100",
              padding: 3,
              textAlign: "center",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Accessible Anywhere
              </Typography>
              <Typography paragraph>
                Access your flashcards from any device, at any time. Study on
                the go with ease.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

const PricingSection = () => (
  <Box sx={{ py: 8, backgroundColor: "#f5f5f5" }}>
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Pricing
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              textAlign: "center",
              border: "1px solid",
              borderColor: "grey.300",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                $5 / month
              </Typography>
              <Typography paragraph>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              textAlign: "center",
              border: "1px solid",
              borderColor: "grey.300",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                $15 / month
              </Typography>
              <Typography paragraph>
                Unlimited flashcards and storage, with advanced features.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Get Pro
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

const Home = () => (
  <div>
    <Navbar />
    <HeroSection />
    <FeatureSection />
    <PricingSection />
  </div>
);

export default Home;
