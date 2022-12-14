import React, { useRef, useState } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { Button, Empty, Select, Table, List, notification, Modal, Form, InputNumber, Switch, Typography, Input, Space, Steps, Spin, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { useEffect } from 'react'
import productAPI from '../../api/productsAPI'
import { formatter } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { Add, Remove } from '@mui/icons-material'
import DialogHOC from '../../hoc/DialogHOC'
import { useForm } from 'antd/es/form/Form'
import addressAPI from '../../api/addressAPI'
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import ordersAPI from '../../api/ordersAPI';
import moment from 'moment';

const Container = styled.div`
    width: 100%;
    padding: 50px;
`

const Wrapper = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
`

const ActionContainer = styled.div`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const CartContainer = styled.div`
    width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
`

const CartEmpty = styled.div`
    width: 100%;
    padding: 50px;
    border-radius: 10px;
    background-color: white;
`
const CartItemWrapper = styled.div``
const ProductContainer = styled.div`
    width: 100%;
`


const CartDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 80vh;
    margin-bottom: 50px;
    background-color: white;
    max-height: 500px;
    height: 500px;
    overflow-y: scroll;
    padding: 20px;
`

const PayDetails = styled.div`
    width: 100%;
    background-color: white;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
`
const PayTitle = styled.div`
    text-transform: capitalize;
    font-size: 20px;
    font-weight: 300;
`
const PayItem = styled.div`
    width: 100%;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`
const PayItemTitle = styled.div``
const PayItemContent = styled.div``
const ShipContainer = styled.div`
    width: 100%;
    padding: 20px;
`
const PayContainer = styled.div`
    width: 50%;
    padding: 20px;
    display:flex;
    flex-direction: column;
`
const FormContainer = styled.div`
    width: 100%;
    display: flex;
`
const CustomerInfoContainer = styled.div`
    width: 50%;
`
const CartBody = styled.div`
`
const CartFooter = styled.div`
    width: 100%;
    height: 80px;
    left: 0;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const Product = styled.div`
    display: flex;
    padding: 20px;
    margin-bottom: 10px;
    width: 100%;
    flex-wrap: wrap;
    padding-bottom: 5px;
    border-bottom: 1px solid #999;
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 60px;
    object-fit: contain;
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

const FormLocationGroup = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const StepContainer = styled.div`
    width: 100%;
    padding: 20px;
    background-color: white;
    margin-bottom: 20px;
    border-radius: 10px
`

const findByProductIdAndSizeId = (arr, prId, sId) => {
    let result = -1
    if (arr && arr.length > 0) {
        arr.forEach((item, index) => {
            if (item.item.id === prId && item.selectedSize.id === sId) {
                result = index;
                return result;
            }
        })
    }
    return result
}


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};


const findStepIndex = (arr, sttId) => {
    let result = -1;
    if (arr) {
        arr.forEach((item, index) => {
            if (item.statusOrder.id === sttId) {
                result = index
            }
        });
    }
    return result;
}

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
    console.log(product)
    let result = 0
    if (product) {
        result = product.promotions[0]?.promition?.by_persent
    }
    return result
}


const AdmWatingOrder = ({ id, info, onClickUpdateStatus }) => {
    const [steps, setSteps] = useState([
        { id: 5, title: "Đang Chờ" },
        { id: 1, title: "Chờ Xác Nhận" },
        { id: 2, title: "Đã Xác Nhận" },
        { id: 3, title: "Đang Giao" },
        { id: 4, title: "Hoàn Tất" }

    ])
    const [cart, setCart] = useState([])
    const auth = useSelector(state => state.auth.auth);
    const [product, setProduct] = useState([])
    const navigate = useNavigate()
    const [addingProduct, setAddingProduct] = useState(undefined)
    const [form] = useForm()
    const [isDefaultCustomer, setIsDefaultCustomer] = useState(true)
    const [cartLoading, setCartLoading] = useState(false)
    const [isModalDesc, setIsModalDesc] = useState(false)
    const [updateSttDesc, setUpdateSttDesc] = useState('')
    const submitButtonRef = useRef()
    const customerInfoRef = useRef()
    const onCloseModalDesc = () => {
        setUpdateSttDesc('');
        setIsModalDesc(false)
    }

    const handleUpdateStatus = () => {
        console.log('update stt', updateSttDesc)
        submitButtonRef.current.click();
        setIsModalDesc(false);
    }

    const onClickOpenModalDescStt = () => {
        setIsModalDesc(true)
    }

    const onChangeCity = (value) => {
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

    const [cityData, setCityData] = useState([])
    const [selectedData, setSelectedData] = useState({
        cityId: null,
        districtId: null,
        wardId: null
    })

    const onChangeCustomerDefault = (checked) => {
        setIsDefaultCustomer(!checked)
    }

    const handleChangeCartItemSize = (item, newSizeId, currIndex) => {
        const newSize = item?.item?.productsizes.find((size) => size.id === newSizeId)

        const index = findByProductIdAndSizeId(cart, item?.item?.id, newSize.id)
        setCartLoading(true)
        if (index !== -1) {
            cart[index] = {
                ...cart[index],
                selectedSize: newSize,
                quantity: 1
            }
            cart.splice(currIndex, 1)
            setCart([...cart])
        } else {
            cart.splice(currIndex, 1)
            cart.push({ item: item.item, selectedSize: newSize, quantity: 1 })
            setCart([...cart])
        }
        let payload = {
            users: {
                username: auth?.info?.username
            },
            id,
            orderDetail: [
                ...cart.map((item, index) => ({
                    product: { id: item?.item?.id },
                    quantity: item?.quantity,
                    size: item?.selectedSize?.size?.title,
                    total_price: item?.item?.export_price * item?.quantity
                }))
            ],
            statusOrders: ({ id: 5, title: 'Đang Chờ' }),
            reduce_price: cart.reduce((total, item) => {
                if (checkPr(item.item)) {
                    return total + item.quantity * (item.item?.export_price * (getDiscountPercent(item.item) / 100))
                } else {
                    return total
                }
            }, 0),
            total_price: cart.reduce((total, item) => {
                if (checkPr(item.item)) {
                    return total + item.quantity * (item.item?.export_price - item.item?.export_price * (getDiscountPercent(item.item) / 100))
                } else {

                    return total + item.quantity * item.item?.export_price
                }
            }, 0)
        }
        ordersAPI.updateWatingOrder(payload)
            .then(res => {
                if (!res.status) {
                    openNotificationWithIcon('success', 'Thêm Sản Phẩm Vào Giỏ Hàng', 'Thay đổi size thành công!')
                    setCartLoading(false)
                }
            }
            )
            .catch(err => {
                openNotificationWithIcon('error', 'Lỗi ', err)
                setCartLoading(true)
                console.log(err)
            })
    }

    const handleClickUpdateCartItemQuantity = (item, newQuantity, currIndex) => {

        if (newQuantity <= 0) {
            handleDeleteCartItem(currIndex);
        } else {
            if (newQuantity > item.selectedSize.quantity) {
                openNotificationWithIcon('warning', 'Thông báo', `Trong kho hiện  còn lại ${item.selectedSize.quantity}  sản phẩm!`);
            } else {
                setCartLoading(true)
                cart[currIndex].quantity = newQuantity
                setCart([...cart])
                let payload = {
                    users: {
                        username: auth?.info?.username
                    },
                    id,
                    orderDetail: [
                        ...cart.map((item, index) => ({
                            product: { id: item?.item?.id },
                            quantity: item?.quantity,
                            size: item?.selectedSize?.size?.title,
                            total_price: item?.item?.export_price * item?.quantity
                        }))
                    ],
                    statusOrders: ({ id: 5, title: 'Đang Chờ' }),
                    reduce_price: cart.reduce((total, item) => {
                        if (checkPr(item.item)) {
                            return total + item.quantity * (item.item?.export_price * (getDiscountPercent(item.item) / 100))
                        } else {
                            return total
                        }
                    }, 0),
                    total_price: cart.reduce((total, item) => {
                        if (checkPr(item.item)) {
                            return total + item.quantity * (item.item?.export_price - item.item?.export_price * (getDiscountPercent(item.item) / 100))
                        } else {

                            return total + item.quantity * item.item?.export_price
                        }
                    }, 0)
                }
                ordersAPI.updateWatingOrder(payload)
                    .then(res => {
                        if (!res.status) {
                            openNotificationWithIcon('success', 'Thêm Sản Phẩm Vào Giỏ Hàng', 'Thay đổi size thành công!')
                            setCartLoading(false)
                        }
                    }
                    )
                    .catch(err => {
                        openNotificationWithIcon('error', 'Lỗi ', err)
                        setCartLoading(true)
                        console.log(err)
                    })
            }

        }
    }




    const onSelectSizeAndQuantityFinish = (value) => {
        const selectedSize = addingProduct.productsizes.find(size => size.id === value.sizeId)
        const index = findByProductIdAndSizeId(cart, addingProduct.id, selectedSize.id)
        setCartLoading(true)
        if (index === -1) {
            cart.push({ item: addingProduct, selectedSize, quantity: (value.quantity > selectedSize.id ? selectedSize.quantity : value.quantity) })
            setCart([...cart])

        } else {
            if (cart[index].quantity + 1 > cart[index].selectedSize.quantity) {
                cart[index].quantity = cart[index].selectedSize.quantity;
                openNotificationWithIcon('warning', 'Thông Báo', `Hiện chỉ còn ${cart[index].selectedSize.quantity} sản phẩm trong kho!`)
            } else {
                cart[index].quantity += 1;
            }
            setCart([...cart])

        }
        let payload = {
            users: {
                username: auth?.info?.username
            },
            id,
            orderDetail: [
                ...cart.map((item, index) => ({
                    product: { id: item?.item?.id },
                    quantity: item?.quantity,
                    size: item?.selectedSize?.size?.title,
                    total_price: item?.item?.export_price * item?.quantity
                }))
            ],
            statusOrders: ({ id: 5, title: 'Đang Chờ' }),
            reduce_price: cart.reduce((total, item) => {
                if (checkPr(item.item)) {
                    return total + item.quantity * (item.item?.export_price * (getDiscountPercent(item.item) / 100))
                } else {
                    return total
                }
            }, 0),
            total_price: cart.reduce((total, item) => {
                if (checkPr(item.item)) {
                    return total + item.quantity * (item.item?.export_price - item.item?.export_price * (getDiscountPercent(item.item) / 100))
                } else {

                    return total + item.quantity * item.item?.export_price
                }
            }, 0)
        }
        ordersAPI.updateWatingOrder(payload)
            .then(res => {
                if (!res.status) {
                    openNotificationWithIcon('success', 'Thêm Sản Phẩm Vào Giỏ Hàng', 'Đã thêm sản phẩm vào giỏ hàng')
                    setCartLoading(false)
                }
            }
            )
            .catch(err => {
                openNotificationWithIcon('error', 'Lỗi ', err)
                setCartLoading(true)
                console.log(err)
            })
        setAddingProduct(undefined)
    }


    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });



    const productColumn = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'Ảnh',
            render: (record) => {
                return (
                    <>
                        <img src={`http://localhost:8080/api/file/images/${record?.images[0]?.photo}`} style={{ width: '60px' }} />
                    </>
                )
            }
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Loại Sản Phẩm',
            render: (record) => {
                return (
                    <>
                        {record?.category?.title}
                    </>
                )
            }
        },
        {
            title: 'Giá',
            dataIndex: 'export_price',
            render: (text) => {
                return (
                    <>
                        {formatter.format(text)}
                    </>
                )
            },
            sorter: (a, b) => a.export_price - b.export_price
        },
        {
            title: 'Thao Tác',
            render: (record) => {
                return (
                    <>
                        <Button type='primary' onClick={() => { setAddingProduct(record) }}>Thêm Sản Phẩm</Button>
                    </>
                )
            }
        }
    ]

    const handleDeleteCartItem = (index) => {
        if (cart[index]) {
            Modal.confirm({
                title: "Hộp Thoại Xác Nhận",
                content: "Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?",
                okText: "Xác Nhận",
                cancelText: "Hủy Bỏ",
                onOk: () => {
                    setCartLoading(true)
                    cart.splice(index, 1)
                    setCart([...cart])
                    // openNotificationWithIcon('info', 'Xóa Sản Phẩm Khỏi Giỏ Hàng', 'Đã xóa sản phẩm khỏi giỏ hàng')
                    let payload = {
                        users: {
                            username: auth?.info?.username
                        },
                        id,
                        orderDetail: [
                            ...cart.map((item, index) => ({
                                product: { id: item?.item?.id },
                                quantity: item?.quantity,
                                size: item?.selectedSize?.size?.title,
                                total_price: item?.item?.export_price * item?.quantity
                            }))
                        ],
                        statusOrders: ({ id: 5, title: 'Đang Chờ' }),
                        reduce_price: cart.reduce((total, item) => {
                            if (checkPr(item.item)) {
                                return total + item.quantity * (item.item?.export_price * (getDiscountPercent(item.item) / 100))
                            } else {
                                return total
                            }
                        }, 0),
                        total_price: cart.reduce((total, item) => {
                            if (checkPr(item.item)) {
                                return total + item.quantity * (item.item?.export_price - item.item?.export_price * (getDiscountPercent(item.item) / 100))
                            } else {
    
                                return total + item.quantity * item.item?.export_price
                            }
                        }, 0)
                    }
                    ordersAPI.updateWatingOrder(payload)
                        .then(res => {
                            if (!res.status) {
                                openNotificationWithIcon('info', 'Xóa Sản Phẩm Khỏi Giỏ Hàng', 'Đã xóa sản phẩm khỏi giỏ hàng')
                                setCartLoading(false)
                            }
                        }
                        )
                        .catch(err => {
                            openNotificationWithIcon('error', 'Lỗi ', err)
                            setCartLoading(true)
                            console.log(err)
                        })
                }
            })
        }
    }

    const handleChangeCartItemQuantity = (e, item) => {
        let index = cart.findIndex(dataItem => (dataItem.item.id === item.item.id && dataItem.selectedSize.id === item.selectedSize.id));
        if (index !== -1) {
            cart[index].quantity = e.target.value;
            setCart([...cart])

        }
    }

    const handleBlurCartItemQuantityInput = (e, item) => {
        let index = cart.findIndex(dataItem => (dataItem.item.id === item.item.id && dataItem.selectedSize.id === item.selectedSize.id));
        if (Number.isNaN(Number.parseInt(cart[index].quantity))) {
            cart[index].quantity = 1;
            setCart([...cart])
            openNotificationWithIcon('error', 'Lỗi nhập liệu', 'Vui lòng nhập  số lượng mua hàng là một số tự nhiên lớn hơn  0!')
        } else {
            if (Number.parseInt(cart[index].quantity) <= 0) {
                cart[index].quantity = 1;
                setCart([...cart])
                openNotificationWithIcon('error', 'Lỗi nhập liệu', 'Vui lòng nhập  số lượng mua hàng là một số tự nhiên lớn hơn  0!')
            } else {
                let quantity = Number.parseInt(cart[index].quantity)
                if (quantity > cart[index].selectedSize.quantity) {
                    quantity = cart[index].selectedSize.quantity
                    cart[index].quantity = quantity;
                    setCart([...cart])
                    openNotificationWithIcon('warning', 'Thông báo', `Trong kho hiện  còn lại ${cart[index].selectedSize.quantity}  sản phẩm!`)
                } else {
                    cart[index].quantity = quantity;
                    let payload = {
                        ...item,
                        quantity: quantity
                    }
                    setCart([...cart])
                }
            }
        }
    }

    const handleSaveWatingOrder = () => {
        if (auth && id) {
            let payload = {
                users: {
                    username: auth?.info?.username
                },
                id,
                orderDetail: [
                    ...cart.map((item, index) => ({
                        product: { id: item?.item?.id },
                        quantity: item?.quantity,
                        size: item?.selectedSize?.size?.title,
                        total_price: item?.item?.export_price * item?.quantity
                    }))
                ],
                statusOrders: ({ id: 5, title: 'Đang Chờ' })
            }
            console.log(payload)
            ordersAPI.updateWatingOrder(payload)
                .then(res => {
                    if (!res.status) {
                        openNotificationWithIcon('success', 'Lưu Đơn Hàng', 'Lưu đơn chờ thành công');
                        // navigate('/admin/order-list')
                    }
                }
                )
                .catch(err => console.log(err))
        }
    }


    const handleClickSubmitForm = (value) => {
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Xác nhận đơn hàng.',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                let payload = {
                    ...info, orderDetail: [
                        ...cart.map((item, index) => ({
                            product: { ...item?.item },
                            quantity: item?.quantity,
                            size: item?.selectedSize?.size?.title,
                            total_price: item?.item?.export_price * item?.quantity
                        }))
                    ],
                    statusOrder: isDefaultCustomer ? ('Hoàn Tất') : ('Đã Xác Nhận'),
                    customers: isDefaultCustomer ? null : {
                        "phone": value?.phone,
                        "name": value?.name,
                        "note": value.note ? value.note : '',
                        "user": {
                            "username": auth?.info?.username
                        }
                    }
                    ,
                    cityId: value.cityId,
                    districtId: value.districtId,
                    wardId: value.wardId,
                    location: value.location,
                    DescriptionOder: updateSttDesc ? updateSttDesc : '',
                    reduce_price: cart.reduce((total, item) => {
                        if (checkPr(item.item)) {
                            return total + item.quantity * (item.item?.export_price * (getDiscountPercent(item.item) / 100))
                        } else {
                            return total
                        }
                    }, 0),
                    total_price: cart.reduce((total, item) => {
                        if (checkPr(item.item)) {
                            return total + item.quantity * (item.item?.export_price - item.item?.export_price * (getDiscountPercent(item.item) / 100))
                        } else {

                            return total + item.quantity * item.item?.export_price
                        }
                    }, 0)
                }
                console.log(payload)
                setUpdateSttDesc('')
                onClickUpdateStatus(payload)
            }
        })
    }


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };



    useEffect(() => {
        if (addingProduct) {
            form.setFieldsValue({ sizeId: addingProduct?.productsizes[0].id, quantity: 1 })
        }
    }, [addingProduct])

    useEffect(() => {
        if (info?.orderDetail) {
            setCart([
                ...info?.orderDetail.map((c, index) => {
                    return (
                        {
                            item: c?.product,
                            quantity: c?.quantity,
                            size: c.size,
                            selectedSize: c?.product?.productsizes.find(s => s?.size?.title === c?.size)
                        }
                    )
                })
            ])
        }
    }, [info])

    useEffect(() => {
        productAPI.getAll()
            .then(res => {
                if (!res.status) {
                    setProduct(res.map((item, index) => {
                        return ({
                            index: index + 1,
                            key: item.id,
                            ...item
                        })
                    }))
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
        addressAPI.getCityData()
            .then(res => {
                if (!res.status) {
                    setCityData(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Helmet title={"Quản Lý Hóa Đơn"}>
            <Container>
                <Wrapper>

                    <ActionContainer>
                        <Button type='primary' onClick={() => { navigate("/admin/order-list") }}>Danh Sách</Button>
                    </ActionContainer>
                    <StepContainer>
                        {
                            steps && steps.length > 0 &&
                            <Steps current={steps.findIndex((item) => item.id === info?.statusDetail[info?.statusDetail.length - 1]?.statusOrder.id)}>
                                {steps.map(item => {
                                    let checkDesc = findStepIndex(info?.statusDetail, item.id)
                                    let des = checkDesc === -1 ? '' : info?.statusDetail[checkDesc]?.timeDate
                                    return (
                                        (
                                            <Steps.Step
                                                title={item.title}
                                                key={item.id}
                                                description={des !== '' ? moment(des).format('DD/MM/YYYY, H:mm:ss') : ''}
                                            />
                                        )
                                    )
                                }
                                )}
                            </Steps>
                        }
                    </StepContainer>
                    <CartContainer>
                        {
                            cart.length > 0 ?
                                (
                                    <>
                                        <CartDetails>
                                            <CartBody>
                                                {cartLoading ?
                                                    (
                                                        <>
                                                            <Spin />
                                                        </>
                                                    )
                                                    :
                                                    (
                                                        <List
                                                            bordered
                                                            dataSource={cart}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                backgroundColor: 'white'
                                                            }}
                                                            renderItem={(item, index) => (
                                                                <List.Item>
                                                                    <Product key={item.item.id}>
                                                                        <ProductDetail>
                                                                            <Image src={item.item.images && `http://localhost:8080/api/file/images/${item.item.images[0].photo}`} />
                                                                            <Details style={{}}>
                                                                                <ProductName style={{ textDecoration: "none" }} onClick={() => { navigate(`/product/${item.item.id}`) }}>
                                                                                    <b>Tên sản phẩm:</b> {item.item?.name}
                                                                                </ProductName>
                                                                                <ProductId>
                                                                                    <b>Mã sản phẩm: </b> {item.item.id}
                                                                                </ProductId>
                                                                                <ProductSize >
                                                                                    <Select value={item.selectedSize.id} onChange={(e) => { handleChangeCartItemSize(item, e, index) }}>
                                                                                        {item.item?.productsizes.map(size => (
                                                                                            <Select.Option value={size.id}>{size.size.title}</Select.Option>
                                                                                        ))}
                                                                                    </Select>
                                                                                </ProductSize>
                                                                            </Details>
                                                                        </ProductDetail>
                                                                        <PriceDetail>
                                                                            <ProductAmountContainer >
                                                                                <QuantityButton onClick={() => { handleClickUpdateCartItemQuantity(item, item.quantity + 1, index) }}>
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
                                                                                <QuantityButton>
                                                                                    <Remove onClick={() => { handleClickUpdateCartItemQuantity(item, item.quantity - 1, index) }} />
                                                                                </QuantityButton>

                                                                            </ProductAmountContainer>
                                                                            <ProductPrice>{
                                                                                checkPr(item.item) ?
                                                                                    (
                                                                                        <div style={{}}>
                                                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                                <span style={{ fontSize: '20px', textDecoration: 'line-through', marginRight: 5 }}>
                                                                                                    {formatter.format(item.quantity * item.item.export_price)}
                                                                                                </span>
                                                                                                <Tag color='magenta' >- {getDiscountPercent(item.item   )} %</Tag>
                                                                                            </div>
                                                                                            <div>
                                                                                                {formatter.format(item.quantity * (item.item.export_price - item.item.export_price * (getDiscountPercent(item.item) / 100)))}
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                    :
                                                                                    (
                                                                                        <>
                                                                                            {formatter.format(item.quantity * item.item.export_price)}
                                                                                        </>
                                                                                    )
                                                                            }</ProductPrice>
                                                                        </PriceDetail>
                                                                        <ProductAction>
                                                                            <Button danger onClick={() => { handleDeleteCartItem(index) }}>Xoá Sản Phẩm</Button>
                                                                        </ProductAction>
                                                                    </Product>
                                                                </List.Item>
                                                            )}
                                                        />
                                                    )
                                                }
                                            </CartBody>
                                        </CartDetails>
                                        <PayDetails>
                                            <ShipContainer>
                                                {
                                                    <Form
                                                        layout='vertical'
                                                        wrapperCol={{ span: 24 }}
                                                        labelCol={{ span: 24 }}
                                                        onFinish={handleClickSubmitForm}
                                                    >
                                                        <FormContainer>
                                                            <PayContainer>
                                                                <PayTitle>Thông tin thanh toán</PayTitle>
                                                                {isDefaultCustomer && (
                                                                    <PayItem>
                                                                        <PayItemTitle>
                                                                            <Tag color="geekblue">Khách Lẻ</Tag>
                                                                        </PayItemTitle>
                                                                    </PayItem>
                                                                )}
                                                                <PayItem>
                                                                    <PayItemTitle>
                                                                        Giao Hàng
                                                                        <Switch checked={!isDefaultCustomer} onChange={onChangeCustomerDefault} style={{ marginLeft: '20px' }} />
                                                                    </PayItemTitle>
                                                                </PayItem>
                                                                <PayItem>
                                                                    <PayItemTitle>
                                                                        Tổng Tiền
                                                                    </PayItemTitle>
                                                                    <PayItemContent>
                                                                        <b>
                                                                            {formatter.format(cart.reduce((total, curr) => total + curr?.item?.export_price * curr.quantity, 0))}
                                                                        </b>
                                                                    </PayItemContent>
                                                                </PayItem>
                                                                <PayItem>
                                                                    <PayItemTitle>
                                                                        Giảm Giá
                                                                    </PayItemTitle>
                                                                    <PayItemContent>
                                                                        <b>
                                                                            {formatter.format(cart.reduce((total, item) => {
                                                                                if (checkPr(item.item)) {
                                                                                    return total + item.quantity * (item.item?.export_price * (getDiscountPercent(item.item) / 100))
                                                                                } else {
                                                                                    return total
                                                                                }
                                                                            }, 0))}
                                                                        </b>
                                                                    </PayItemContent>
                                                                </PayItem>
                                                                <PayItem>
                                                                    <PayItemTitle>
                                                                        Thanh Toán
                                                                    </PayItemTitle>
                                                                    <PayItemContent>
                                                                        <b>
                                                                            {formatter.format(cart.reduce((total, item) => {
                                                                                if (checkPr(item.item)) {
                                                                                    return total + item.quantity * (item.item?.export_price - item.item?.export_price * (getDiscountPercent(item.item) / 100))
                                                                                } else {

                                                                                    return total + item.quantity * item.item?.export_price
                                                                                }
                                                                            }, 0))}
                                                                        </b>
                                                                    </PayItemContent>
                                                                </PayItem>
                                                                <PayItem>
                                                                    <PayItemContent>
                                                                        <Button htmlType='submit' visible={false} ref={submitButtonRef}></Button>
                                                                        <Button type='primary' onClick={() => onClickOpenModalDescStt()}>Xác Nhận Đơn Hàng</Button>
                                                                    </PayItemContent>
                                                                </PayItem>
                                                            </PayContainer>
                                                            {
                                                                !isDefaultCustomer &&
                                                                <CustomerInfoContainer>
                                                                    <Form.Item
                                                                        label="Họ và tên"
                                                                        name="name"
                                                                        hasFeedback
                                                                        rules={[
                                                                            { required: true, message: "Vui lòng nhập họ và tên!" },
                                                                            { whitespace: true, message: "Vui lòng không nhập khoảng trắng!" }
                                                                        ]}
                                                                        ref={customerInfoRef}
                                                                    >
                                                                        <Input />
                                                                    </Form.Item>
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
                                                                    <Form.Item
                                                                        label="Tỉnh/Thành Phố"
                                                                        name="cityId"
                                                                        hasFeedback
                                                                        rules={[
                                                                            { required: true, message: 'Vui lòng chọn Tỉnh/Thành Phố!' }
                                                                        ]}

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
                                                                                                ((cityData.find(item => item.id === selectedData.cityId)).districts.find(item => item.id === selectedData.districtId)).wards.map(item => (
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
                                                            }
                                                        </FormContainer>
                                                    </Form>
                                                }
                                            </ShipContainer>
                                        </PayDetails>
                                    </>
                                )
                                :
                                (
                                    <CartEmpty>
                                        <Empty description={"Không có sản phẩm nào trong giỏ hàng."} />
                                    </CartEmpty>
                                )
                        }

                    </CartContainer>
                    <ProductContainer>
                        <Table dataSource={product} columns={productColumn} />
                    </ProductContainer>
                </Wrapper>
                <Modal
                    open={addingProduct}
                    centered
                    onCancel={() => { setAddingProduct(undefined) }}
                    okText={"Thêm Vào Giỏ"}
                    onOk={() => { form.submit() }}
                    cancelText={"Hủy Bỏ"}
                >
                    <Form
                        name="selectSizeAndQuantityForm"
                        layout='vertical'
                        wrapperCol={{ span: 24 }}
                        labelCol={{ span: 24 }}
                        form={form}
                        onFinish={onSelectSizeAndQuantityFinish}
                    >
                        <Form.Item
                            label="Size"
                            name="sizeId"
                            hasFeedback
                            rules={[
                                { required: true, message: 'Vui lòng chọn size!' }
                            ]}
                        >
                            <Select>
                                {addingProduct?.productsizes.map((size) => (
                                    <Select.Option key={size.id} value={size.id}>
                                        {size.size.title}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Số Lượng"
                            name="quantity"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số lượng!' },
                                { type: 'integer', message: 'Vui lòng nhập số tự nhiên!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || value >= 1) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject('Vui lòng nhập số lượng là số tự nhiên lớn hơn hoặc bằng 1!')
                                    }
                                })
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    open={isModalDesc}
                    centered
                    okText="Xác Nhận"
                    cancelText="Huỷ Bỏ"
                    onCancel={onCloseModalDesc}
                    onOk={handleUpdateStatus}
                >
                    <Typography.Title level={5}>Ghi Chú</Typography.Title>
                    <Input.TextArea value={updateSttDesc} onChange={(e) => { setUpdateSttDesc(e.target.value) }} placeholder="Ghi chú" />
                </Modal>
            </Container>
        </Helmet >
    )
}

export default AdmWatingOrder