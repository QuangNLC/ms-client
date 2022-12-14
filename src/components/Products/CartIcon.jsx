import React from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import "../../styles/cartIcon.css";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const state = useSelector((stateGlobal) => stateGlobal.GioHangReducer);
  const total = state.cart.reduce((amounTotal, item) => {
    return amounTotal + item.amount;
  }, 0);

  return (
    <React.Fragment>
      <Badge badgeContent={total} color="error">
        <Link to="/cart">
          <ShoppingCartIcon style={{ fontSize: "40px" }} />
        </Link>
      </Badge>
    </React.Fragment>
  );
};

export default CartIcon;
