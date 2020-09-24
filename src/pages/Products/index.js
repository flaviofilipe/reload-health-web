import React, { useEffect, useState } from "react";
import { makeStyles, Container, Typography, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { TextField, Box } from "@material-ui/core";

import api from "../../services/api";
import TableCustomProducts from "../../components/TableCustomProducts";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  button: {
    color: "#fff",
  },
}));

export default function Pdocuts() {
  const classes = useStyles();
  const [query, setQuery] = useState("");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const findProduct = async () => {
      const { data } = await api.get("products?q=" + query);
      setProducts(data);
    };
    findProduct();
  }, [query]);

  async function getProducts() {
    const { data } = await api.get("products");
    setProducts(data);
  }
  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h4" color="textSecondary">
          Product list
        </Typography>
        <Button
          href="create"
          className={classes.button}
          variant="contained"
          color="primary"
        >
          <AddIcon />
          Add product
        </Button>

        <Box py={6}>
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            onChange={(value) => setQuery(value.target.value)}
          />
        </Box>
        <TableCustomProducts data={products} />
      </Container>
    </div>
  );
}
