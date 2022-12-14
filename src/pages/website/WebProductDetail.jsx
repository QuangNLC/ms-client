import React, { useEffect, useState } from 'react'
import { Add, Remove } from '@mui/icons-material'
import Helmet from '../../components/Helmet'
import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import productAPI from '../../api/productsAPI'
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import { formatter } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/actions/CartReducerAtion'
import { message, notification, Tag } from 'antd';

const Container = styled.div``
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`
const ImageContainer = styled.div`
    flex: 1;
    width : 50%;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    object-position: top;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
`
const Title = styled.h1`
    font-weight: 400;
    font-size: 36px;
    
`
const Rating = styled.div``

const Desc = styled.div`
    margin: 20px 0;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    display:flex;
    justify-content: space-between;
`
const Filter = styled.div`
    display:flex;
    align-items:center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;

`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 10px;
    cursor: pointer;
    background-color: ${props => props.color};
    margin-top: 30px;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option`
`
const FilterSizeOptionQuantity = styled.div``
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const AmountContainer = styled.div`
    display: flex;
    align-items:center;
    font-weight: 700;
    margin-top: 30px;
`
const Amount = styled.div`
    width:60px;
    height:30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    padding: 5px;
`
const AmountInput = styled.input`
    width :100%;
    height: 100%;
    border:none;
    outline: none;
`

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`
const ShowedImage = styled.div`

`

const PreviewImageList = styled.div`
    width: 100%;
`
const ImageList = styled.ul`
    width: 100%;
    display: flex;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    overflow: hidden;

`
const ImageListItem = styled.li`
    width: 120px;
    height: 180px;
    margin: 0px 10px;
`
const ImageListDetail = styled.img`
    width: 100%;
    height: 100%;
    object-fit:cover;
    cursor: pointer; 
`

