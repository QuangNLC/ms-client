import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone';
import styled from 'styled-components'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux';

const Container = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
`

const Content = styled.div`
    margin: 140px auto 0 auto;
    max-width: 100%;
    min-height: 100vh;
    
    background-color: #f5f4f2;
`
const MessageContainer = styled.div`
    position: fixed;
    z-index: 2;
    width: 80px;
    height: 80px;
    padding: 10px;
    background-color: rgba(0,0,0,0.65);
    display:flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    border-radius: 50%;
    right: 20px;
    bottom: 5%;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    color: white;
`

const WebsiteLayout = () => {

    const isAuth = useSelector(state => state.auth.isAuth)

    const location = useLocation();

    const navigate = useNavigate();

    const handleClickMatchMessage = () => {
        if (isAuth) {
            navigate('/message')
        } else {
            navigate('/login')
        }
    }

    return (
        <Container>
            {
                location.pathname !== '/message' &&
                <MessageContainer style={{ width: "10px", height: "10px" }} onClick={handleClickMatchMessage}>
                    <QuestionAnswerTwoToneIcon />
                </MessageContainer>
            }
            <Header />
            <Content>
                <Outlet />
            </Content>
            <Footer />
        </Container>
    )
}

export default WebsiteLayout