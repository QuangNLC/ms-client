import React, { useEffect } from 'react'
import styled from 'styled-components'
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';
import { Badge, Button, Dropdown, Empty } from 'antd';
import avt from '../assets/imgs/avt.png';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ordersAPI from '../api/ordersAPI';
import { useDispatch, useSelector } from 'react-redux';
import {logOutAction} from '../redux/actions/AuthReducerAction'
import {clearCartAction} from '../redux/actions/CartReducerAtion'

const Container = styled.div`
    width: 100%;
    height:50px;
    margin-bottom: 20px;
`
const Wrapper = styled.div`
    height: 100%;
    padding: 0px 20px;
    display:flex;
    align-items: center;
    justify-content: space-between;

`
const Left = styled.div``
const Logo = styled.span`
    font-weight: bold;
    font-size: 30px;
    color: darkblue;
    cursor: pointer;
`
const Right = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
`
const IconContainer = styled.div`
    width: 30px;
    height: 30px;
    margin: 0px 10px;
    margin-right: 20px;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 4px;
    border: 2px solid darkblue;
`
const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`

const NotiItemWrapper = styled.div``
const NotiItemImg = styled.div``
const NotiImage = styled.img``
const NotiItemDetail = styled.div``

var stompClient = null;


const AvatarContainer = ({ auth }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickLogOut = () => {
        navigate("/adm-login")
        dispatch(clearCartAction())
        dispatch(logOutAction())
    };



    return (
        <>
            <AvatarImage src={`http://localhost:8080/api/file/images/${auth.info.photo}`} onClick={handleClick} />
            <Menu
                id="basic-menu"
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}

            >
                <MenuItem onClick={handleClose}>
                    <Link to="my-account" style={{ color: 'black' }}>
                        Tài Khoản Của Tôi
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="change-password" style={{ color: 'black' }}>
                        Đổi Mật Khẩu
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClickLogOut}>
                    Đăng Xuất
                </MenuItem>
            </Menu>
        </>
    )
}

const AdmTopbar = () => {

    const [notiList, setNotiList] = useState(undefined)
    const [isNotiOpen, setIsNotiOpen] = useState(false)
    const auth = useSelector(state => state.auth.auth);
    const navigate = useNavigate()
    const connectListOrderNoti = () => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, () => {
            stompClient.subscribe('/noti/adm-order', onListOrderNotiReceived)
            console.log('connect to received orders notification!')
        }, onError);
    }

    const onListOrderNotiReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        console.log(payloadData)
        setAnchorEl(null);
        setIsNotiOpen(false)
        setNotiList((curr) => {
            console.log(curr)
            curr.list = [{ ...payloadData.list[0] }, ...curr.list]
            curr.count = payloadData.count
            return { ...curr }
        })
    }

    const onError = (err) => {
        console.log(err);
    }
    const options = [
        'Show some love to MUI',
        'Show all notification content',
        'Hide sensitive notification content',
        'Hide all notification content',
    ];


    const handleClickOpenNoti = () => {
        setIsNotiOpen(true)
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        ordersAPI.seenNotiByAdm().then((res) => {
            if (!res.status) {
                console.log(res)
                setIsNotiOpen(true)
                setNotiList({
                    ...notiList,
                    count: 0
                })

            } else {
                console.log(res)
            }
        })
            .catch(err => console.log(err))
    };
    const handleClose = () => {
        setAnchorEl(null);
        setIsNotiOpen(false)
        
    };

    useEffect(() => {
        console.log(notiList)
    }, [notiList])

    useEffect(() => {
        connectListOrderNoti();
        ordersAPI.getOrderNotiList()
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setNotiList(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to="/admin">
                        <Logo>ManShop</Logo>
                    </Link>
                </Left>
                <Right>
                    <IconContainer>
                        <Badge count={notiList && notiList.count}
                            onClick={handleClick}
                        >
                            <NotificationsIcon />
                        </Badge>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={isNotiOpen}
                            onClose={handleClose}
                        >
                            {
                                notiList && notiList.list.length > 0 ?
                                    (
                                        <>
                                            {notiList.list.sort((a, b) => a.createdat > b.createdat ? -1 : 1).map((item, index) => (
                                                <MenuItem onClick={handleClose} key={index}>
                                                    <NotiItemWrapper>
                                                        <NotiItemImg>
                                                            <NotiImage />
                                                        </NotiItemImg>
                                                        <NotiItemDetail
                                                            onClick={() => {navigate("/admin/order-list")}}
                                                        >
                                                            {item.message}
                                                        </NotiItemDetail>
                                                    </NotiItemWrapper>
                                                </MenuItem>
                                            ))}
                                        </>
                                    )
                                    :
                                    (
                                        <Empty />
                                    )
                            }
                        </Menu>
                    </IconContainer>
                    <Avatar>
                        {/* <AvatarImage src={`http://localhost:8080/api/file/images/${auth?.info?.photo}`} /> */}
                        <AvatarContainer auth={{ ...auth }}/>
                    </Avatar>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default AdmTopbar