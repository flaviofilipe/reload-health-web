import React, { useState } from "react";

import {
  makeStyles,
  Box,
  Typography,
  InputAdornment,
  TextField,
  Button,
  ButtonGroup,
} from "@material-ui/core";

import Categories from "./Categories";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#fff",
    width: "100%",
  },

  buttonActive: {
    color: "#fff",
  },
}));

export default function RightColumn() {
  const classes = useStyles();
  const [active, setActive] = useState(true);

  return (
    <Box ml={2} width="100%">
      <Box>
        <Typography>Reference</Typography>
        <TextField
          id="outlined-multiline-static"
          fullWidth
          variant="outlined"
        />
      </Box>
      <Box>
        <Typography>Quantity</Typography>
        <TextField
          id="outlined-multiline-static"
          fullWidth
          variant="outlined"
        />
      </Box>

      <Box>
        <Typography>Price</Typography>
        <Box display="flex">
          <Box mr={2}>
            <Typography variant="caption">HT</Typography>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
            />
          </Box>
          <Box ml={2}>
            <Typography variant="caption">TTC</Typography>
            <TextField
              id="outlined-multiline-static"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Box>

      <Categories />

      <Box>
        <Typography>Active?</Typography>
        <ButtonGroup aria-label="outlined primary button group">
          <Button
            size="large"
            variant="contained"
            onClick={() => setActive(!active)}
            color={active ? "primary" : ""}
            className={active ? classes.buttonActive : ""}
          >
            YES
          </Button>
          <Button
            onClick={() => setActive(!active)}
            variant="contained"
            color={!active ? "primary" : ""}
            className={!active ? classes.buttonActive : ""}
          >
            NO
          </Button>
        </ButtonGroup>
      </Box>

      <Box mt={5} width={1}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
