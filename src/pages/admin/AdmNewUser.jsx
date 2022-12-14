import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, notification } from 'antd'
import authAPI from '../../api/authAPI'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    padding: 20px;
`
const Wrapper = styled.div`
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: white;
    border-radius: 10px;
`
const Title = styled.h1``
const FormWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Item = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
`
const ItemLabel = styled.label`
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
    color: rgb(151,150,150);
`
const ItemInput = styled.input`
    height: 30px;
    padding: 20px;
    border: 1px solid gray;
    border-radius: 10px;
    margin-bottom: 30px;
`
const Genders = styled.div`
    width: 100%;
    margin-bottom: 10px;
`
const GenderOptions = styled.div`
    width: 400px;
    padding: 20px;
    display: flex;
    align-items:center;
    justify-content: space-around;
`
const Select = styled.select`
    height: 40px;
    border-radius: 10px;
    padding: 0px 20px;
    width: 400px;
`
const SelectOption = styled.option`
`


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description:
            des,
    });
};


const AdmNewUser = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState(3)
    const onClickCreateAccount = (value) => {
        const payload = {
            ...value,
            role: selectedRole
        }
        console.log(payload)
        try {
            authAPI.registerByAdmd(payload)
                .then(res => {
                    if (!res.status) {
                        openNotificationWithIcon('success', 'Đăng ký thành công!', 'Đăng ký thành công!');
                        navigate('/admin/user-list')

                    } else {
                        openNotificationWithIcon('error', 'Đăng ký thất bại!', 'Đăng ký thất bại!');
                        console.log(res)
                    }

                })
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Container>
            <Wrapper>
                <Title>Thêm tài khoản mới</Title>
                <Form
                    layout='vertical'
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onClickCreateAccount}
                >
                    <FormWrapper>
                        <Item>
                            <Form.Item
                                label={"Tên Đăng Nhập"}
                                name="username"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên tài khoản!' },
                                    { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                ]}
                            >
                                <Input
                                    placeholder="Tên Đăng Nhập"
                                />
                            </Form.Item>
                        </Item>
                        <Item>
                            <Form.Item
                                label={"Họ Và Tên"}
                                name="fullname"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập Họ và tên!' },
                                    { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                ]}
                            >
                                <Input
                                    placeholder="Họ Và Tên"
                                />
                            </Form.Item>
                        </Item>
                        <Item>
                            <Form.Item
                                label={"Email"}
                                name="email"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập Email!' },
                                    { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' },
                                    { type: 'email' }
                                ]}
                            >
                                <Input
                                    placeholder="Email"
                                />
                            </Form.Item>
                        </Item>
                        <Item>
                            <Form.Item
                                label={"Số Điện Thoại"}
                                name="phone"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập Số điện thoại!' },
                                    { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                ]}
                            >
                                <Input
                                    placeholder="Số Điện Thoại"
                                />
                            </Form.Item>
                        </Item>
                        <Item>
                            <Form.Item
                                label={"Mật Khẩu"}
                                name="password"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập Mật khẩu!' },
                                    { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                ]}
                            >
                                <Input
                                    type='password'
                                    placeholder="Mật Khẩu"
                                />
                            </Form.Item>
                        </Item>
                        <Item>
                            <Form.Item
                                label={"Xác Nhận Mật Khẩu"}
                                name="confirmPasswrod"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng nhập Xác nhận mật khẩu!' },
                                    { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject('Xác nhận mật khẩu không trùng khớp!')
                                        }
                                    })
                                ]}
                            >
                                <Input
                                    type='password'
                                    placeholder="Xác Nhận Mật Khẩu"
                                />
                            </Form.Item>
                        </Item>
                        <Genders>
                            <ItemLabel>Quyền Truy cập</ItemLabel>
                            <GenderOptions style={{ paddingBottom: "5px" }}>
                                <Item>
                                    <ItemInput type="radio" name="role" id="user" value={3} style={{ marginBottom: "5px" }} defaultChecked  onClick={() => {setSelectedRole(3)}}/>
                                    <ItemLabel htmlFor='user' style={{ textAlign: "Center" }}>Người Dùng</ItemLabel>
                                </Item>
                                {/* <Item>
                                    <ItemInput type="radio" name="role" id="staff" value="STAFF" style={{ marginBottom: "5px" }} />
                                    <ItemLabel htmlFor='staff' style={{ textAlign: "Center" }}>Nhân Viên</ItemLabel>
                                </Item> */}
                                <Item>
                                    <ItemInput type="radio" name="role" id="admin" value={1} style={{ marginBottom: "5px" }}  onClick={() => {setSelectedRole(1)}}/>
                                    <ItemLabel htmlFor='admin' style={{ textAlign: "Center" }}>Quản Trị Viên</ItemLabel>
                                </Item>
                            </GenderOptions>
                        </Genders>
                        {/* <Item style={{ width: "100%" }}>
                            <ItemLabel>Trạng thái tài khoản</ItemLabel>
                            <Select name="active" id="active">
                                <SelectOption value="yes">Kích hoạt</SelectOption>
                                <SelectOption value="no">Không kích hoạt</SelectOption>
                            </Select>
                        </Item> */}
                        {/* <Button style={{ width: "120px", borderRadius: "20px" }}>Làm mới</Button> */}
                        <Button style={{ marginLeft: "20px", width: "120px", borderRadius: "20px" }} htmlType='submit'>Thêm mới</Button>
                    </FormWrapper>
                </Form>

            </Wrapper>
        </Container>
    )
}

export default AdmNewUser