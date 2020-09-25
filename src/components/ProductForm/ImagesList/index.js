import React from "react";

import { makeStyles, Grid } from "@material-ui/core";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import CardActionArea from "@material-ui/core/CardActionArea";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  card: {
    margin: 5,
    width: 150,
  },
  media: {
    height: 90,
    paddingTop: "56.25%", // 16:9
  },
  newImage: {
    margin: 5,
    display: "flex",
    width: 150,
    alignContent: "center",
    alignItems: "center",
    background: theme.palette.background.default,
  },

  newImageCard: {
    display: "flex",
    width: 150,
    background: "transparent",
    justifyContent: "center",
  },
  input: {
    display: "none",
  },
  imagesList: {
    overflow: "hidden",
  },
}));

export default function ImagesList({ setImage, setImagesList, imagesList }) {
  const classes = useStyles();

  const handleImage = (event) => {
    const newImage = event.target.files[0];
    setImage(newImage);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagesList([
          { id: Math.random().toString(), url: reader.result },
          ...imagesList,
        ]);
      }
    };

    reader.readAsDataURL(newImage);
  };
  return (
    <div className={classes.imagesList}>
      <GridList className={classes.gridList} cols={5}>
        <Grid
          component="label"
          htmlFor="raised-button-file"
          className={classes.newImage}
        >
          <Card className={classes.newImageCard} elevation={0}>
            <AddIcon color="action" fontSize="large" />
          </Card>
          <input
            accept="image/*"
            className={classes.input}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleImage}
          />
        </Grid>

        {imagesList &&
          imagesList.map((item) => (
            <GridListTile key={item.id}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={item.url} />
                </CardActionArea>
              </Card>
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}
