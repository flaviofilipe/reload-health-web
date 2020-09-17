import React from "react";

import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Box, Container, Grid } from "@material-ui/core";

import Products from "./pages/Products";

function App() {
  const theme = createMuiTheme({
    spacing: 4,
    palette: {
      primary: {
        main: "#21de41",
      },
      secondary: {
        main: "#3756e1",
      },
      error: {
        main: "#d52020",
      },
      background: {
        default: "#f4f6f8",
        paper: "#FFF",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Products />
    </ThemeProvider>
  );
}

export default App;
