import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Container,
  Paper,
  Box,
} from "@mui/material";

const scenarios = {
  police: {
    question: "A police officer is knocking at your door. What should you do?",
    options: [
      {
        text: "Open the door",
        outcome: "The police were fake, and they have robbed you.",
        nextScenario: "robbery",
      },
      {
        text: "Deny entrance unless they have a warrant",
        outcome:
          "Good choice! In most jurisdictions, police need a valid warrant to enter your home without consent.\nAlways ask for identification and verify their warrant.",
        nextScenario: "warrant",
      },
      {
        text: "Call 100",
        outcome:
          "You called 100 and reported the situation. The real police are on their way.",
        nextScenario: "realPolice",
      },
      {
        text: "Something else",
        outcome:
          "Please describe your action and ensure it aligns with your rights and safety.",
        requiresInput: true,
        nextScenario: "custom",
      },
    ],
  },
  robbery: {
    question: "The robbers are now in your house. What do you do?",
    options: [
      {
        text: "Fight back",
        outcome: "That was dangerous! You got hurt.",
        nextScenario: null,
      },
      {
        text: "Comply and call police later",
        outcome: "Smart choice. Your life is more valuable than possessions.",
        nextScenario: null,
      },
      {
        text: "Try to escape",
        outcome: "You managed to escape and called for help!",
        nextScenario: null,
      },
      {
        text: "Something else",
        outcome: "What would you do?",
        requiresInput: true,
        nextScenario: null,
      },
    ],
  },
  warrant: {
    question: "The police show you a warrant. What do you do next?",
    options: [
      {
        text: "Verify the warrant details",
        outcome: "Good choice! Always verify the details.",
        nextScenario: null,
      },
      {
        text: "Let them in immediately",
        outcome: "You should have verified first!",
        nextScenario: null,
      },
      // ... more options
    ],
  },
  realPolice: {
    question: "The real police arrive and verify the situation. What now?",
    options: [
      // ... options
    ],
  },
};

const ScenarioComponent = () => {
  const [currentScenario, setCurrentScenario] = useState("police");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [customAction, setCustomAction] = useState("");

  const handleOptionClick = (option) => {
    setDialogContent(option.outcome);
    setDialogOpen(true);
  };

  const handleDialogClose = (option) => {
    setDialogOpen(false);
    if (option?.nextScenario) {
      setCurrentScenario(option.nextScenario);
    }
    setCustomAction("");
  };

  const currentScenarioData = scenarios[currentScenario];

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "#2c3e50",
            mb: 4,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Fight Your Own Case
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 3,
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#2c3e50",
                fontWeight: 500,
                borderLeft: "4px solid #2c3e50",
                pl: 2,
                py: 1,
                width: "100%",
                textAlign: "left",
                bgcolor: "rgba(44, 62, 80, 0.05)",
                borderRadius: "0 4px 4px 0",
              }}
            >
              {currentScenarioData.question}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                mt: 2,
              }}
            >
              {currentScenarioData.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    borderWidth: "1px",
                    borderColor: "#2c3e50",
                    color: "#2c3e50",
                    position: "relative",
                    pl: 6,
                    textAlign: "left",
                    "&:hover": {
                      borderWidth: "1px",
                      borderColor: "#2c3e50",
                      bgcolor: "rgba(44, 62, 80, 0.05)",
                    },
                    "&::before": {
                      content: `"${String.fromCharCode(65 + index)}"`,
                      position: "absolute",
                      left: "20px",
                      fontWeight: "bold",
                      color: "#2c3e50",
                    },
                  }}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.text}
                </Button>
              ))}
            </Box>
          </Box>
        </Paper>

        <Dialog
          open={dialogOpen}
          onClose={() =>
            handleDialogClose(
              currentScenarioData.options.find(
                (opt) => opt.outcome === dialogContent
              )
            )
          }
          PaperProps={{
            sx: {
              borderRadius: 2,
              minWidth: "300px",
              maxWidth: "500px",
            },
          }}
        >
          <DialogTitle
            sx={{
              bgcolor: "#2c3e50",
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            Outcome
          </DialogTitle>
          <DialogContent sx={{ p: 3, mt: 2 }}>
            <Typography sx={{ whiteSpace: "pre-line" }}>
              {dialogContent}
            </Typography>
            {dialogContent.includes("describe") && (
              <TextField
                fullWidth
                label="Your action"
                multiline
                rows={4}
                sx={{ mt: 3 }}
                value={customAction}
                onChange={(e) => setCustomAction(e.target.value)}
              />
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button
              variant="contained"
              sx={{
                px: 4,
                borderRadius: 2,
                bgcolor: "#2c3e50",
                "&:hover": {
                  bgcolor: "#1a252f",
                },
              }}
              onClick={() =>
                handleDialogClose(
                  currentScenarioData.options.find(
                    (opt) => opt.outcome === dialogContent
                  )
                )
              }
            >
              {dialogContent.includes("describe") ? "Submit" : "Continue"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ScenarioComponent;
