import React, { useEffect, useState } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { Add, OtherHouses, Remove } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { formatter } from '../../utils';
import checkoutAPI from '../../api/checkoutAPI';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DialogHOC from '../../hoc/DialogHOC';
import { Link, useNavigate } from 'react-router-dom'
import { changeCartItemQuantity, changeCartItemQuantityAction, changeCartItemSizeAction, clearCartAction } from '../../redux/actions/CartReducerAtion'
import { notification, Drawer, Typography, Modal, Select, message, List, Button, Form, Input, Tag } from 'antd';
import { useForm } from 'antd/lib/form/Form'
import { CHANGE_CART_ITEM_QUANTITY, DELETE_CART_ITEM } from '../../redux/types'
import CustomerInfoForm from '../../components/CustomerInfoForm'
import addressAPI from '../../api/addressAPI'
import feeAPI from '../../api/feeAPI'
import axios from 'axios'
import momoPayment from '../../assets/imgs/techpayment.jpg'
import moment from 'moment'

const Container = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 100%;
`
const DeleteCartWrapper = styled.div`
    width:100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Bottom = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    background-color: white;
`
const Product = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 1px solid #999;
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 120px;
    object-fit: cover;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span`
    cursor: pointer;
    text-decoration: underline;
`
const ProductId = styled.span``
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`
const ProductSize = styled.span``
const PriceDetail = styled.span`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const QuantityButton = styled.div`
    width:  30px;
    height: 30px;
    border: 0.5px  solid  lightgray;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    width: max-content;
`

const AmountInput = styled.input`
    width:  120px;
    height: 100%;
    border:none;
    outline: none;   
    padding: 5px;
    text-align: center;
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`
const ProductAction = styled.div`
    display: flex;
    align-items: center;
`

const Summary = styled.div`
    flex:1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`
`
const SummaryItemPrice = styled.span``

const CartDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 80vh;
    margin-bottom: 50px;
`
const CartBody = styled.div`
`
const CartFooter = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: white;
    padding: 0px 30px;
    font-size: 20px;
`

const CustomerInfoContainer = styled.div`
    width: 50%;
    padding: 20px;
`
const PaymentContainer = styled.div`
    width: 100%;
`
const SummaryContainer = styled.div`
    width: 50%;
    padding: 20px;
`

const FormLocationGroup = styled.div`
    width: 100%;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const MoMoContainer = styled.div`
    width: 100%;
    display: flex;
`
const MoMoLeft = styled.div`
    flex: 1;
`
const MoMoRight = styled.div`
    flex: 2;
    margin-left: 20px;
`
const MoMoImg = styled.img`
    width: 100%;
    object-fit: contain;
`
const MoMoItem = styled.div`
    width: 100%;
    padding: 5px;
`
const MoMoItemLabel = styled.div`

