import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Alert, CardActionArea } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const CardItem = (item) => {
  const [isActiveHeart, setActiveIsHeart] = React.useState(false);
  const state = useSelector((stateGlobal) => stateGlobal.GioHangReducer);
  const dispatch = useDispatch();
  const itemByID = state.cart.map((i) => i.maSP);

  const buyItemCard = (itemCart) => {
    console.log(itemByID.includes(itemCart.maSP), "buyItemCard");
    if (itemByID.includes(itemCart.maSP)) {
      alert("Sản phẩm đã được thêm vào giỏ hàng ");
    } else {
      dispatch({ type: "BUY_ITEM", payload: itemCart });
    }
  };
  const detailItemCart = (itemCart) => {
    dispatch({ type: "DETAIL_CART", payload: itemCart });
  };
  return (
    <React.Fragment>
      <Card
        sx={{ maxWidth: 295, marginLeft: 2, marginTop: 5, height: 470 }}
        className="formCardLayout"
      >
        <div>
          <Link to="/productdetail">
            <CardActionArea onClick={() => detailItemCart(item)}>
              <CardMedia
                component="img"
                height="220"
                image={item.item.image}
                alt="image product"
              />
            </CardActionArea>
          </Link>

          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {item.item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.item.desc.substring(0, 160) + " ...."}
            </Typography>
          </CardContent>
        </div>
        <CardActions>
          <div className="buttonCard">
            {item.item.like ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={() => setActiveIsHeart(!isActiveHeart)}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                onClick={() => setActiveIsHeart(!isActiveHeart)}
              />
            )}

            <Button
              size="small"
              onClick={() => buyItemCard(item.item)}
              variant="outlined"
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default CardItem;
