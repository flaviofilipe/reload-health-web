import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Container,
  Typography,
  Button,
  Input,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import api from "../../services/api";
import TableCustomProducts from "../../components/TableCustomProducts";

function createData(
  id,
  image,
  ref,
  name,
  category,
  price_ht,
  price_ttc,
  active
) {
  return { id, image, ref, name, category, price_ht, price_ttc, active };
}

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

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

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
        <TableCustomProducts data={products} />
      </Container>
    </div>
  );
}
