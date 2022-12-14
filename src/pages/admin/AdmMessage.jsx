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
import { Badge, Empty } from 'antd';

const Container = styled.div`
    width: 100%;
    padding: 50px;
    display: flex;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const ListContainer = styled.div`
    width: 20%;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const ListTitle = styled.div`
    height: 80px;
    background-color: #d0f5ee;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ListWrapper = styled.div`
    width :100%;
    height: 60vh;
    overflow-Y: scroll;
    padding: 30px 0;
`

const MemberList = styled.ul`
    width: 100%;
`
const MemberWrapper = styled.li`
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 10px;

    background-color: ${props => props.activeMember ? "teal" : "transparent"};
    color: ${props => props.activeMember ? "white" : "black"};
    font-size: 18px;
    transition: all 0.25s ease-in;
    cursor: pointer;
    &:hover{
        background-color: #d0f5ee;
        color: black;
    }
`
const MemberName = styled.span``
const MemberNewMessageCount = styled.div``

const ChatContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.15);
    overflow: hidden;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    width: 80%;
`
const ChatTitle = styled.div`
    width : 100%;
    text-transform: capitalize;
    font-size: 20px;
    padding :20px;
    color: white;
    background-color: teal;
    height: 80px;
`
const ChatMessagesContainer = styled.div`
    padding: 30px 120px;
    width: 100%;
    background-color: white;
`
const Messages = styled.div`
    width: 100%;
    border: 1px solid teal;
    height: 70vh;
    overflow-Y: scroll;
    overflow-X: hidden;

`
const Message = styled.div`
    width: 100%;
    padding: 10px 15px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: ${props => (props.send ? 'flex-end' : 'flex-start')};
`
const Time = styled.div`
    font-size: 12px;
    color: #999;

`
const Chat = styled.div`
    max-width: 60%;
    padding: 10px;
    background-color: ${props => (props.send ? 'teal' : 'rgba(0, 0, 0, 0.15)')};
    border-radius: ${props => (props.send ? '10px 10px 0 10px' : '10px 10px 10px 0')};
`
const Name = styled.div``
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

const ChatMemberList = ({ list, hanldeClickMember, matchingUser }) => {

    return (
        <MemberList>
            {list &&
                (
                    list?.length > 0 ?
                        (
                            list.sort((a, b) => (a.latestmessage > b.latestmessage ? -1 : 1)).map(item => (
                                <Member member={item} key={item.username} hanldeClickMember={hanldeClickMember} isActive={matchingUser === item.username} />
                            ))
                        )
                        :
                        (
                            <>
                                <Empty />
                            </>
                        )
                )}
        </MemberList>
    )
}

const Member = ({ member, hanldeClickMember, isActive }) => {

    return (
        member &&
        <MemberWrapper onClick={() => hanldeClickMember(member.username)} activeMember={isActive}>
            {member?.newmessage > 0 ?
                <Badge count={member?.newmessage}>
                    <MemberName>{member?.username}</MemberName>
                </Badge>
                :
                <MemberName>{member?.username}</MemberName>
            }
            {/* <MemberNewMessageCount>{member?.newmessage}</MemberNewMessageCount> */}
        </MemberWrapper>
    )
}



