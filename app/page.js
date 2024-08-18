'use client'

import React from "react";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Avatar,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Navbar from "./components/Navbar";
import { ArrowForward, CheckCircle } from "@mui/icons-material";

const handleSubmit = async () => {
  const checkoutSession = await fetch('/api/checkout_session', {
    method: 'POST',
    headers:{
      origin: 'https://flashcard-saas-ecru.vercel.app/',
    },
  })

  const checkoutSessionJson = await checkoutSession.json()

  if (checkoutSession.statusCode === 500){
    console.error(checkoutSession.message)
    return
  }

  const stripe = await getStripe()
  const {error} = await stripe.redirectToCheckout({
    sessionId: checkoutSessionJson.id,
  })

  if (error){
    console.warn(error.message)
  }
}

const HeroSection = () => (
  <Box
    sx={{
      height: "90vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      backgroundColor: "#e0f7fa",
      color: "#0d47a1",
      padding: "20px",
    }}
  >
    <Container maxWidth="lg">
      <Typography
        variant="h2"
        gutterBottom
        sx={{ fontWeight: "bold", letterSpacing: "0.05em" }}
      >
        Transform Your Learning with Flashcard SaaS
      </Typography>
      <Typography
        variant="h6"
        paragraph
        sx={{ maxWidth: "700px", margin: "0 auto", mb: 4 }}
      >
        Capture your notes, convert them into flashcards, and study efficiently
        from any device, anywhere.
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForward />}
          sx={{
            mx: 1,
            backgroundColor: "#1976d2",
            ":hover": { backgroundColor: "#115293" },
          }}
          href="/sign-up"
        >
          Get Started for Free
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          sx={{
            mx: 1,
            borderColor: "#0d47a1",
            color: "#0d47a1",
            ":hover": { backgroundColor: "#e3f2fd" },
          }}
        >
          Learn More
        </Button>
      </Box>
    </Container>
  </Box>
);

