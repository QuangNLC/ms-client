// import React, { useState } from "react";
// import styled from "styled-components";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import CartIcon from "./Products/CartIcon";
// import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
// import { useDispatch, useSelector } from "react-redux";
// import Badge from '@mui/material/Badge';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { logOutAction } from "../redux/actions/AuthReducerAction";
// import { clearCartAction } from "../redux/actions/CartReducerAtion";
// import { Input } from 'antd';

// const Container = styled.div`
//   position: fixed;
//   top: 0;
//   width: 100%;
//   overflow: hidden;
//   background-color: white;
//   color: white;
//   z-index: 10;
// `;
// const TopWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   height: 80px;
// `
// const NavigationWrapper = styled.div`
//   width: 100%;
//   background-color: black;
//   height: 60px;
//   display: flex;
//   align-items: center;
//   justity-content: flex-start;
//   padding-left: 120px;
// `

// const Left = styled.div``;
// const Logo = styled.h1`
//   text-transform: uppercase;
//   font-size: 30px;
//   letter-spacing:4px;
//   color: bladck;
//   width: 240px;
//   text-align: center;
//   text-shadow: 0 1px 0 hsl(174, 5%, 80%), 0 2px 0 hsl(174, 5%, 75%),
//     0 3px 0 hsl(174, 5%, 70%), 0 4px 0 hsl(174, 5%, 66%),
//     0 5px 0 hsl(174, 5%, 64%), 0 6px 0 hsl(174, 5%, 62%),
//     0 7px 0 hsl(174, 5%, 61%), 0 8px 0 hsl(174, 5%, 60%),
//     0 0 5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.2),
//     0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2),
//     0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.3);
// `;
// const Right = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
// `;
// const Navigation = styled.ul`
//   width: 100%;
//   display: flex;
//   justify-content: flex-start;
//   margin-bottom: 0;
// `;
// const NavItem = styled.li`
//   padding: 5px 10px;
//   font-size: 18px;
//   font-weight: ${(props) => (props.active ? "400" : "300")};
//   color: ${(props) => (props.active ? "red" : "white")};
//   text-transform: uppercase;
//   border-radius: 5px;
//   margin: 0px 5px;
//   transition: all 0.25s ease-in;
//   cursor: pointer;
//   &:hover {
//     color: red;
//   }
// `;

// const BuyMenu = styled.div`
//   display: flex;
// `;
// const SearchContainer = styled.div`
//   margin-right: 20px;
//   width: 100%;
//   display: flex;
//   align-items: center;
// `
// const CartContainer = styled.div`
//   width: 80px;
//   height: 80px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
// `;
// const AuthContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex: 1;
// `;
// const AvatarImg = styled.img`
//   width: 40px;
//   height: 40px;
//   margin: 0 10px;
//   border-radius: 50%;
//   object-fit: cover;
//   cursor: pointer;
// `

// const Button = styled.div`
//   background-color: white;
//   color: black;
//   padding: 10px;
//   border: none;
//   border-radius: 5px;
//   margin: 0px 5px;
//   cursor: pointer;
//   font-size: 16px;
//   font-weight: 300;
//   transition: all 0.25s ease-in;
//   width: max-content;
//   text-decoration: underline;
//   &:hover {
//     background-color: #333333;
//     color: white;
//   }
// `;

