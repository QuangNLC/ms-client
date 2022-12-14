import { Button, Form, Input, Spin, Typography, Upload, Modal, Tabs, Badge, Card, Empty, Timeline, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ordersAPI from '../../api/ordersAPI';
import { formatter } from '../../utils'

const Container = styled.div`
    width: 100%;
    background-color: rgba(0,0,0 ,0.15);
    min-height: 100vh;
`
const Wrapper = styled.div`
    width: 100%;
    padding: 50px;
    display: flex;
    align-items: top;
    justify-content: space-between;
`
const NavContainer = styled.div`
    flex: 1;
    padding: 20px;
`
const Nav = styled.ul`
`
const NavItem = styled.li`
    color:  black;
    font-size:  18px;
    margin-bottom: 10px;
    text-transform: capitalize;
    cursor:  pointer;
    transition:  all  0.25s  ease-in;
    font-weight: 500;

    ${props => props.actived ? "color:  red;" : ''}

    &:hover{
        color: red;
    }
`
const ContentContainer = styled.div`
    flex: 4;
    padding: 20px;
    background-color: white;
    border-radius:  20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const Top = styled.div`
    border-bottom:  0.5px solid lightgray;
    padding-bottom: 5px;
    margin-top: 10px;
`
const Bottom = styled.div`
    display: flex;
    align-items: top;
    justify-content: space-betwwen;
`
const FormContainer = styled.div`
    flex: 3;
    padding: 20px;
    border-right: 1px  solid lightgray;
`
const AvatarContainer = styled.div`
    flex: 1;
    padding: 20px;
`
const PreviewImg = styled.div`
    width: 100%;
    display:  flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`
const Avt = styled.img`
    width:  130px;
    height: 130px;
    border-radius:  50%;
    object-fit: cover;
    object-position: center;
`
const UploadButton = styled.div`
    width: 100%;
    display: flex;
    flex-direction:  column;
    justify-content: center;
    align-items:  center;
`

const OrderContainer = styled.div`
    width: 100%;
    padding: 20px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: right;
    justify-content: flex-start;
`
const OrderDetails = styled.div`
`

const OrderDetailsItem = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`
const OrderDetailsItemImage = styled.div`
    width: 138px;
    height: 138px;
    padding: 4px;
    border: 1px solid lightgray;
`
const ItemImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top;
`
const OrderDetailsItemTitle = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`
const OrderDetailsItemPrice = styled.div`
    width: 200px;
`
const OrderDetailsItemQuantity = styled.div`
    width: 30px;
`
const OrderSummary = styled.div`
    width: 100%;
    padding-right: 20px;
    border-top: 1px solid teal;
    padding-top: 20px;
`
const OrderSummaryTitle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
`
const OrderSummaryDetail = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    font-size: 20px;
    color: darkblue;
    font-weight: 500;
    margin-top: 5px;
`
var moment = require('moment');

const Order = ({ order, onClickViewStatusInfo }) => {
    console.log(order)
    return (
        <OrderContainer>
            <Badge.Ribbon text={order?.statusDetail[order?.statusDetail.length - 1].statusOrder.title}>
                <Card title={`Đặt hàng lúc : ${moment(order.order_date).format('DD/MM/YYYY, H:mm:ss')}     ||     ${order.orderDetail.reduce(((total, item) => (total + item.quantity)), 0)} sản phẩm`} size="small">
                    <OrderDetails>
                        {
                            order.orderDetail.map((item, index) => (
                                <OrderDetailsItem key={item.id}>
                                    <OrderDetailsItemImage>
                                        <ItemImage src={item.product.images && `http://localhost:8080/api/file/images/${item.product.images[0].photo}`} />
                                    </OrderDetailsItemImage>
                                    <OrderDetailsItemTitle>
                                        {item.product.name}
                                    </OrderDetailsItemTitle>
                                    <OrderDetailsItemPrice>
                                        {formatter.format(item.product.export_price)}
                                    </OrderDetailsItemPrice>
                                    <OrderDetailsItemQuantity>
                                        x{item.quantity}
                                    </OrderDetailsItemQuantity>
                                </OrderDetailsItem>
                            ))
                        }
                    </OrderDetails>
                    <OrderSummary>
                        <OrderSummaryDetail>
                            <div>
                                <div style={{display: 'flex', alignItems:'center',justifyContent: 'space-between', width: '250px'}}>
                                    <div>Tổng Tiền</div>
                                    <div>{formatter.format(order.total_price)}</div>
                                </div>
                                <div style={{display: 'flex', alignItems:'center',justifyContent: 'space-between', width: '250px'}}>
                                    <div>Giảm Giá</div>
                                    <div>{formatter.format(order.reduce_price)}</div>
                                </div>
                                <div style={{display: 'flex', alignItems:'center',justifyContent: 'space-between', width: '250px'}}>
                                    <div>Thanh Toán</div>
                                    <div>{formatter.format(order.total_price - order.reduce_price)}</div>
                                </div>
                            </div>
                            <div>
                                <Button onClick={() => onClickViewStatusInfo(order)}>Chi tiết trạng thái</Button>
                            </div>
                        </OrderSummaryDetail>
                    </OrderSummary>
                </Card>
            </Badge.Ribbon>
        </OrderContainer>
    )

}


const WebMyOrders = () => {

    const auth = useSelector(state => state.auth.auth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const [data, setData] = useState([]);
    const [statusList, setStatusList] = useState([{ id: 0, title: "Tất cả" }])
    const [tabData, setTabData] = useState([]);
    const { username } = auth ? auth.info : "";
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [isModalStatus, setIsModalStatus] = useState(false)
    const [modalStatusInfo, setModalStatusInfo] = useState(undefined)


    const statusModalColumns = [
        {
            title: '',
            render: (record) => {
                return (
                    <>
                        {record?.statusOrder?.title}
                    </>
                )
            }
        },
        {
            title: 'Thời Gian',
            render: (record) => {
                return (
                    <>
                        {moment(record?.timeDate).format('DD/MM/YYYY, H:mm:ss')}
                    </>
                )
            }
        },
        {
            title: 'Người Xác Nhận',
            render: (record) => {
                return (
                    <>
                        {record?.usersUpdate?.username}
                    </>
                )
            }
        },
        {
            title: 'Ghi Chú',
            render: (record) => {
                console.log(record)
                return (
                    <>
                        {record?.description}
                    </>
                )
            }
        }
    ]

    const onClickViewStatusInfo = (order) => {
        if (order) {
            setIsModalStatus(true);
            setModalStatusInfo(order);
        }
    }


    const filterOrdersByStatus = (arr, id) => {
        let resArr = [];
        if (id > 0) {
            resArr = arr.filter(item => item?.statusDetail[item?.statusDetail.length - 1]?.statusOrder.id === id)
            return resArr;
        } else if (id === 0) {
            return arr;
        } else {
            return [];
        }
        return []
    };

    useEffect(() => {
        if (auth) {
            ordersAPI.getMyOrders(username)
                .then(res => {
                    if (!res.status) {
                        console.log(res)
                        setData(res);
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err));
        } else {
            navigate("/login")
        }

    }, [auth])

    useEffect(() => {
        ordersAPI.getAllOrderStatus()
            .then(res => {
                if (!res.status) {
                    setStatusList([
                        { id: 0, title: "Tất cả" },
                        ...res
                    ])
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (data.length && data.length >= 0) {
            let arr = [];
            statusList.forEach(item => {
                arr.push({
                    label: item.title,
                    key: item.id,
                    children: (
                        filterOrdersByStatus(data, item.id).length > 0 ?
                            (
                                filterOrdersByStatus(data, item.id).sort((a, b) => (a.createdDate > b.createdDate ? -1 : 1))
                                    .map(item => (
                                        <Order key={item.id} order={item} onClickViewStatusInfo={onClickViewStatusInfo} />
                                    ))
                            )
                            :
                            (
                                <><Empty /></>
                            )
                    )
                })
            })
            setTabData(arr)
        }
    }, [data, statusList])


    return (
        <Helmet
            title="Danh sách đơn hàng"
        >
            <Container>
                <Wrapper>
                    {
                        isAuth ?
                            (
                                <>
                                    <NavContainer>
                                        <Nav>
                                            <Link
                                                to="/my-account"
                                                style={{ color: 'inherit' }}
                                            >
                                                <NavItem actived={location.pathname === '/my-account'}>
                                                    tài  khoản  của tôi
                                                </NavItem>
                                            </Link>
                                            <Link
                                                to="/change-password"
                                                style={{ color: 'inherit' }}
                                            >
                                                <NavItem actived={location.pathname === '/change-password'}>
                                                    đổi mật khẩu
                                                </NavItem>
                                            </Link>
                                            <Link
                                                to="/my-orders"
                                                style={{ color: 'inherit' }}
                                            >
                                                <NavItem actived={location.pathname === '/my-orders'}>
                                                    đơn  hàng
                                                </NavItem>
                                            </Link>
                                        </Nav>
                                    </NavContainer>
                                    <ContentContainer>
                                        {
                                            tabData && tabData.length > 0 && (
                                                <Tabs items={tabData} />
                                            )
                                        }
                                    </ContentContainer>
                                </>
                            )
                            :
                            (
                                <>
                                    <Spin />
                                </>
                            )
                    }

                </Wrapper>
                <Modal
                    open={isModalStatus}
                    centered
                    okText={false}
                    cancelText={"Đóng"}
                    onCancel={() => { setIsModalStatus(false); setModalStatusInfo(undefined) }}
                    width={1000}
                >
                    <Table columns={statusModalColumns} dataSource={modalStatusInfo?.statusDetail} pagination={false} />
                </Modal>
            </Container>
        </Helmet>
    )
}

export default WebMyOrders