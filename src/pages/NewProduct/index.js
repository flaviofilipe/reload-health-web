import React from "react";
import { makeStyles, Container, Typography, Grid } from "@material-ui/core";

import RightColumn from "./RightColumn";
import MainColumn from "./MainColumn";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "120vh",
    backgroundColor: theme.palette.background.default,
  },
  form: {
    marginTop: theme.spacing(5),
    "& .MuiTextField-root": {
      paddingBottom: theme.spacing(2),
    },
  },
}));

const NewProduct = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h4" color="textSecondary">
          Product list
        </Typography>

        <form className={classes.form}>
          <Grid container>
            <Grid md={9} xs={12}>
              <MainColumn />
            </Grid>
            <Grid border={1} md={3} xs={12}>
              <RightColumn />
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default NewProduct;
