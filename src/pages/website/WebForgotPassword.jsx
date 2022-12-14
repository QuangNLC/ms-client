import { Button, Input, Typography, Form, Modal, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import usersAPI from '../../api/usersAPI'
import Helmet from '../../components/Helmet'

const Container = styled.div`
    width: 100%;
    padding: 50px;
`

const Wrapper = styled.div`
    padding: 20px;
    border-radius: 20px;
    width: 100%;
    background-color: white;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const MailInputContainer = styled.div`
    padding: 10px;
`
const PasswordInputContainer = styled.div``

const WebForgotPassword = () => {
    const [mailCheck, setMailCheck] = useState(false)
    const [mailChecking, setMailChecking] = useState(false)
    const [mailCheckErr, setMailErr] = useState(undefined)
    const [mailInputForm] = useForm();
    const [newPassForm] = useForm();
    const navigate = useNavigate()
    const onClickSendVerify = (value) => {
        setMailChecking(true)
        setMailErr(undefined)
        usersAPI.receivedVerifyCodde(value.email)
        .then(res  => {
            if(!res.status){
                setMailChecking(false)
                setMailCheck(true)
            }else{
                setMailChecking(false)
                setMailErr(res.data)
            }
        })
        .catch(err => {setMailChecking(false); setMailErr(err)})
    }

    const handleSubmitChangePassword = (value) => {
        console.log(value)
        let payload = {
            code: value?.code,
            newpass: value?.newpass
        }
        usersAPI.changePasswordWithVerifyCode(payload)
        .then(res => {
            if(!res.status){
                Modal.info({
                    title: 'Hộp thoại thông báo',
                    content: 'Thiết lập mật khẩu thành công'
                })
                navigate("/login") 
            }else{
                Modal.error({
                    title: 'Hộp Thoại Thông Báo',
                    content: 'Mã xác minh không chính xác. Vui lòng kiểm tra lại email.'
                })
            }
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    return (
        <Helmet
            title={'Quên Mật Khẩu'}
        >
            <Container>
                <Wrapper>
                    <Typography.Title level={4}>Quên mật khẩu</Typography.Title>
                    <MailInputContainer>
                        <Typography.Text>Vui lòng nhập email đã đăng ký.</Typography.Text>
                        <Form
                            form={mailInputForm}
                            onFinish={onClickSendVerify}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email.' },
                                    { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' },
                                    { type: 'email', message: 'Vui lòng nhập đún định dạng email' }
                                ]}
                            >
                                <Input disabled={mailCheck} placeholder={'Nhập email của bạn'} />
                            </Form.Item>
                            {!mailCheck &&
                                <Button type='primary' htmlType='submit'> Gửi Mã Xác Nhận</Button>
                            }
                        </Form>
                        {
                            mailCheckErr && <Typography.Text>{mailCheckErr}</Typography.Text>
                        }
                    </MailInputContainer>
                    {
                        mailCheck &&
                        <PasswordInputContainer>
                            <Form
                                form={newPassForm}
                                layout={'vertical'}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 24 }}
                                onFinish={handleSubmitChangePassword}
                            >
                                <Form.Item
                                    label="Mã xác minh"
                                    name="code"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập mã xác minh!' },
                                        { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Mật khẩu mới"
                                    name="newpass"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập Mật khẩu!' },
                                        { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Xác nhận mật khẩu mới"
                                    name="newpassConfirm"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập Xác nhận mật khẩu!' },
                                        { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newpass') === value) {
                                                    return Promise.resolve()
                                                }
                                                return Promise.reject('Xác nhận mật khẩu không trùng khớp!')
                                            }
                                        })
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type='primary' htmlType='submit'>Xác Nhận</Button>
                                </Form.Item>
                            </Form>
                        </PasswordInputContainer>
                    }
                </Wrapper>
                <Modal
                    open={mailChecking}
                    closable={false}
                >
                    {
                        mailChecking && <Spin />
                    }
                </Modal>
            </Container>
        </Helmet>
    )
}

export default WebForgotPassword