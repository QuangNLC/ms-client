import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LineStyleIcon from '@mui/icons-material/LineStyle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link, useLocation } from 'react-router-dom';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Badge, Menu } from 'antd';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useSelector } from 'react-redux'
import messagesAPI from '../api/messagesAPI'
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useRef } from 'react';


var stompClient = null;

const Container = styled.div`
    width: 20%;
    height: 100vh;
    background-color: rgb(251, 251, 255);
    position: sticky;
`
const Wrapper = styled.div`
    padding: 20px;
    color: #555;
`
// const Menu = styled.div`
//     margin-bottom: 10px;
// `
// const Title = styled.h3`
//     font-size: 13px;
//     color: rgb(197, 194, 194);
// `
// const List = styled.ul`
//     list-style: none;
//     padding: 0;
// `
// const Item = styled.li`
//     width: 100%;
//     display: flex;
//     align-items: center;
//     padding: 5px;
//     border-radius: 10px;
//     cursor: pointer;
//     background-color: ${props => props.active ? "rgb(228,228,250)" : "transparent"}; 
//     &:hover{
//         background-color: rgb(228,228,250); 
//     }
//     margin: 10px;
// `
// const ItemText = styled.p`
//     text-decoration: none;
//     height: 100%;
//     margin: 0 10px;
// `


const getItem = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


const AdmSidebar = () => {
    const location = useLocation();
    const isAuth = useSelector(state => state.auth.isAuth);
    const auth = useSelector(state => state.auth.auth);
    const [count, setCount] = useState(0)
    const [selectedKeys, setSelectedKeys] = useState([])
    const menuRef = useRef();

    const items = [
        getItem('Chức Năng', 'sub1', <DashboardOutlinedIcon />, [
            getItem('Thống Kê', 'sub1-i1', <Link to="/admin"></Link>),
            getItem('Tài Khoản', 'sub1-i2', <Link to="/admin/user-list"></Link>)
        ]),
        getItem('Sản Phẩm', 'sub2', <StorefrontOutlinedIcon />, [
            getItem('Thể Loại', 'sub2-i1', <Link to="/admin/category-list"></Link>),
            getItem('Chất Liệu ', 'sub2-i4', <Link to="/admin/material-list"></Link>),
            getItem('Danh Sách ', 'sub2-i2', <Link to="/admin/product-list"></Link>),
            getItem('Khuyến Mại', 'sub2-i3', <Link to="/admin/promotions"></Link>)
        ]),
        getItem('Hóa Đơn', 'sub3', < EventNoteOutlinedIcon />, [
            // getItem('Tạo Đơn', 'sub3-i1',<Link to="/admin/bills"></Link>),
            getItem('Danh Sách Hoá Đơn', 'sub3-i2', <Link to="/admin/order-list"></Link>),
        ]),
        getItem('Hộp Thư Đến', 'sub4', <Link to="/admin/message"><Badge count={count}></Badge></Link>),
        getItem('Website', 'sub5', <Link to="/"></Link>)
    ];

    const connectCountMessageNoti = () => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, () => {
            stompClient.subscribe('/noti/adm-message-count', onListNotiReceived)
            console.log('connect to received notification!')
        }, onError);
    }

    const onListNotiReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        console.log(payloadData)
        setCount(Number(payloadData))
    }

    const onError = (err) => {
        console.log(err);
    }

    useEffect(() => {
        console.log(location.pathname)
        switch (location.pathname) {
            case ('/admin'): {
                setSelectedKeys(['sub1-i1'])
                break;
            }
            case ('/admin/user-list'): {
                setSelectedKeys(['sub1-i2'])
                break;
            }
            case ('/admin/category-list'): {
                setSelectedKeys(['sub2-i1'])
                break;
            }
            case ('/admin/product-list'): {
                setSelectedKeys(['sub2-i2'])
                break;
            }
            case ('/admin/promotions'): {
                setSelectedKeys(['sub2-i3'])
                break;
            }
            case ('/admin/promotion/new'): {
                setSelectedKeys(['sub2-i3'])
                break;
            }
            case ('/admin/material-list'): {
                setSelectedKeys(['sub2-i4'])
                break;
            }
            case ('/admin/bills'): {
                setSelectedKeys(['sub3-i1'])
                break;
            }
            case ('/admin/order-list'): {
                setSelectedKeys(['sub3-i2'])
                break;
            }
            case ('/admin/message'): {
                setSelectedKeys(['sub4'])
                break;
            }
            default: {
                setSelectedKeys([])
                break;
            }

        }
    }, [location])

    useEffect(() => {
        auth && auth.info &&
            messagesAPI.getNewMessageCount()
                .then(res => {
                    if (!res.status) {
                        setCount(res)
                        connectCountMessageNoti()
                        console.log(res)
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
    }, [auth])

    return (
        <Container>
            <Wrapper>
                <Menu
                    items={items}
                    mode="inline"
                    defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                    selectedKeys={selectedKeys}
                    style={{ height: '100%' }}
                    ref={menuRef}
                />
                {/* <Menu>
                    <List>
                        <Link to="/admin" style={{ textDecoration: "none", color: "unset" }}>
                            <Item active={location.pathname === "/admin"}>
                                <LineStyleIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText>
                                    Trang Chủ
                                </ItemText>
                            </Item>
                        </Link>
                    </List>
                </Menu>
                <Menu>
                    <List>
                        <Link to="/admin/user-list" style={{ textDecoration: "none", color: "unset" }}>
                            <Item active={location.pathname === "/admin/user-list"}>
                                <PermIdentityIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText style={{ marginBottom: "0px" }}>
                                    Tài Khoản Người Dùng
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/category-list" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <StorefrontIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText style={{ marginBottom: "0px" }}>
                                    Thể Loại Sản Phẩm
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/product-list" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <StorefrontIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText style={{ marginBottom: "0px" }}>
                                    Sản Phẩm
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/bills" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <NoteAddOutlinedIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText>
                                    Tạo Đơn Hàng
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/order-list" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <EventNoteIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText style={{ marginBottom: "0px" }}>
                                    Hoá Đơn
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/promotions" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <LocalActivityOutlinedIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <ItemText style={{ marginBottom: "0px" }}>
                                    Khuyến Mại
                                </ItemText>
                            </Item>
                        </Link>
                        <Link to="/admin/message" style={{ textDecoration: "none", color: "unset" }}>
                            <Item>
                                <EmailOutlinedIcon style={{ fontSize: "20px", marginRight: "10px" }} />
                                <Badge count={count && (count <= 10 ? count : "10+")}>
                                    <ItemText>
                                        Hộp Thư Đến
                                    </ItemText>
                                </Badge>
                            </Item>
                        </Link>

                    </List>
                </Menu> */}
            </Wrapper>
        </Container >
    )
}

export default AdmSidebar