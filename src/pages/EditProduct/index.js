import React, { useEffect, useState } from "react";

import ProductForm from "../../components/ProductForm";

import { useParams } from "react-router-dom";
import api from "../../services/api";

const EditProduct = () => {
  const [product, setProduct] = useState({});
  let { id } = useParams();
  useEffect(() => {
    async function getProduct() {
      const { data } = await api.get("products/" + id);
      setProduct(data);
    }
    getProduct();
  }, [id]);

  return <ProductForm product={product} />;
};

export default EditProduct;