// const AvatarContainer = ({ auth }) => {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const dispatch = useDispatch();
//   const open = Boolean(anchorEl);
//   const navigate = useNavigate()
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleClickLogOut = () => {
//     navigate("/")
//     dispatch(clearCartAction())
//     dispatch(logOutAction())
//   };



//   return (
//     <>
//       <AvatarImg src={`http://localhost:8080/api/file/images/${auth.info.photo}`} onClick={handleClick} />
//       <Menu
//         id="basic-menu"
//         open={open}
//         onClose={handleClose}
//         anchorEl={anchorEl}

//       >
//         <MenuItem onClick={handleClose}>
//           <Link to="my-account" style={{ color: 'black' }}>
//             Tài Khoản Của Tôi
//           </Link>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <Link to="my-orders" style={{ color: 'black' }}>
//             Đơn Hàng Của Tôi
//           </Link>
//         </MenuItem>
//         {auth?.info?.roles?.rolename && (auth?.info?.roles?.rolename === "ROLE_ADMIN") &&
//           <MenuItem onClick={handleClose}>
//             <Link to="/admin" style={{ color: 'black' }}>
//               Trang Quản Trị
//             </Link>
//           </MenuItem>
//         }
//         <MenuItem onClick={handleClickLogOut}>
//           Đăng Xuất
//         </MenuItem>
//       </Menu>
//     </>
//   )
// }

// const Header = () => {
//   const isAuth = useSelector(state => state.auth.isAuth);
//   const auth = useSelector(state => state.auth.auth);
//   const cartReducer = useSelector(state => state.cartReducer);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const onSearch = (value) => {
//     if(value.trim() !== ''){
//       navigate(`/products/search=${value}`)
//     }else{
//       navigate('/products')
//     }
//   }
//   return (
//     <Container>
//       <TopWrapper>
//         <Left>
//           <Link to="/">
//             <Logo> man shop</Logo>
//           </Link>
//         </Left>
//         <Right>
//           <BuyMenu>
//             <SearchContainer>
//               <Input.Search
//                 placeholder="Tìm kiếm"
//                 onSearch={onSearch}
//                 style={{
//                   width: 200,
//                 }}
//               />
//             </SearchContainer>
//             <CartContainer>
//               {/* <CartIcon style={{ fontSize: "20px" }} /> */}
//               <Link to="/cart">
//                 {
//                   cartReducer.cart ? (
//                     <Badge badgeContent={cartReducer.cart.length} color="primary">
//                       <LocalMallOutlinedIcon color="action" />
//                     </Badge>
//                   )
//                     :
//                     (
//                       <Badge badgeContent={0} color="primary">
//                         <LocalMallOutlinedIcon color="action" />
//                       </Badge>
//                     )
//                 }

//               </Link>
//             </CartContainer>
//             <AuthContainer>
//               {isAuth ? (
//                 <AvatarContainer auth={{ ...auth }}>
//                 </AvatarContainer>
//               ) : (
//                 <>
//                   <Link to="/login">
//                     <Button>Đăng Nhập</Button>
//                   </Link>
//                   <Link to="/register">
//                     <Button>Đăng Ký</Button>
//                   </Link>
//                 </>
//               )}
//             </AuthContainer>
//           </BuyMenu>
//         </Right>
//       </TopWrapper>
//       <NavigationWrapper>
//         <Navigation>
//           <Link to="/" className="">
//             <NavItem active={location.pathname === "/"}>Trang chủ</NavItem>
//           </Link>
//           <Link to="/products" className="">
//             <NavItem active={location.pathname === "/products"}>Sản phẩm</NavItem>
//           </Link>
//           <Link to="/about-us" className="">
//             <NavItem active={location.pathname === "/about-us"}>Giới thiệu</NavItem>
//           </Link>
//           <Link to="/contact" className="">
//             <NavItem active={location.pathname === "/contact"}>Liên hệ</NavItem>
//           </Link>
//         </Navigation>
//       </NavigationWrapper>
//     </Container >
//   );
// };

// export default Header;


import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartIcon from "./Products/CartIcon";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { useDispatch, useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { logOutAction } from "../redux/actions/AuthReducerAction";
import { clearCartAction } from "../redux/actions/CartReducerAtion";
import { Input } from "antd";

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  overflow: hidden;
  background-color: white;
  color: white;
  z-index: 10;
`;
const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;
const NavigationWrapper = styled.div`
  width: 100%;
  background-color: black;
  height: 60px;
  display: flex;
  align-items: center;
  justity-content: flex-start;
`;

const Left = styled.div``;
const Logo = styled.h1`
  text-transform: uppercase;
  margin-left: 50px;
  font-size: 35px;
  letter-spacing: 5px;
  color: black;
  width: 240px;
  text-align: center;
  text-shadow: 0 1px 0 hsl(174, 5%, 80%), 0 2px 0 hsl(174, 5%, 75%),
    0 3px 0 hsl(174, 5%, 70%), 0 4px 0 hsl(174, 5%, 66%),
    0 5px 0 hsl(174, 5%, 64%), 0 6px 0 hsl(174, 5%, 62%),
    0 7px 0 hsl(174, 5%, 61%), 0 8px 0 hsl(174, 5%, 60%),
    0 0 5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.2),
    0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.3);
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Navigation = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 0;
`;
const NavItem = styled.li`
  padding: 5px 10px;
  font-size: 18px;
  font-weight: ${(props) => (props.active ? "400" : "300")};
  color: ${(props) => (props.active ? "#cbba9c" : "white")};
  text-transform: uppercase;
  margin: 5px 5px;
  transition: all 0.25s ease-in;
  cursor: pointer;
  &:hover {
    color: #cbba9c;
  }
