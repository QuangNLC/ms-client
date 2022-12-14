import React, { useState } from 'react'
import styled from 'styled-components'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { formatter } from "../utils";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/CartReducerAtion';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Badge, message, Tooltip } from 'antd';
import { useEffect } from 'react';

const HoverOptionsContainer = styled.div`
    position:absolute;
    overflow: hidden;
    bottom: 10px;
    left:50%;
    display:flex;
    transform: translateX(-50%) translateY(120%);
    transition: all 0.25s ease-in;
    z-index: -1;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
`
const Container = styled.div`
    width: 20%;
    height: 520px;
    padding: 20px;
    display:flex;
    justify-content: center;
    transition: all 0.25s ease-in;
    margin-bottom: 80px;
    &:hover ${HoverOptionsContainer}{
        transform:translateX(-50%);
        z-index: 1;
    }
    &:hover ${Image}{
       opacity: 0.75;
    }
`
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    border: 0.5px solid rgba(0, 0,0 ,.2);
`
const DiscountWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 30%;
    height: 30px;
    background-color: rgba(219, 82, 64, 0.75);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
`
const ImgContainer = styled.div`
    width: 100%;
    height: 380px;
    position: relative;
`


const HoverOption = styled.div`
    width: 50px;
    height: 50px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border : 0.5px solid #666;
    transition: all 0.25s ease-in;
    cursor: pointer;

    &:hover{
        background-color: red;
        color: white;
    }
`
const DetailContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-top: 1px solid teal;
`
const Title = styled.h2`
    height: 35px;
    overflow: hidden;
`
const PriceContainer = styled.div`
    display: flex;
    align-items:center;
    justify-content: space-between;
    margin-top: 10px;
`
const NewPrice = styled.div`
    color: red;
    font-weight: 500;
`
const OldPrice = styled.div`
    color: #999;
    text-decoration: line-through;
`

const checkPr = (prm) => {
    let result = false;
    let now = new Date();
    if (prm.isactive) {
        result = (now >= new Date(prm.date_after) && now <= new Date(prm.date_befor))
    }

    return result
}

const Product = ({ item }) => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDiscount, setIsDiscount] = useState(false)

    const handleClickAddToCart = (item) => {
        if (isAuth) {
            const payload = {
                size: item.productsizes,
                selectedSize: item.productsizes[0],
                quantity: 1,
                price: item.export_price,
                product: {
                    ...item
                }
            }
            message.success("Thêm sản phẩm vào giỏ hàng thành công!")
            dispatch(addToCart(payload))
        } else {
            navigate("/login")
        }
    };

    const handleBuyNow = (item) => {
        if (isAuth) {
            const payload = {
                size: item.productsizes,
                selectedSize: item.productsizes[0],
                quantity: 1,
                price: item.export_price,
                product: {
                    ...item
                }
            }
            dispatch(addToCart(payload))
            message.success("Thêm sản phẩm vào giỏ hàng thành công!")
            navigate('/cart')
        } else {
            navigate("/login")
        }
    }

    useEffect(() => {
        if (item && item.promotions) {
            if (item.promotions.length > 0) {
                if (checkPr(item.promotions[0].promition)) {
                    console.log(item.promotions[0])
                    setIsDiscount(
                        true
                    )
                }

            } else {
                setIsDiscount(false)
            }
        }
    }, [item])

    return (
        <Container>
            {isDiscount ?
                (
                    <Badge.Ribbon text={`- ${item?.promotions[0]?.promition?.by_persent}  %`} color="magenta">
                        <Wrapper>
                            <ImgContainer>
                                <Image src={item.images && `http://localhost:8080/api/file/images/${item.images[0].photo}`} />
                                <HoverOptionsContainer>
                                    <Tooltip title={"Thêm Vào Giỏ Hàng"} >
                                        <HoverOption onClick={() => handleClickAddToCart(item)}>
                                            <AddShoppingCartOutlinedIcon />
                                        </HoverOption>
                                    </Tooltip>
                                    <Tooltip title={"Mua Ngay"}>
                                        <HoverOption onClick={() => handleBuyNow(item)}><ShoppingCartCheckoutIcon /></HoverOption>
                                    </Tooltip>
                                    <Tooltip title={"Thông Tin Sản Phẩm"}>
                                        <Link to={`/product/${item.id}`} style={{ color: 'black' }}>
                                            <HoverOption><SearchOutlinedIcon /></HoverOption>
                                        </Link>
                                    </Tooltip>
                                </HoverOptionsContainer>
                            </ImgContainer>
                            <DetailContainer>
                                <Title>{item.name}</Title>
                                <PriceContainer>
                                    <NewPrice>{formatter.format(item.export_price - item.export_price * (item?.promotions[0]?.promition?.by_persent / 100))}</NewPrice>
                                    <OldPrice>{formatter.format(item.export_price)}</OldPrice>

                                </PriceContainer>
                            </DetailContainer>
                        </Wrapper>
                    </Badge.Ribbon>
                )
                :
                (
                    <Wrapper>
                        <ImgContainer>
                            <Image src={item.images && `http://localhost:8080/api/file/images/${item.images[0].photo}`} />
                            <HoverOptionsContainer>
                                <Tooltip title={"Thêm Vào Giỏ Hàng"} >
                                    <HoverOption onClick={() => handleClickAddToCart(item)}>
                                        <AddShoppingCartOutlinedIcon />
                                    </HoverOption>
                                </Tooltip>
                                <Tooltip title={"Mua Ngay"}>
                                    <HoverOption onClick={() => handleBuyNow(item)}><ShoppingCartCheckoutIcon /></HoverOption>
                                </Tooltip>
                                <Tooltip title={"Thông Tin Sản Phẩm"}>
                                    <Link to={`/product/${item.id}`} style={{ color: 'black' }}>
                                        <HoverOption><SearchOutlinedIcon /></HoverOption>
                                    </Link>
                                </Tooltip>
                            </HoverOptionsContainer>
                        </ImgContainer>
                        <DetailContainer>
                            <Title>{item.name}</Title>
                            <PriceContainer>
                                <NewPrice>{formatter.format(item.export_price)}</NewPrice>

                            </PriceContainer>
                        </DetailContainer>
                    </Wrapper>

                )
            }

        </Container>
    )
}

export default Product