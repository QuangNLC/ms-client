import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Spin, Typography, Upload, Modal } from 'antd'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import usersAPI from '../../api/usersAPI'
import { logOutAction, setAuthAction } from '../../redux/actions/AuthReducerAction'
import { useForm } from 'antd/lib/form/Form'
import { Password } from '@mui/icons-material'



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
`

const WebChangePassword = () => {

    const auth = useSelector(state => state.auth.auth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const { username } = auth ? auth.info : "";
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = useForm();
    const dispatch = useDispatch();

    const onFinish = (value) => {
        const { confirmPassword, ...req } = value;

        console.log(req)
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn đổi mật khẩu không ?',
            okText: "Xác Nhận",
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                usersAPI.changePassword(auth.info.username, req)
                    .then(res => {
                        if (!res.status) {
                            Modal.success({
                                title: 'Hộp Thoại  Thông Báo',
                                content: "Đổi mật khẩu thành công. Vui lòng đăng nhập lại."
                            });
                            dispatch(logOutAction());
                            navigate('/login');
                        } else {
                            Modal.error({
                                title: 'Hộp Thoại  Thông Báo',
                                content: "Sai mật khẩu. Vui lòng thử lại."
                            })
                        }
                    })
                    .catch(err => console.log(err))
            }
        });
    }

    useEffect(() => {
        if (auth) {
        } else {
            navigate("/login")
        }
    }, [auth])
    return (
        <Helmet
            title="Đổi mật khẩu"
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
                                        <Top>
                                            <Typography.Title>Đổi Mật Khẩu</Typography.Title>
                                            <Typography.Text>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác.</Typography.Text>
                                        </Top>
                                        <Bottom>
                                            <FormContainer>
                                                <Form
                                                    name="changepassword"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 20 }}
                                                    layout='horizontal'
                                                    onFinish={onFinish}
                                                >
                                                    <Form.Item
                                                        label="Mật Khẩu Hiện Tại"
                                                        name="password"
                                                        hasFeedback
                                                        rules={[
                                                            { required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' },
                                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                                        ]}
                                                    >
                                                        <Input.Password />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Mật Khẩu Mới"
                                                        name="newPassword"
                                                        hasFeedback
                                                        rules={[
                                                            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                                        ]}
                                                    >
                                                        <Input.Password />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Xác Nhận Mật Khẩu"
                                                        name="confirmPassword"
                                                        hasFeedback
                                                        rules={[
                                                            { required: true, message: 'Vui lòng nhập lại mật khẩu mới!' },
                                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' },
                                                            ({ getFieldValue }) => ({
                                                                validator(_, value) {
                                                                    if (!value || getFieldValue('newPassword') === value) {
                                                                        return Promise.resolve()
                                                                    }
                                                                    return Promise.reject('Xác nhận mật khẩu không trùng khớp!')
                                                                }
                                                            })
                                                        ]}
                                                    >
                                                        <Input.Password />
                                                    </Form.Item>
                                                    <Form.Item
                                                    // label=" ss"
                                                    >
                                                        <Button style={{ marginLeft: "170px", borderRadius: "20px" }} type='primary' htmlType='submit'>Xác Nhận</Button>
                                                    </Form.Item>
                                                    <Form.Item
                                                    >
                                                        <Link to="forgot-password">Quên mật khẩu</Link>
                                                    </Form.Item>
                                                </Form>
                                            </FormContainer>
                                        </Bottom>
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
            </Container>
        </Helmet>
    )
}

export default WebChangePassword