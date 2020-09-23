import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  InputAdornment,
  Button,
  ButtonGroup,
} from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

import ProductForm from "../../components/ProductForm";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "120vh",
  },
  category: {
    width: "100%",
    maxWidth: 360,
  },
  form: {
    marginTop: theme.spacing(5),
    "& .MuiTextField-root": {
      paddingBottom: theme.spacing(2),
    },
  },
  button: {
    color: "#fff",
    width: "100%",
  },

  buttonActive: {
    color: "#fff",
  },
}));

const NewProduct = () => {
  const classes = useStyles();

  return <ProductForm />;
};

export default NewProduct;
