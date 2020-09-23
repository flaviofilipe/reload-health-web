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

export default function NewProduct({ product }) {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [resume, setResume] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [ref, setReference] = useState("");
  const [price_ht, setPriceHt] = useState(0);
  const [price_ttc, setPriceTtc] = useState(0);
  const [checked, setChecked] = React.useState([]);

  let history = useHistory();

  useEffect(() => {
    async function getCategories() {
      const { data } = await api.get("categories");
      setCategories(data);
    }
    getCategories();
  }, []);

  useEffect(() => {
    function setDefaultValues() {
      if (product) {
        setName(product.name);
        setResume(product.resume);
        setDescription(product.description);
        setActive(product.active);
        setQuantity(product.quantity);
        setReference(product.ref);
        setPriceHt(product.price_ht);
        setPriceTtc(product.price_ttc);
      }
    }
    setDefaultValues();
  }, [product]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  async function submit(e) {
    e.preventDefault();
    const data = {
      name,
      resume,
      description,
      active,
      quantity,
      ref,
      price_ht,
      price_ttc,
    };

    try {
      if (product && product.id) {
        await api.put("products/" + product.id, data);
      } else {
        await api.post("products", data);
      }
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h4" color="textSecondary">
          Product list
        </Typography>

        <form onSubmit={submit}>
          <Grid container>
            <Grid item={true} md={9} xs={12}>
              <Box
                className={classes.root}
                mr={3}
                p={5}
                border={1}
                borderColor="grey.500"
              >
                <Typography>Name</Typography>
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  multiline
                  variant="outlined"
                  name="resume"
                  value={name}
                  onChange={(value) => setName(value.target.value)}
                />
                <Typography>Resume</Typography>
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  name="resume"
                  value={resume}
                  onChange={(value) => setResume(value.target.value)}
                />
                <Typography>Description</Typography>
                <TextField
                  id="outlined-multiline-static"
                  fullWidth
                  multiline
                  rows={10}
                  variant="outlined"
                  name="description"
                  value={description}
                  onChange={(value) => setDescription(value.target.value)}
                />
              </Box>
            </Grid>
            <Grid item={true} md={3} xs={12}>
              <Box ml={2}>
                <Box>
                  <Typography>Reference</Typography>
                  <TextField
                    id="outlined-multiline-static"
                    fullWidth
                    variant="outlined"
                    name="ref"
                    value={ref}
                    onChange={(value) => setReference(value.target.value)}
                  />
                </Box>
                <Box>
                  <Typography>Quantity</Typography>
                  <TextField
                    id="outlined-multiline-static"
                    fullWidth
                    variant="outlined"
                    name="quantity"
                    value={quantity}
                    onChange={(value) => setQuantity(value.target.value)}
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
                        name="hc"
                        value={price_ht}
                        onChange={(value) => setPriceHt(value.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">€</InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box mr={2}>
                      <Typography variant="caption">TTC</Typography>
                      <TextField
                        id="outlined-multiline-static"
                        fullWidth
                        variant="outlined"
                        name="price_ttc"
                        value={price_ttc}
                        onChange={(value) => setPriceTtc(value.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">€</InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Typography>Categories</Typography>
                  <Box border={1} p={3} borderColor="grey.500">
                    <Box>
                      <List className={classes.category}>
                        {categories.map((value) => {
                          return (
                            <ListItem
                              key={value.id}
                              role={undefined}
                              dense
                              button
                              onClick={handleToggle(value.id)}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(value.id) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": value.name }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={value.id}
                                primary={value.name}
                              />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Typography>Active?</Typography>
                  <ButtonGroup aria-label="outlined primary button group">
                    <Button
                      size="large"
                      variant="contained"
                      name="active"
                      onClick={(e) => {
                        setActive(true);
                      }}
                      color={active ? "primary" : ""}
                      className={active ? classes.buttonActive : ""}
                      value={active}
                    >
                      YES
                    </Button>
                    <Button
                      name="active"
                      onClick={(e) => {
                        setActive(false);
                      }}
                      variant="contained"
                      color={!active ? "primary" : ""}
                      className={!active ? classes.buttonActive : ""}
                      value={active}
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
                    type="submit"
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
