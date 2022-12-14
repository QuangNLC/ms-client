import React from "react";
import "../../styles/productDetail.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import { formatter } from "../../utils";

const ProductDetail = () => {
  const state = useSelector((stateGlobal) => stateGlobal.GioHangReducer);
  const itemCardDetail = state.productDetails.item;
  const itemByID = state.cart.map((i) => i.maSP);

  const [value, setValue] = React.useState(2);
  const dispatch = useDispatch();
  const buyItemCard = (itemCart) => {
    if (itemByID.includes(itemCart.maSP)) {
      alert("Sản phẩm đã được thêm vào giỏ hàng ");
    } else {
      dispatch({ type: "BUY_ITEM", payload: itemCart });
    }
  };
  return (
    <main>
      <div className="card">
        <div className="card__title">
          <div className="icon">
            <Link to="/products">
              <div className="iconBack">
                <ArrowBackIcon /> <p className="back">Quay về </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="card__body">
          <div className="half">
            <div className="featured_text">
              <h3>{itemCardDetail.title}</h3>
            </div>
            <div className="image">
              <img src={itemCardDetail.image} alt="" />
            </div>
          </div>
          <div className="half">
            <div className="description">
              <p>{itemCardDetail.desc}</p>
            </div>
            <div>
              <p className="price">
                {" "}
                Giá bán: {formatter.format(itemCardDetail.price)}
              </p>
              <p>Đánh giá</p>
              <Rating
                name="simple-controlled"
                value={itemCardDetail.rating}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
          </div>
        </div>
        <div className="card__footer">
          <div className="action">
            <Button
              variant="outlined"
              onClick={() => buyItemCard(itemCardDetail)}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
