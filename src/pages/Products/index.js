import React, { useEffect, useState } from "react";
import { makeStyles, Container } from "@material-ui/core";

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

const rows = [
  createData(1, "", "T001", "Example name 1", "T-shirt", "15E", 125, true),
];

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: theme.palette.background.default,
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
        <TableCustomProducts data={products} />
      </Container>
    </div>
  );
}