`;

const BuyMenu = styled.div`
  display: flex;
`;
const SearchContainer = styled.div`
  margin-right: 20px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const CartContainer = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const AvatarImg = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 10px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const Button = styled.div`
  background-color: white;
  color: black;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin: 0px 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 300;
  transition: all 0.25s ease-in;
  width: max-content;
  text-decoration: underline;
  &:hover {
    background-color: #333333;
    color: white;
  }
`;

const AvatarContainer = ({ auth }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogOut = () => {
    navigate("/");
    dispatch(clearCartAction());
    dispatch(logOutAction());
  };

  return (
    <>
      <AvatarImg
        src={`http://localhost:8080/api/file/images/${auth.info.photo}`}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}>
        <MenuItem onClick={handleClose}>
          <Link to="my-account" style={{ color: "black" }}>
            Tài Khoản Của Tôi
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="my-orders" style={{ color: "black" }}>
            Đơn Hàng Của Tôi
          </Link>
        </MenuItem>
        {auth?.info?.roles?.rolename &&
          auth?.info?.roles?.rolename === "ROLE_ADMIN" && (
            <MenuItem onClick={handleClose}>
              <Link to="/admin" style={{ color: "black" }}>
                Trang Quản Trị
              </Link>
            </MenuItem>
          )}
        <MenuItem onClick={handleClickLogOut}>Đăng Xuất</MenuItem>
      </Menu>
    </>
  );
};

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const auth = useSelector((state) => state.auth.auth);
  const cartReducer = useSelector((state) => state.cartReducer);
  const location = useLocation();
  const navigate = useNavigate();
  const onSearch = (value) => {
    if (value.trim() !== "") {
      navigate(`/products/search=${value}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <Container>
      <TopWrapper>
        <Left>
          <Link to="/">
            <Logo> man shop</Logo>
          </Link>
        </Left>
        <Right>
          <BuyMenu>
            <SearchContainer>
              <Input.Search
                placeholder="Tìm kiếm"
                onSearch={onSearch}
                style={{
                  width: 300,
                }}
              />
            </SearchContainer>
            <CartContainer>
              {/* <CartIcon style={{ fontSize: "20px" }} /> */}
              <Link to="/cart">
                {cartReducer.cart ? (
                  <Badge badgeContent={cartReducer.cart.length} color="primary">
                    <LocalMallOutlinedIcon color="action" />
                  </Badge>
                ) : (
                  <Badge badgeContent={0} color="primary">
                    <LocalMallOutlinedIcon color="action" />
                  </Badge>
                )}
              </Link>
            </CartContainer>
            <AuthContainer>
              {isAuth ? (
                <AvatarContainer auth={{ ...auth }}></AvatarContainer>
              ) : (
                <>
                  <Link to="/login">
                    <Button>Đăng Nhập</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Đăng Ký</Button>
                  </Link>
                </>
              )}
            </AuthContainer>
          </BuyMenu>
        </Right>
      </TopWrapper>
      <NavigationWrapper>
        <Navigation>
          <Link to="/" className="">
            <NavItem active={location.pathname === "/"}>Trang chủ</NavItem>
          </Link>
          <Link to="/products" className="">
            <NavItem active={location.pathname === "/products"}>
              Sản phẩm
            </NavItem>
          </Link>
          <Link to="/about-us" className="">
            <NavItem active={location.pathname === "/about-us"}>
              Giới thiệu
            </NavItem>
          </Link>
          <Link to="/contact" className="">
            <NavItem active={location.pathname === "/contact"}>Liên hệ</NavItem>
          </Link>
        </Navigation>
      </NavigationWrapper>
    </Container>
  );
};

export default Header;