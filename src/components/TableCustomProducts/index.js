import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { TextField, Box } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MenuIcon from "@material-ui/icons/Menu";
import api from "../../services/api";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function TableCustom({ data }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [productOptions, setProductOptions] = useState({});
  let history = useHistory();

  const handleClick = (event, product) => {
    setProductOptions(product);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function deleteProduct() {
    await api.delete("products/" + productOptions.id).then(() => {
      const toRemoveIndex = data.findIndex(
        (element) => element.id === productOptions.id
      );

      data.splice(toRemoveIndex, 1);
    });
    handleClose();
  }

  const StyledMenuItem = withStyles((theme) => ({}))(MenuItem);

  const Options = () => {
    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        elevation={1}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem
          onClick={() => {
            history.push("/edit/" + productOptions.id);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </StyledMenuItem>
        <StyledMenuItem onClick={deleteProduct}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Remove" />
        </StyledMenuItem>
      </Menu>
    );
  };

  return (
    <div>
      <Box py={3}>
        <TextField id="search" label="Search" variant="outlined" />
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="right">Image</StyledTableCell>
              <StyledTableCell align="right">Réf.</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Price HT</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Active</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="right">{row.id}</StyledTableCell>
                <StyledTableCell align="right">{row.image}</StyledTableCell>
                <StyledTableCell align="right">{row.ref}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.categories.length > 0 && row.categories[0].name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.price_ht}</StyledTableCell>
                <StyledTableCell align="right">{row.price_ttc}</StyledTableCell>
                <StyledTableCell align="right">
                  <FiberManualRecordIcon
                    color={row.active ? "primary" : "error"}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <MenuIcon
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(e) => handleClick(e, row)}
                  />
                  <Options product={row} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
