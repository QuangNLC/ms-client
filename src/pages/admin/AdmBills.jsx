import React, { useEffect } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import productAPI from '../../api/productsAPI'
import { useState } from 'react'
import { Button, notification, Table, Tag, Typography } from 'antd'
import { formatter } from '../../utils'
import ordersAPI from '../../api/ordersAPI'
import { useNavigate } from 'react-router-dom'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useSelector } from 'react-redux'

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
    background-color: white;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
`

const ActionContainer = styled.div`
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-end;
`
const ListContainer = styled.div`
    width: 100%;
`

const StatusBadge = (props) => {

    const [color, setColor] = useState('blue')

    useEffect(() => {
        console.log(props.status)
        if (props.status) {
            switch (props.status.id) {
                case (1): {
                    setColor('orange')
                    break;
                }
                case (2): {
                    setColor('cyan')
                    break;
                }
                case (3): {
                    setColor('purple')
                    break;
                }
                case (4): {
                    setColor('blue')
                    break;
                }
                default: {
                    setColor('blue')
                    break;
                }
            }
        }
    }, [])

    return (
        <Tag color={color}>{props?.status?.title}</Tag>
    )
}


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};

const AdmBills = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth.auth);
    const handleCreateNewBill = () => {
        if (auth) {
            ordersAPI.createWatingOrder({ users: { username: auth?.info?.username }, orderDetail: [] })
                .then(res => {
                    if (!res.status) {
                        openNotificationWithIcon('success', 'Tạo Đơn Chờ', 'Tạo đơn chờ thành công')
                        navigate(`/admin/order/${res}`)
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index'
        },
        {
            title: 'Trạng Thái',
            render: (record) => {
                return (
                    <Tag color={'volcano'}>{record?.statusOrders?.title}</Tag>
                )
            },
            filters: [
                {
                    text: 'Chờ Xác Nhận',
                    value: 1,
                },
                {
                    text: 'Đã Xác Nhận',
                    value: 2,
                },
                {
                    text: 'Đang Giao',
                    value: 3,
                },
                {
                    text: 'Hoàn Thành',
                    value: 4,
                },
            ],
            onFilter: (value, record) => record.status.id === value,
        },
        {
            title: 'Tổng Sản Phẩm',
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
            sorter: (a, b) => a.totalQuantity - b.totalQuantity
        },
        {
            title: 'Thanh Toán',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (text) => (<>{formatter.format(text)}</>),
            sorter: (a, b) => a.total_price - b.total_price
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            sorter: (a, b) => (a.createdDate > b.createdDate ? -1 : 1)
        },
        {
            render: (text) => {
                return (
                    <ActionContainer>
                        {/* <Button icon={<RemoveRedEyeOutlinedIcon />} onClick={() => handleClickViewOrderInfo(text)}></Button> */}
                        <Button type='primary' icon={<RemoveRedEyeOutlinedIcon />} onClick={() => { navigate(`/admin/order/${text.id}`) }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Button>
                        {/* <Button icon={<DeleteOutlineOutlinedIcon />} danger type='primary' onClick={() => { handleDeleteOrder(text) }}></Button> */}
                    </ActionContainer>
                )
            }
        }
    ];
    useEffect(() => {
        // ordersAPI.getWatingOrderList()
        //     .then(res => {
        //         if (!res.status) {
        //             setData(res.map((item, index) => ({ index: index + 1, key: item.id, ...item, totalQuantity: item.orderDetail.length })))
        //             console.log(res)
        //         } else {
        //             console.log(res)
        //         }
        //     })
        //     .catch(err => console.log(err))
    }, [])
    return (
        <Helmet title="Hoá Đơn">
            <Container>
                <Wrapper>
                    <Typography.Title level={5}>Danh Sách Đơn Chờ</Typography.Title>
                    <ActionContainer>
                        <Button style={{ borderRadius: "20px" }} type='primary' onClick={handleCreateNewBill}>Tạo Đơn Hàng</Button>
                    </ActionContainer>
                    <ListContainer>
                        <Table dataSource={data} columns={columns} style={{ width: '100%' }} />
                    </ListContainer>
                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default AdmBills