// components/FlashcardContent.js
import {
  Box,
  Typography,
  CardContent,
  CardActionArea,
  Card,
} from "@mui/material";

export default function FlashcardContent({
  flashcard,
  index,
  flipped,
  handleCardClick,
}) {
  return (
    <Card>
      <CardActionArea onClick={() => handleCardClick(index)}>
        <CardContent>
          <Box
            sx={{
              perspective: "1000px",
              position: "relative",
              width: "100%",
              height: "200px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transition: "transform 0.6s",
                transform: flipped[index] ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front Side */}
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5">{flashcard.front}</Typography>
              </Box>

              {/* Back Side */}
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#e0f7fa",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5">{flashcard.back}</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