const FeatureSection = () => (
  <Box sx={{ py: 10, backgroundColor: "#ffffff" }}>
    <Container>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#0d47a1" }}
      >
        Features That Make a Difference
      </Typography>
      <Typography
        variant="body1"
        align="center"
        paragraph
        sx={{ maxWidth: "600px", margin: "0 auto", mb: 8 }}
      >
        Our tools are designed to help you streamline your study process, making
        learning easier and more enjoyable.
      </Typography>
      <Grid container spacing={4}>
        {[
          {
            title: "Easy Text Input",
            description:
              "Quickly input your text and let our system do the rest. Your study materials, ready in seconds.",
            icon: "📝",
          },
          {
            title: "AI-Driven Flashcards",
            description:
              "Our AI intelligently breaks down your text into concise, effective flashcards, perfect for studying.",
            icon: "🤖",
          },
          {
            title: "Cross-Device Access",
            description:
              "Access your flashcards on any device, any time. Study wherever you are, whenever you want.",
            icon: "📱",
          },
          {
            title: "Collaborate with Ease",
            description:
              "Share your flashcards with classmates or colleagues to collaborate and enhance your learning experience.",
            icon: "👥",
          },
        ].map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              sx={{
                padding: 3,
                textAlign: "center",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease-in-out",
                ":hover": { transform: "translateY(-10px)" },
              }}
            >
              <Typography variant="h2" sx={{ fontSize: "3rem", mb: 2 }}>
                {feature.icon}
              </Typography>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {feature.title}
                </Typography>
                <Typography paragraph>{feature.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

const PricingSection = () => (
  <Box sx={{ py: 10, backgroundColor: "#f9f9f9" }}>
    <Container>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#0d47a1" }}
      >
        Choose the Plan That&#39;s Right for You
      </Typography>
      <Typography
        variant="body1"
        align="center"
        paragraph
        sx={{ maxWidth: "600px", margin: "0 auto", mb: 8 }}
      >
        We offer flexible pricing options to fit your needs, whether you&#39;re just
        getting started or need more advanced features.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {[
          {
            title: "Free",
            price: "$0 / month",
            description:
              "Access to basic features with limited storage. Great for personal use.",
            features: [
              "Basic flashcards",
              "Limited storage",
              "Cross-device access",
            ],
            highlighted: false,
          },
          {
            title: "Pro",
            price: "$15 / month",
            description:
              "For professionals and serious learners who need advanced tools.",
            features: [
              "Unlimited flashcards",
              "Advanced AI features",
              "Priority support",
              "Collaborative tools",
            ],
            highlighted: true,
          },
          {
            title: "Team",
            price: "$45 / month",
            description:
              "Perfect for teams looking to collaborate and share resources.",
            features: [
              "All Pro features",
              "Team collaboration",
              "Custom branding",
            ],
            highlighted: false,
          },
        ].map((plan, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                textAlign: "center",
                border: "1px solid",
                borderColor: plan.highlighted ? "#1976d2" : "grey.300",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                background: plan.highlighted
                  ? "linear-gradient(to right, #1976d2, #0d47a1)"
                  : "white",
                color: plan.highlighted ? "white" : "black",
                transform: plan.highlighted ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.3s ease-in-out",
                ":hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {plan.title}
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  gutterBottom
                  sx={{ color: plan.highlighted ? "white" : "grey.600" }}
                >
                  {plan.price}
                </Typography>
                <Typography paragraph>{plan.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  {plan.features.map((feature, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: plan.highlighted ? "white" : "black",
                        mb: 1,
                      }}
                    >
                      <CheckCircle
                        sx={{
                          mr: 1,
                          color: plan.highlighted ? "white" : "green",
                        }}
                      />
                      {feature}
                    </Typography>
                  ))}
                </Box>
                <Button
                  variant={plan.highlighted ? "contained" : "outlined"}
                  color={plan.highlighted ? "secondary" : "primary"}
                  fullWidth
                  sx={{
                    mt: 2,
                    borderColor: plan.highlighted ? "white" : "#1976d2",
                    color: plan.highlighted ? "white" : "#1976d2",
                    ":hover": {
                      backgroundColor: plan.highlighted ? "#115293" : "#1976d2",
                      color: "white",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  {plan.highlighted ? "Get Pro" : "Choose Plan"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

const TestimonialsSection = () => (
  <Box sx={{ py: 10, backgroundColor: "#ffffff" }}>
    <Container>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#0d47a1" }}
      >
        What Our Users Are Saying
      </Typography>
      <Carousel
        indicators={false}
        navButtonsAlwaysVisible={true}
        sx={{ maxWidth: "800px", margin: "0 auto", mt: 6 }}
      >
        {[
          {
            name: "John Doe",
            role: "Student",
            quote:
              "Flashcard SaaS has transformed the way I study. The AI-driven flashcards are incredibly effective!",
            avatar: "/images/avatar1.png",
          },
          {
            name: "Jane Smith",
            role: "Educator",
            quote:
              "The ability to create and share flashcards with my students has made my job so much easier.",
            avatar: "/images/avatar2.png",
          },
          {
            name: "Robert Johnson",
            role: "Professional",
            quote:
              "This tool is a game-changer. I can study on the go and access my materials from any device.",
            avatar: "/images/avatar3.png",
          },
        ].map((testimonial, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{ padding: 4, textAlign: "center", borderRadius: 3 }}
          >
            <Avatar
              src={testimonial.avatar}
              alt={testimonial.name}
              sx={{ width: 80, height: 80, margin: "0 auto", mb: 2 }}
            />
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              {testimonial.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {testimonial.role}
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: "italic" }}>
              &#34;{testimonial.quote}&#34;
            </Typography>
          </Paper>
        ))}
      </Carousel>
    </Container>
  </Box>
);

const Home = () => (
  <div>
    <Navbar />
    <HeroSection />
    <FeatureSection />
    <PricingSection />
    <TestimonialsSection />
  </div>
);

export default Home;
