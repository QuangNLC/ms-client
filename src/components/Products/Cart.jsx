import React from "react";
import "../../styles/cart.css";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Divider from "@mui/material/Divider";
import { formatter } from "../../utils";
import { Button } from "@mui/material";

const Cart = () => {
  const state = useSelector((stateGlobal) => stateGlobal.GioHangReducer);
  const dispatch = useDispatch();
  const itemOrder = state.cart;
  console.log(itemOrder, "nghia nghia ");
  const DecreaseAmount = (id) => {
    dispatch({ type: "DECREASE_AMOUNT", payload: id });
  };
  const IncreaseAmount = (id) => {
    dispatch({ type: "INCREASE_AMOUNT", payload: id });
  };
  const DeleteProduct = (item) => {
    dispatch({ type: "DELETE_PRODUCT", payload: item });
  };

  const totals = itemOrder.reduce((total, item) => {
    return total + item.thanhTien;
  }, 0);

  const itemCartList = () => {
    return itemOrder.map((item, index) => {
      return (
        <div key={index} className="item-cart">
          <div className="product-image">
            <img src={item.image} width="90%" height="130px" />
          </div>
          <div className="product-details">
            <p className="product-description">
              {item.desc.substring(0, 100) + " ..."}
            </p>
          </div>
          <div className="product-price">{formatter.format(item.price)}</div>
          <div className="product-quantity">
            <RemoveIcon
              sx={{ marginRight: 2 }}
              onClick={() => {
                DecreaseAmount(item.maSP);
              }}
            />
            <span>{item.amount}</span>
            <AddIcon
              sx={{ marginLeft: 2 }}
              onClick={() => IncreaseAmount(item.maSP)}
            />
          </div>
          <div className="product-line-price">
            {formatter.format(item.thanhTien)}
          </div>
          <div className="product-removal">
            <DeleteIcon
              color="error"
              fontSize="large"
              onClick={() => DeleteProduct(item.maSP)}
            />
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className="column-labels">
        <label className="product-image">Hình ảnh</label>
        <label className="product-details">Mô tả</label>
        <label className="product-price">Giá</label>
        <label className="product-quantity">Số lượng</label>
        <label className="product-removal">Thành tiền</label>
        <label className="product-line-price">Lựa chọn</label>
      </div>
      <Divider />
      <div className="shopping-cart">
        {/*  */}
        <div className="product-cart-order">{itemCartList()}</div>
      </div>
      <Divider />

      <div className="totals-order">
        <div className="title-totals">
          <label>Tiền mua sản phẩm : </label>
          <label>Thuế VAT (10%) : </label>
          <label>Tổng tiền thanh toán : </label>
        </div>
        <div>
          <p>{formatter.format(totals)}</p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="btn-checkout">
        <Button variant="outlined">Thanh Toán</Button>
      </div>
    </div>
  );
};

export default Cart;