`
const MoMoItemContent = styled.div``

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};

const checkPr = (product) => {
    let result = false;
    let now = new Date();
    if (product && product.promotions) {
        if (product.promotions.length > 0) {
            if (product.promotions[0]?.promition.isactive) {
                result = (now >= new Date(product.promotions[0]?.promition.date_after) && now <= new Date(product.promotions[0]?.promition.date_befor))
            }
        }
    }

    return result
}

const getDiscountPercent = (product) => {
    let result = 0
    if (product) {
        result = product.promotions[0]?.promition?.by_persent
    }
    return result
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const Webcart = () => {
    const cartReducer = useSelector(state => state.cartReducer);
    const [data, setData] = useState([]);
    const auth = useSelector(state => state.auth.auth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const [customerValue, setCustomerValue] = useState({
        adress: auth ? auth.info.adress : "",
        phone: auth ? auth.info.phone : "",
    });
    const [form] = useForm()
    const [cityData, setCityData] = useState([])
    const [selectedData, setSelectedData] = useState({
        cityId: null,
        districtId: null,
        wardId: null
    })
    const [useDefaultCustomer, setUseDefaultCustomer] = useState(false)
    const [payment, setPayment] = useState(1)
    const [randomText, setRandomText] = useState(`${moment(new Date()).format('DDMMYYYY')}${makeid(10)}`)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPayModal, setIsPayModal] = useState(true);
    const onChangeCity = (value) => {
        console.log(value)
        form.setFieldValue('districtId', null)
        form.setFieldValue('wardId', null)
        setSelectedData({
            cityId: value,
            districtId: null,
            wardId: null
        })
    }

    const onChangeDistrict = (value) => {
        form.setFieldValue('wardId', null)
        setSelectedData({
            ...selectedData,
            districtId: value,
            wardId: null
        })
    }

    const onChangeWard = (value) => {
        setSelectedData({
            ...selectedData,
            wardId: value
        })
    }


    const onFinish = (value) => {
        console.log('checkout', value)
        if (data && data.length > 0) {
            Modal.confirm({
                title: "Hộp Thoại Xác Nhận",
                content: "Xác nhận đặt hàng?",
                okText: "Xác Nhận",
                cancelText: "Hủy Bỏ",
                onOk: () => {
                    let checkoutPayload = {
                        "users": {
                            "username": auth.info.username
                        },
                        "total_price": data.reduce((total, item) => {
                            if (checkPr(item.product)) {
                                return total + item.quantity * (item.price - item.price * (getDiscountPercent(item.product) / 100))
                            } else {

                                return total + item.quantity * item.price
                            }
                        }, 0),
                        "customers": {
                            "phone": value.phone,
                            "name": value.name,
                            "note": value.note ? value.note : '',
                            "user": {
                                "username": auth.info.username
                            }

                        },
                        "orderDetail": [
                            ...data.map((item) => ({
                                product: {
                                    id: item.product.id
                                },
                                size: item.selectedSize.size.title,
                                quantity: item.quantity,
                                total_price: item.price * item.quantity
                            }))
                        ],
                        reduce_price: data.reduce((total, item) => {
                            if (checkPr(item.product)) {
                                return total + item.quantity * (item.price * (getDiscountPercent(item.product) / 100))
                            } else {
                                return total
                            }
                        }, 0),
                        methodpayment: value?.payment === 1 ? "Khi nhận đơn" : 'Chuyển khoản',
                        descriptions_payment: value?.payment === 1 ? "Thanh toán khi nhận hàng." : randomText,
                        cityId: value.cityId,
                        districtId: value.districtId,
                        wardId: value.wardId,
                        location: value.location
                    };
                    console.log(checkoutPayload)
                    checkoutAPI.checkout(checkoutPayload)
                        .then(res => {
                            if (!res.status) {
                                console.log(res);
                                dispatch(clearCartAction());
                                Modal.success({
                                    title: "Thành công",
                                    content: "Đơn đặt hàng của bạn đã được tạo thành công. Tự động chuyển trang đến đơn hàng của tôi!"
                                })
                                navigate("/my-orders")
                            }

                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
        }
    }



    const hanldeDeleteCartIem = (item) => {
        Modal.confirm({
            title: "Hộp Thoại Xác Nhận",
            content: "Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?",
            okText: "Xác Nhận",
            cancelText: "Hủy Bỏ",
            onOk: () => {
                const action = {
                    type: DELETE_CART_ITEM,
                    payload: item
                }
                openNotificationWithIcon('warning', 'Thông báo', `Xóa sản phẩm khỏi giỏ hàng!`);
                dispatch(action);
            }
        })

    }

    const handleClickUpdateCartItemQuantity = (item, newQuantity) => {
        if (newQuantity <= 0) {
            let action = {
                type: DELETE_CART_ITEM,
                payload: item
            };
            dispatch(action);
        } else {
            if (newQuantity > item.selectedSize.quantity) {
                openNotificationWithIcon('warning', 'Thông báo', `Trong kho hiện  còn lại ${item.selectedSize.quantity}  sản phẩm!`);
                let action = {
                    type: CHANGE_CART_ITEM_QUANTITY,
                    payload: {
                        ...item,
                        quantity: item.selectedSize.quantity
                    }
                }
                dispatch(action);
            } else {
                let action = {
                    type: CHANGE_CART_ITEM_QUANTITY,
                    payload: {
                        ...item,
                        quantity: newQuantity
                    }
                }
                dispatch(action);
            }

        }
    }
    const handleClearCart = () => {
        Modal.confirm({
            title: "Hộp Thoại Xác Nhận",
            content: "Bạn có muốn xóa giỏ hàng không?",
            okText: "Xác Nhận",
            cancelText: "Hủy Bỏ",
            onOk: () => {
                dispatch(clearCartAction());
                openNotificationWithIcon('warning', 'Thông báo', `Xóa giỏ hàng thành công!`);
            }
        })
    }

    const onChangeCustomerValue = (e) => {
        setCustomerValue({
            ...customerValue,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeCartItemQuantity = (e, item) => {
        let index = data.findIndex(dataItem => (dataItem.product.id === item.product.id && dataItem.selectedSize.id === item.selectedSize.id));
        if (index !== -1) {
            data[index].quantity = e.target.value;
            setData([...data])
        }
    }

    const handleBlurCartItemQuantityInput = (e, item) => {
        let index = data.findIndex(dataItem => (dataItem.product.id === item.product.id && dataItem.selectedSize.id === item.selectedSize.id));
        // console.log(index)
        if (index !== -1) {
            if (Number.isNaN(Number.parseInt(data[index].quantity))) {
                data[index].quantity = 1;
                let payload = {
                    ...item,
                    quantity: 1
                }
                dispatch(changeCartItemQuantityAction(payload));
                setData([...data])
                openNotificationWithIcon('error', 'Lỗi nhập liệu', 'Vui lòng nhập  số lượng mua hàng là một số tự nhiên lớn hơn  0!')
            } else {
                if (Number.parseInt(data[index].quantity) <= 0) {
                    data[index].quantity = 1;
                    let payload = {
                        ...item,
                        quantity: 1
                    }
                    dispatch(changeCartItemQuantityAction(payload));
                    setData([...data])
                    openNotificationWithIcon('error', 'Lỗi nhập liệu', 'Vui lòng nhập  số lượng mua hàng là một số tự nhiên lớn hơn  0!')
                } else {
                    let quantity = Number.parseInt(data[index].quantity)
                    if (quantity > cartReducer.cart[index].selectedSize.quantity) {
                        quantity = cartReducer.cart[index].selectedSize.quantity
                        data[index].quantity = quantity;
                        let payload = {
                            ...item,
                            quantity: quantity
                        }
                        dispatch(changeCartItemQuantityAction(payload));
                        setData([...data])
                        openNotificationWithIcon('warning', 'Thông báo', `Trong kho hiện  còn lại ${cartReducer.cart[index].selectedSize.quantity}  sản phẩm!`)
                    } else {
                        data[index].quantity = quantity;
                        let payload = {
                            ...item,
                            quantity: quantity
                        }
                        dispatch(changeCartItemQuantityAction(payload));
                        setData([...data])
                    }
                }
            }
        }
    }

    const handleChangeCartItemSize = (item, newSizeId, index) => {
        const newItem = {
            ...item,
            selectedSize: item.size.find(s => s.id === newSizeId),
            currentIndex: index
        }
        console.log(newItem)
        dispatch(changeCartItemSizeAction(newItem))
        message.success("Thay đổi size thành công!")
    }

    const onChangePayment = (e) => {
        if (e) {
            setPayment(e)
            setRandomText(`${moment(new Date()).format('DDMMYYYY')}${makeid(10)}`)
        }
    }

    useEffect(() => {
        if (auth && auth.info.address) {
            setCustomerValue(
                {
                    fullname: auth.info.fullname,
                    phone: auth.info.phone,
                    cityId: auth.info.address.city.id,
                    districtId: auth.info.address.district.id,
                    wardId: auth.info.address.ward.id,
                    location: auth.info.address.location
                }
            )
        }


    }, [auth])

    useEffect(() => {
        let cartData = [...cartReducer.cart];
        setData([...cartData])
    }, [cartReducer])


    useEffect(() => {
        auth && addressAPI.getCityData()
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setCityData(res)
                } else {
                    console.log(res)
                }
            })
            .then((res) => {
                if (auth?.info?.address) {
                    setCustomerValue(
                        {
                            name: auth.info.fullname,
                            phone: auth.info.phone,
                            cityId: auth.info.address.city.id,
                            districtId: auth.info.address.district.id,
                            wardId: auth.info.address.ward.id,
                            location: auth.info.address.location
                        }
                    )
                    setSelectedData({
                        cityId: auth.info.address.city.id,
                        districtId: auth.info.address.district.id,
                        wardId: auth.info.address.ward.id
                    })
                    form.resetFields();
                }
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <Helmet
            title={"Giỏ Hàng"}
        >
            <Container>
                <Wrapper>
                    {
                        cartReducer.cart && cartReducer.cart.length > 0 ?
                            (<DeleteCartWrapper>
                                <Button onClick={handleClearCart}>Xóa Giỏ Hàng</Button>
                            </DeleteCartWrapper>)
                            :
                            (
                                <DeleteCartWrapper>
                                    <Button onClick={() => navigate("/products")} type="primary">Mua Hàng Ngay</Button>
                                </DeleteCartWrapper>
                            )

                    }
                    <CartDetails>
                        <CartBody>
                            <List
                                bordered
                                dataSource={data}
                                style={{
                                    height: '100%',
                                    maxHeight: '60vh',
                                    overflowY: 'scroll',
                                    backgroundColor: 'white'
                                }}
                                renderItem={(item, index) => (
                                    <List.Item>
                                        <Product key={index}>
                                            <ProductDetail>
                                                <Image src={item.product.images && `http://localhost:8080/api/file/images/${item.product.images[0].photo}`} />
                                                <Details style={{ width: "900px" }}>
                                                    <ProductName style={{ textDecoration: "none" }} onClick={() => { navigate(`/product/${item.product.id}`) }}>
                                                        <b>Tên sản phẩm:</b> {item.product?.name}
                                                    </ProductName>
                                                    <ProductId>
                                                        <b>Mã sản phẩm: </b> {item.product.id}
                                                    </ProductId>
                                                    <ProductSize >
                                                        <b>Size:</b> {item.selectedSize.size.title}
                                                        <br />
                                                        <Select value={item.selectedSize.size.title} onChange={(e) => { handleChangeCartItemSize(item, e, index) }}>
                                                            {
                                                                item.size.map((size) => (
                                                                    <Select.Option value={size.id} key={size.id}>{size.size.title}</Select.Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </ProductSize>
                                                </Details>
                                            </ProductDetail>
                                            <PriceDetail>
                                                <ProductAmountContainer >
                                                    <QuantityButton onClick={() => { handleClickUpdateCartItemQuantity(item, item.quantity + 1) }}>
                                                        <Add />
                                                    </QuantityButton>
                                                    <ProductAmount>
                                                        <AmountInput style={{ textAlign: "center" }}
                                                            type='text'
                                                            value={item.quantity}
                                                            onChange={(e) => { handleChangeCartItemQuantity(e, item) }}
                                                            onBlur={(e) => { handleBlurCartItemQuantityInput(e, item) }}
                                                        />
                                                    </ProductAmount>
                                                    {
                                                        item.quantity === 1 ?
                                                            (
                                                                <DialogHOC
                                                                    title="Xác Nhận"
                                                                    content="Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?"
                                                                    onYes={() => { handleClickUpdateCartItemQuantity(item, item.quantity - 1) }}
                                                                    okText="Xác Nhận"
                                                                    cancelText="Hủy Bỏ"
                                                                >
                                                                    <QuantityButton>
                                                                        <Remove />
                                                                    </QuantityButton>
                                                                </DialogHOC>
                                                            )
                                                            :
                                                            (
                                                                <QuantityButton onClick={() => { handleClickUpdateCartItemQuantity(item, item.quantity - 1) }} >
                                                                    <Remove />
                                                                </QuantityButton>
                                                            )
                                                    }

                                                </ProductAmountContainer>
                                                <ProductPrice>
                                                    {
                                                        checkPr(item.product) ?
                                                            (
                                                                <div style={{}}>
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <span style={{ fontSize: '20px', textDecoration: 'line-through', marginRight: 5 }}>
                                                                            {formatter.format(item.quantity * item.price)}
                                                                        </span>
                                                                        <Tag color='magenta' >- {getDiscountPercent(item.product)} %</Tag>
                                                                    </div>
                                                                    <div>
                                                                        {formatter.format(item.quantity * (item.price - item.price * (getDiscountPercent(item.product) / 100)))}
                                                                    </div>
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <>
                                                                    {formatter.format(item.quantity * item.price)}
                                                                </>
                                                            )
                                                    }
                                                </ProductPrice>
                                            </PriceDetail>
                                            <ProductAction style={{ display: "block" }}>
                                                <Button style={{ borderRadius: "20px" }} danger onClick={() => { hanldeDeleteCartIem(item) }}>Xoá Sản Phẩm</Button>
                                            </ProductAction>
                                        </Product>
                                    </List.Item>
                                )}
                            />
                        </CartBody>
                        <CartFooter>
                            Tổng tiền : <b>{formatter.format(data.reduce((total, item) => {
                                if (checkPr(item.product)) {
                                    return total + item.quantity * (item.price - item.price * (getDiscountPercent(item.product) / 100))
                                } else {

                                    return total + item.quantity * item.price
                                }
                            }, 0))}</b>
                        </CartFooter>
                    </CartDetails>
                    {
                        cartReducer.cart && cartReducer.cart.length > 0 &&
                        <Form
                            name="districtForm"
                            layout='vertical'
                            wrapperCol={{ span: 24 }}
                            labelCol={{ span: 24 }}
                            form={form}
                            onFinish={onFinish}
                            initialValues={customerValue}
                        >

                            <Bottom>
                                <CustomerInfoContainer>
                                    <Form.Item>
                                        <Typography>Thông tin liên hệ giao hàng</Typography>
                                    </Form.Item>
                                    <div
                                        style={{ display: 'flex', alignItems: 'center' }}
                                    >
                                        <div
                                            style={{ width: '50%', padding: '5px' }}
                                        >
                                            <Form.Item
                                                label="Họ và tên"
                                                name="name"
                                                hasFeedback
                                                rules={[
                                                    { required: true, message: "Vui lòng nhập họ và tên!" },
                                                    { whitespace: true, message: "Vui lòng không nhập khoảng trắng!" }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </div>
                                        <div
                                            style={{ width: '50%', padding: '5px' }}
                                        >
                                            <Form.Item
                                                label="Số điện thoại"
                                                name="phone"
                                                hasFeedback
                                                rules={[
                                                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                                                    { whitespace: true, message: "Vui lòng không nhập khoảng trắng!" }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <Form.Item style={{ marginBottom: "0px" }}>
                                        <Typography>Địa chỉ giao hàng</Typography>
                                        <FormLocationGroup>
                                            <Form.Item
                                                label="Tỉnh/Thành Phố"
                                                name="cityId"
                                                hasFeedback
                                                rules={[
                                                    { required: true, message: 'Vui lòng chọn Tỉnh/Thành Phố!' }
                                                ]}
                                                style={{ width: '30%' }}
                                            >
                                                <Select
                                                    onChange={onChangeCity}
                                                    placeholder="Tỉnh/Thành"
                                                >
                                                    {
                                                        cityData.map((item, index) => (
                                                            <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="Quận/Huyện"
                                                name="districtId"
                                                hasFeedback
                                                rules={[
                                                    { required: true, message: 'Vui lòng chọn Quận/Huyện' }
                                                ]}
                                                style={{ width: '30%' }}
                                            >
                                                <Select placeholder="Quận/Huyện" disabled={!selectedData.cityId}
                                                    onChange={onChangeDistrict}
                                                >
                                                    {
                                                        selectedData.cityId ?
                                                            (
                                                                <>
                                                                    {
                                                                        (cityData.find(item => item.id === selectedData.cityId)).districts.map(item => (
                                                                            <Select.Option value={item.id} key={item.id} >{item.title}</Select.Option>
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                            :
                                                            (
                                                                <>

                                                                </>
                                                            )
                                                    }
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="Phường/Xã"
                                                name="wardId"
                                                hasFeedback
                                                rules={[
                                                    { required: true, message: 'Vui lòng chọn Phường/Xã!' }
                                                ]}
                                                style={{ width: '30%' }}
                                            >
                                                <Select disabled={!selectedData.districtId}
                                                    onChange={onChangeWard}
                                                    placeholder="Phường/Xã"
                                                >
                                                    {
                                                        selectedData.cityId && selectedData.districtId ?
                                                            (
                                                                <>
                                                                    {
                                                                        ((cityData.find(item => item.id === selectedData.cityId)).districts.find(item => item.id === selectedData.districtId))?.wards.map(item => (
                                                                            <Select.Option value={item.id} key={item.id} >{item.title}</Select.Option>
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                            :
                                                            (
                                                                <>

                                                                </>
                                                            )
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </FormLocationGroup>
                                    </Form.Item>

                                    <Form.Item
                                        label="Địa chỉ"
                                        name="location"
                                        hasFeedback
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập địa chỉ nhận hàng!' },
                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Ghi Chú"
                                        name="note"
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                </CustomerInfoContainer>
                                <SummaryContainer>
                                    <Form.Item>
                                        <Typography>Phương Thức Thanh Toán</Typography>
                                    </Form.Item>
                                    <Form.Item
                                        hasFeedback
                                        name="payment"
                                        rules={[
                                            { required: true, message: 'Vui lòng chọn phương thức thanh toán' }
                                        ]}
                                    >
                                        <Select
                                            placeholder="Phương thức thanh toán"
                                            onChange={onChangePayment}
                                        >
                                            <Select.Option value={1}>Thanh toán khi nhận hàng!</Select.Option>
                                            <Select.Option value={2}>Thanh toán qua ngân hàng!</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    {
                                        payment === 2 &&
                                        <Form.Item>
                                            <MoMoContainer>
                                                <MoMoLeft>
                                                    <MoMoImg src={momoPayment} />
                                                </MoMoLeft>
                                                <MoMoRight>
                                                    <MoMoItem>
                                                        <MoMoItemLabel>
                                                            <Typography.Title level={5}>Ngân Hàng</Typography.Title>
                                                        </MoMoItemLabel>
                                                        <MoMoItemContent>
                                                            <Typography.Text level={5}>Techcombank - Chi nhánh Đan Phượng</Typography.Text>
                                                        </MoMoItemContent>
                                                    </MoMoItem>
                                                    <MoMoItem>
                                                        <MoMoItemLabel>
                                                            <Typography.Title level={5}>Số Tài Khoản</Typography.Title>
                                                        </MoMoItemLabel>
                                                        <MoMoItemContent>
                                                            <Typography.Text level={5}>19037049661012</Typography.Text>
                                                        </MoMoItemContent>
                                                    </MoMoItem>
                                                    <MoMoItem>
                                                        <MoMoItemLabel>
                                                            <Typography.Title level={5}>Người Thụ Hưởng</Typography.Title>
                                                        </MoMoItemLabel>
                                                        <MoMoItemContent>
                                                            <Typography.Text level={5}>Nguyễn Ích Quang</Typography.Text>
                                                        </MoMoItemContent>
                                                    </MoMoItem>
                                                    <MoMoItem>
                                                        <MoMoItemLabel>
                                                            <Typography.Title level={5}>Thanh Toán</Typography.Title>
                                                        </MoMoItemLabel>
                                                        <MoMoItemContent>
                                                            <Typography.Text level={5}>
                                                                {data && formatter.format(data.reduce((total, item) => {
                                                                    if (checkPr(item.product)) {
                                                                        return total + item.quantity * (item.price - item.price * (getDiscountPercent(item.product) / 100))
                                                                    } else {

                                                                        return total + item.quantity * item.price
                                                                    }
                                                                }, 0))}
                                                            </Typography.Text>
                                                        </MoMoItemContent>
                                                        <MoMoItem>
                                                            <MoMoItemLabel>
                                                                <Typography.Title level={5}>Nội Dung Chuyển Khoản</Typography.Title>
                                                            </MoMoItemLabel>
                                                            <MoMoItemContent>
                                                                <Typography.Text level={5}>
                                                                    {randomText}
                                                                </Typography.Text>
                                                            </MoMoItemContent>
                                                        </MoMoItem>
                                                    </MoMoItem>
                                                </MoMoRight>
                                            </MoMoContainer>
                                        </Form.Item>
                                    }

                                    <Summary>
                                        <SummaryTitle>Thông Tin Hóa Đơn</SummaryTitle>
                                        <SummaryItem>
                                            <SummaryItemText>Tổng tiền</SummaryItemText>
                                            <SummaryItemPrice>{data && formatter.format(data.reduce((total, item) => { return total + item.quantity * item.price }, 0))}</SummaryItemPrice>
                                        </SummaryItem>
                                        <SummaryItem>
                                            <SummaryItemText>Giảm Giá</SummaryItemText>
                                            <SummaryItemPrice>{data && formatter.format(data.reduce((total, item) => {
                                                if (checkPr(item.product)) {
                                                    return total + item.quantity * (item.price * (getDiscountPercent(item.product) / 100))
                                                } else {
                                                    return total
                                                }
                                            }, 0))}</SummaryItemPrice>
                                        </SummaryItem>

                                        <SummaryItem type="total">
                                            <SummaryItemText>Thanh toán</SummaryItemText>
                                            <SummaryItemPrice>{data && formatter.format(data.reduce((total, item) => {
                                                if (checkPr(item.product)) {
                                                    return total + item.quantity * (item.price - item.price * (getDiscountPercent(item.product) / 100))
                                                } else {

                                                    return total + item.quantity * item.price
                                                }
                                            }, 0))}</SummaryItemPrice>
                                        </SummaryItem>
                                    </Summary>
                                    <Form.Item
                                        style={{ textAlign: 'center' }}
                                    >
                                        <Button style={{ marginRight: '20px', marginTop: '20px', width: "120px", height: "40px", borderRadius: "20px" }} type='primary' htmlType='submit' disabled={cartReducer.cart.length <= 0}>Đặt Hàng</Button>
                                    </Form.Item>
                                </SummaryContainer>
                            </Bottom>
                        </Form>
                    }
                    {/* <Modal
                        open={isPayModal}
                        title="Thông Tin Thoanh Toán MoMo"
                        centered
                        width={1000}
                        onCancel={() => {setIsPayModal(false)}}
                    >
                        <MoMoContainer>
                            <MoMoLeft>
                                <MoMoImg src={momoPayment} />
                            </MoMoLeft>
                            <MoMoRight>
                                <MoMoItem>
                                    <MoMoItemLabel>
                                        <Typography.Title level={5}>Người Thụ Hưởng</Typography.Title>
                                    </MoMoItemLabel>
                                    <MoMoItemContent>
                                        <Typography.Text level={5}>Nguyễn Ích Quang</Typography.Text>
                                    </MoMoItemContent>
                                </MoMoItem>
                                <MoMoItem>
                                    <MoMoItemLabel>
                                        <Typography.Title level={5}>Thanh Toán</Typography.Title>
                                    </MoMoItemLabel>
                                    <MoMoItemContent>
                                        <Typography.Text level={5}>
                                            {data && formatter.format(data.reduce((total, item) => {
                                                if (checkPr(item.product)) {
                                                    return total + item.quantity * (item.price - item.price * (getDiscountPercent(item.product) / 100))
                                                } else {

                                                    return total + item.quantity * item.price
                                                }
                                            }, 0))}
                                        </Typography.Text>
                                    </MoMoItemContent>
                                    <MoMoItem>
                                    <MoMoItemLabel>
                                        <Typography.Title level={5}>Nội Dung Chuyển Khoản</Typography.Title>
                                    </MoMoItemLabel>
                                    <MoMoItemContent>
                                        <Typography.Text level={5}>
                                            {`${moment(new Date()).format('DDMMYYYYHmm')}-${auth?.info?.username}`}
                                        </Typography.Text>
                                    </MoMoItemContent>
                                </MoMoItem>
                                </MoMoItem>
                            </MoMoRight>
                        </MoMoContainer>
                    </Modal> */}
                </Wrapper>
            </Container >
        </Helmet >
    )
}

export default Webcart