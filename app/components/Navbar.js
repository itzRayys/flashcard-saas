"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MenuIcon from "@mui/icons-material/Menu";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#00796b" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={handleHomeClick}
        >
          Flashcard SaaS
        </Typography>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ mx: 1 }}>
              Login
            </Button>
            <Button color="inherit" href="/sign-up" sx={{ mx: 1 }}>
              Sign Up
            </Button>
          </SignedOut>

          <SignedIn>
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              href="/"
              sx={{ mx: 1 }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              startIcon={<SchoolIcon />}
              href="/generate"
              sx={{ mx: 1 }}
            >
              Generate
            </Button>
            <Button
              color="inherit"
              startIcon={<BookmarkIcon />}
              href="/flashcards"
              sx={{ mx: 1 }}
            >
              Saved
            </Button>
            <UserButton />
          </SignedIn>
        </Box>

        {/* Responsive Menu for smaller screens */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            keepMounted
          >
            <SignedOut>
              <MenuItem onClick={handleMenuClose} href="/sign-in">
                Login
              </MenuItem>
              <MenuItem onClick={handleMenuClose} href="/sign-up">
                Sign Up
              </MenuItem>
            </SignedOut>
            <SignedIn>
              <MenuItem onClick={handleMenuClose} href="/">
                Home
              </MenuItem>
              <MenuItem onClick={handleMenuClose} href="/generate">
                Generate
              </MenuItem>
              <MenuItem onClick={handleMenuClose} href="/flashcards">
                Saved
              </MenuItem>
            </SignedIn>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