const ButtonContainer = styled.div`
    width: 50%;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};


const checkPr = (prm) => {
    let result = false;
    let now = new Date();
    if (prm.isactive) {
        result = (now >= new Date(prm.date_after) && now <= new Date(prm.date_befor))
    }

    return result
}

const ProductDetail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [isDiscount, setIsDiscount] = useState(false);
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const isAuth = useSelector(state => state.auth.isAuth);
    const [previewImg, setPreviewImg] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        if (isAuth) {
            const payload = {
                size: product.productsizes,
                selectedSize: product.productsizes[selectedSizeIndex],
                quantity: selectedQuantity,
                price: product.export_price,
                product: {
                    ...product
                }
            }
            console.log(payload)
            message.success("Thêm sản phẩm vào giỏ hàng thành công!")
            dispatch(addToCart(payload))
        } else {
            navigate("/login")
        }

    };

    const handleBuyNow = (product) => {
        if (isAuth) {
            const payload = {
                size: product.productsizes,
                selectedSize: product.productsizes[selectedSizeIndex],
                quantity: selectedQuantity,
                price: product.export_price,
                product: {
                    ...product
                }
            }
            console.log(payload)
            message.success("Thêm sản phẩm vào giỏ hàng thành công!")
            dispatch(addToCart(payload))
            navigate("/cart")
        } else {
            navigate("/login")
        }

    };

    const hanleChangeSize = (value) => {
        console.log(value)
        setSelectedSizeIndex(value)
    }

    const onClickChangeQuantity = (value) => {
        if (value <= 0) {
            setSelectedQuantity(1)
        } else if (value > product.productsizes[selectedSizeIndex].quantity) {
            setSelectedQuantity(product.productsizes[selectedSizeIndex].quantity)
            openNotificationWithIcon('warning', 'Thông báo', `Trong kho hiện  còn lại ${product.productsizes[selectedSizeIndex].quantity}  sản phẩm!`)
        } else {
            setSelectedQuantity(value % 1 === 0 ? value : Math.floor(value))
        }
    }

    const onChangeQuantity = (e) => {
        if (e.target.value <= 0) {
            setSelectedQuantity(1);
        } else if (e.target.value > product.productsizes[selectedSizeIndex].quantity) {
            setSelectedQuantity(product.productsizes[selectedSizeIndex].quantity)
            openNotificationWithIcon('warning', 'Thông báo', `Trong kho hiện  còn lại ${product.productsizes[selectedSizeIndex].quantity}  sản phẩm!`)
        }
        setSelectedQuantity(e.target.value);
    }


    useEffect(() => {
        if (product && product.promotions) {
            if (product.promotions.length > 0) {
                if (checkPr(product.promotions[0].promition)) {
                    console.log(product.promotions[0])
                    setIsDiscount(
                        true
                    )
                }

            } else {
                setIsDiscount(false)
            }
        }
    }, [product])

    useEffect(() => {
        setIsLoading(true)
        productAPI.getProduct(id)
            .then((res) => {
                if (!res.status) {
                    setIsLoading(false);
                    setProduct(res);
                    setPreviewImg(`http://localhost:8080/api/file/images/${res.images[0].photo}`);
                    setSelectedSizeIndex(0)
                } else {
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])
    return (
        <Helmet
            title="ManShop - Sản Phẩm"
        >
            <Container>
                <Wrapper>
                    {
                        isLoading ?
                            (
                                <Skeleton>
                                    Loading...
                                </Skeleton>
                            ) :
                            (
                                <>
                                    <ImageContainer>
                                        <ShowedImage>
                                            <Image src={previewImg} />
                                        </ShowedImage>
                                        <PreviewImageList>
                                            <ImageList>
                                                {
                                                    product.images && product.images.map((item, index) => {
                                                        return (
                                                            <ImageListItem key={index} onClick={() => { setPreviewImg(`http://localhost:8080/api/file/images/${item.photo}`) }}>
                                                                <ImageListDetail src={`http://localhost:8080/api/file/images/${item.photo}`} />
                                                            </ImageListItem>
                                                        )
                                                    })
                                                }

                                            </ImageList>
                                        </PreviewImageList>
                                    </ImageContainer>

                                    <InfoContainer>
                                        <Title>{product?.name}</Title>
                                        <Rating>

                                        </Rating>
                                        <Desc>Giới thiệu đến bạn chiếc áo đảm bảo sự thanh lịch mã vẫn đảm bảo được sự vừa vặn và thoải mái, Coolmate đã có những cải tiến để đem đến cho bạn chiếc áo tốt hơn đó chính là với chất liệu Cotton USA chất lượng cao. Đem đến cho bạn chiếc áo với phiên bản cải tiến hơn và trải nghiệm thực sự ổn so với những chiếc áo bạn đang mặc; và chắc chắn đây sẽ là chiếc áo đưa sự thoải mái lên hàng đầu.</Desc>
                                        {isDiscount && <Tag color="magenta">{`- ${product?.promotions[0]?.promition?.by_persent}  %`}</Tag>}
                                        {isDiscount && <Tag color="orange">{`Khuyến Mại: ${product?.promotions[0]?.promition?.title}`}</Tag>}
                                        {
                                            isDiscount ?
                                                (
                                                    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                                        <Price>{formatter.format(product.export_price - product.export_price * (product?.promotions[0]?.promition?.by_persent / 100))}</Price>
                                                        <Price style={{ marginLeft: 20, textDecoration: 'line-through' }}>{formatter.format(product?.export_price)}</Price>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <Price>{formatter.format(product?.export_price)}</Price>
                                                )
                                        }
                                        <FilterContainer>
                                            <Filter>
                                                <FilterTitle>Size</FilterTitle>
                                                <FilterSize onChange={(e) => hanleChangeSize(e.target.value)}>
                                                    {
                                                        product?.productsizes.map((item, index) => (
                                                            <React.Fragment key={item.id}>
                                                                <FilterSizeOption value={index}>{item.size.title}</FilterSizeOption>
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                </FilterSize>
                                            </Filter>
                                        </FilterContainer>
                                        <AddContainer style={{ textAlign: "center" }}>
                                            <AmountContainer>
                                                <Remove onClick={() => { onClickChangeQuantity(selectedQuantity - 1) }} />
                                                <Amount>
                                                    <AmountInput
                                                        type='number'
                                                        style={{ textAlign: "center" }}
                                                        value={selectedQuantity}
                                                        onChange={onChangeQuantity}
                                                        onBlur={(e) => {
                                                            if (e.target.value <= 0) {
                                                                setSelectedQuantity(1)
                                                            } else if (e.target.value > product.productsizes[selectedSizeIndex].quantity) {
                                                                setSelectedQuantity(product.productsizes[selectedSizeIndex].quantity)
                                                            } else {
                                                                setSelectedQuantity(e.target.value % 1 === 0 ? e.target.value : Math.floor(e.target.value))
                                                            }
                                                        }}
                                                    />
                                                </Amount>
                                                <Add onClick={() => { onClickChangeQuantity(selectedQuantity + 1) }} />
                                            </AmountContainer>
                                        </AddContainer>
                                        <ButtonContainer>
                                            <Button style={{ borderRadius: "30px" }} onClick={() => { handleAddToCart(product) }}>Thêm Vào Giỏ Hàng</Button>
                                            <Button style={{ borderRadius: "30px", marginLeft: "0px" }} onClick={() => { handleBuyNow(product) }}> Mua Ngay</Button>
                                        </ButtonContainer>
                                    </InfoContainer></>
                            )
                    }

                </Wrapper>
            </Container>
        </Helmet >
    )
}

export default ProductDetail