const AdmMessage = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const auth = useSelector(state => state.auth.auth);
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();
    const messageElementRef = useRef();
    const [myMessages, setMyMessages] = useState([]);
    const [chatMemberList, setChatmemberList] = useState([]);
    const [matchingUser, setMatchingUser] = useState(undefined);
    const [sendContent, setSendContent] = useState("")


    const connectWithUser = (username) => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, () => onConnected(username), onError);
    }

    const connectListChatNoti = () => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, () => {
            stompClient.subscribe('/noti/adm-message', onListNotiReceived)
            console.log('connect to received notification!')
        }, onError);
    }

    const onConnected = (username) => {
        if (username) {
            stompClient.subscribe('/user/' + username + '/private', onPrivateMessageReceived, { id: username });
            console.log('connect with user: ' + username)
            userJoin();
        }
    }


    const userJoin = () => {
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
    const sendPrivateMessage = () => {
        if (stompClient) {
            if (matchingUser) {
                messagesAPI.replyPrivateMessageFromAdm(matchingUser, {
                    "createdby": "admchat",
                    "sendedby": "admchat",
                    "content": sendContent
                })
                    .then(res => {
                        console.log(res)
                        setSendContent('')
                    })
                    .catch(err => console.log(err))
            }
        }
    }


    const hanldeMatchingUser = (username) => {
        setMatchingUser(username)
    }

    const hanldeSeenMessage = (username) => {
        let index = chatMemberList.findIndex((item) => item.username === username)
        console.log('seened message')
        console.log(index)
        if (index !== -1) {
            chatMemberList[index].newmessage = 0
            setChatmemberList([...chatMemberList])
        }
    }

    const onListNotiReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        console.log(payloadData)
        if (!payloadData.resetCount) {
            setMatchingUser(matchUser => {
                console.log(matchUser)
                setChatmemberList(current => {
                    let index = current.findIndex(item => item.username === payloadData.username)

                    if (index === -1) {
                        return [{ ...payloadData }, ...current]
                    } else {
                        if (payloadData.username === matchUser) {
                            payloadData.newmessage = 0
                            messagesAPI.seenByAdm(matchUser)
                                .then((res => {
                                    console.log(res)
                                }))
                                .catch(err => console.log(err))
                        }
                        let newList = [...current]
                        newList[index] = {
                            ...newList[index],
                            ...payloadData
                        }

                        return [...newList]
                    }
                })
                return matchUser
            })
        } else {
            setChatmemberList(current => {
                let index = current.findIndex(item => item.username === payloadData.username)

                if (index === -1) {
                    return [{ ...payloadData }, ...current]
                } else {
                    let newList = [...current]
                    newList[index].newmessage = 0;
                    newList[index] = {
                        ...newList[index],
                        ...payloadData
                    }

                    return [...newList]
                }
            })
            console.log('resetcount')
        }

    }


    useEffect(() => {
        if (matchingUser) {
            messagesAPI.getPrivateMessagesForAdm(matchingUser)
                .then(res => {
                    if (!res.status) {
                        hanldeSeenMessage(matchingUser)
                        setMyMessages(res)
                    } else {
                        console.log(res)
                    }
                })
                .then(() => {
                    connectWithUser(matchingUser)
                })
                .catch(err => console.log(err))
        }

        return (() => {
            if (matchingUser && stompClient) {
                console.log('unsub ' + matchingUser)
                stompClient.unsubscribe(matchingUser)
            }
        })
    }, [matchingUser])

    useEffect(() => {
        if (chatMemberList && chatMemberList.length > 0) {
        }
    }, [chatMemberList])

    useEffect(() => {
        setMyMessages(myMessages.sort((a, b) => a.createdat - b.createdat));
        messageElementRef && messageElementRef.current && (messageElementRef.current.scrollTop = messageElementRef.current.scrollHeight)
    }, [myMessages])

    useEffect(() => {
        auth && auth.info &&
            messagesAPI.getListMemberForAdm()
                .then(res => {
                    if (!res.status) {
                        setChatmemberList(res)
                        connectListChatNoti()
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
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
                        <React.StrictMode>

                            <Container>
                                <ListContainer>
                                    <ListTitle>Danh Sách</ListTitle>
                                    <ListWrapper>
                                        <ChatMemberList list={chatMemberList} hanldeClickMember={hanldeMatchingUser} matchingUser={matchingUser} />
                                    </ListWrapper>
                                </ListContainer>
                                <ChatContainer>
                                    <ChatTitle>{matchingUser ? matchingUser : 'Trò chuyện với khách hàng'}</ChatTitle>
                                    <ChatMessagesContainer>
                                        <Messages ref={messageElementRef}>
                                            {
                                                myMessages.length > 0 && myMessages.map((item, index) => (
                                                    <Message key={index} send={item.sendedby.username === 'admchat'}>
                                                        <Time>
                                                            {moment(item.createdat).format('DD/MM/YYYY, H:mm:ss')}
                                                        </Time>
                                                        <Chat style={{ paddingBottom: "0px" }} send={item.sendedby.username === 'admchat'}>
                                                            <p>
                                                                {item.content}
                                                            </p>
                                                        </Chat>
                                                        {/* <Name>
                                                            {item.createdby.username}
                                                        </Name> */}
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
                        </React.StrictMode>
                    )
            }
        </>
    )
}

export default AdmMessage   