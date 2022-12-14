import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import messagesAPI from '../../api/messagesAPI';
import styled from 'styled-components'
import { Avatar } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useRef } from 'react';

const Container = styled.div`
    width: 100%;
    padding: 50px;
`
const ChatContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    overflow: hidden;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const ChatTitle = styled.div`
    width : 100%;
    text-transform: capitalize;
    font-size: 20px;
    padding :20px;
    color: white;
    background-color: teal;
`
const ChatMessagesContainer = styled.div`
    padding: 30px 120px;
    width:100%;
    background-color: white;
`
const Messages = styled.div`
    width: 100%;
    height: 60vh;
    overflow-Y: scroll;
`
const Message = styled.div`
    width: 100%;
    padding: 10px 15px;
    margin-top: 20px;
    diplay: flex;
    flex-direction: column;
`
const SendTime = styled.div`
    width: 100%;
    text-align: ${props => props.messageType === 'send' ? 'right' : 'left'};
`
const Content = styled.div`
    width: 60%;
    max-width: 750px;
    background-color: ${props => props.messageType === 'send' ? '#a8c3f0' : 'lightgray'};
    padding: 15px 20px;
    border-radius: 10px 10px 10px 0;
    margin-left: ${props => props.messageType === 'send' ? 'auto' : '0'};
`
const InputContainer = styled.div`
    padding: 30px 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #d0f5ee;
`
const ChatInput = styled.input`
    flex: 1;
    border: none;
    padding: 10px;
    outline: none;
`
const ChatAction = styled.div`
    width: 60px;
    margin-left: 20px;
    color: blue;
    cursor: pointer;

    transition: all 0.25s ease-in;

    &:hover{
        color: darkblue;
    }

`


var moment = require('moment');


var stompClient = null;
const WebMessage = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const auth = useSelector(state => state.auth.auth);
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();
    const messageElementRef = useRef();
    const [myMessages, setMyMessages] = useState([]);
    const [publicChats, setPublicChats] = useState([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: "",
        receiverName: "",
        connected: false,
        message: ""
    });
    const [sendContent, setSendContent] = useState("")

    const handleChangeMessage = (e) => {
        const { value } = e.target;
        setUserData({ ...userData, message: value });
    }

    const connectWithUser = () => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        if (auth && auth.info) {
            stompClient.subscribe('/user/' + auth.info.username + '/private', onPrivateMessageReceived);
            console.log('connect with user: ' + auth.info.username)
            userJoin();
        }
    }

    const userJoin = () => {
        // let chatMessage = {
        //     senderName: userData.username,
        //     status: "JOIN"
        // };
        // stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
    }

    const onPublicMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case ("JOIN"): {
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            }
            case ("MESSAGE"): {
                publicChats.push(payloadData);
                setPublicChats([...publicChats])
                break;
            }
        }
    }

    const onPrivateMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        console.log(payloadData)
        setMyMessages(prev => {
            console.log(prev)
            return [...prev, payloadData]
        })
    }

    const onError = (err) => {
        console.log(err);
    }

    const sendPublicMessage = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: "" });
        }
    }
    const sendPrivateMessage = () => {
        if (stompClient) {
            // let chatMessage = {
            //     senderName: userData.username,
            //     receiverName: tab,
            //     message: userData.message,
            //     status: "MESSAGE"
            // };
            // if (userData.username !== tab) {
            //     privateChats.get(tab).push(chatMessage);
            //     setPrivateChats(new Map(privateChats));
            // }
            // stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
            // setUserData({ ...userData, message: "" });
            console.log()
            messagesAPI.sendPrivateMessagesToAdm(auth.info.username, { content: sendContent })
                .then(res => {
                    console.log(res)
                    setSendContent('')
                })
                .catch(err => console.log(err))
        }
    }


    useEffect(() => {
        setMyMessages(myMessages.sort((a, b) => a.createdat - b.createdat));
        messageElementRef && messageElementRef.current && (messageElementRef.current.scrollTop = messageElementRef.current.scrollHeight)
    }, [myMessages])

    useEffect(() => {
        auth && auth.info &&
            messagesAPI.getPrivateMessages(auth.info.username)
                .then(res => {
                    if (!res.status) {
                        setMyMessages(res)
                        connectWithUser()
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err));
    }, [auth])

    useEffect(() => {
        if (isAuth) {
            setChecking(false)
        } else {
            setChecking(true)
            navigate("/login")
        }
    }, [])


    return (
        <>
            {
                checking ?
                    (
                        <>
                            loading...
                        </>
                    )
                    :
                    (
                        <Container>
                            <ChatContainer>
                                <ChatTitle>Trò chuyện với quản trị viên.</ChatTitle>
                                <ChatMessagesContainer>
                                    <Messages ref={messageElementRef}>
                                        {
                                            myMessages.length > 0 && myMessages.map((item, index) => (
                                                <Message key={index} messageType={item.sendedby.username === 'admchat' ? 'receive' : 'send'}>
                                                    <SendTime messageType={item.sendedby.username === 'admchat' ? 'receive' : 'send'}>{moment(item.createdat).format('DD/MM/YYYY, H:mm:ss')}</SendTime>
                                                    <Content messageType={item.sendedby.username === 'admchat' ? 'receive' : 'send'}>
                                                        {item.content}
                                                    </Content>
                                                </Message>
                                            ))
                                        }
                                    </Messages>
                                </ChatMessagesContainer>
                                <InputContainer>
                                    <ChatInput onChange={e => setSendContent(e.target.value)} value={sendContent} />
                                    <ChatAction onClick={sendPrivateMessage}>
                                        <SendOutlinedIcon style={{ fontSize: '30px' }} />
                                    </ChatAction>
                                </InputContainer>
                            </ChatContainer>
                        </Container>
                    )
            }
        </>
    )
}

export default WebMessage   