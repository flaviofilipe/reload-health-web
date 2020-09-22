import React from "react";

import { Box, Typography, TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));
export default function MainColumn() {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      mr={3}
      p={5}
      border={1}
      borderColor="grey.500"
    >
      <Typography>Resume</Typography>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        rows={4}
        variant="outlined"
      />
      <Typography>Description</Typography>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        rows={10}
        variant="outlined"
      />
    </Box>
  );
}
