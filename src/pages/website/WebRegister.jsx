import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import authAPI from '../../api/authAPI'
import usersAPI from '../../api/usersAPI'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthAction } from '../../redux/actions/AuthReducerAction'
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/imgs/login-img.jpg'
import { Form, Input, notification, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import vietnamData from '../../assets/data/vietnamData.json';
import addressAPI from '../../api/addressAPI';
import Helmet from '../../components/Helmet';

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    padding: 50px;
`
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

`
const BackgroundImgContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 20px;

`
const BackgroundImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
`
const FormContainer = styled.div`
    padding: 30px;
    background-color: white;
    border-radius: 20px;
    width: 80%;
    z-index: 2;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const FormTitle = styled.h2`
    width: 100%;
    text-transform: capitalize;
`
const Button = styled.button`
    padding: 8px 20px;
    border: none;
    background-color: rgba(0, 0, 0, 0.65);
    color: white;
    border-radius: 20px;
    text-transform: capitalize;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.25s ease-in;

    &:hover{
        background-color: teal;
    }

`


const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description:
            des,
    });
};

const WebRegister = () => {

    const isAuth = useSelector(state => state.auth.isAuth);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const [form] = useForm();
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [selectedData, setSelectedData] = useState({
        cityId: null,
        districtId: null,
        wardId: null,
        name: "",
        phone: "",
        adress: "",
        note: "",
        payId: null
    })
    const dispatch = useDispatch();


    const onChangeCity = (value) => {
        console.log(value)
        form.setFieldValue('districtId', null)
        form.setFieldValue('wardId', null)
        setSelectedData({
            cityId: value,
            districtId: null,
            wardId: null
        })
    }

    const onChangeDistrict = (value) => {
        form.setFieldValue('wardId', null)
        setSelectedData({
            ...selectedData,
            districtId: value,
            wardId: null
        })
    }

    const onChangeWard = (value) => {
        setSelectedData({
            ...selectedData,
            wardId: value
        })
    }


    const onFinish = (value) => {
        console.log(value)
        try {
            authAPI.register({ ...value })
                .then(res => {
                    if (!res.status) {
                        openNotificationWithIcon('success', 'Đăng ký thành công!', 'Đăng ký thành công!');
                        navigate('/login')

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

    useEffect(() => {
        if (isAuth) {
            setCheckingAuth(true)
            navigate("/")
        } else {
            setCheckingAuth(false);
            addressAPI.getCityData()
                .then(res => {
                    if (!res.status) {
                        console.log(res)
                        setData(res)
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
        }
    }, [])
    return (
        <>
            {checkingAuth ?
                (
                    <>Loading...</>
                )
                :
                (
                    <Helmet
                        title="Đăng Ký"
                    >
                        <Container>
                            <Wrapper>
                                <BackgroundImgContainer>
                                    <BackgroundImg src={loginImg} />
                                </BackgroundImgContainer>
                                <FormContainer>
                                    <FormTitle>Đăng Ký</FormTitle>
                                    <Form
                                        name='login'
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        onFinish={onFinish}
                                        layout='horizontal'
                                        autoComplete='off'
                                        form={form}
                                    >
                                        <FormTitle>Thông tin tài khoản</FormTitle>
                                        <Form.Item
                                            label="Tên đăng nhập"
                                            name="username"
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập tên tài khoản!' },
                                                { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                            ]}
                                        >
                                            <Input placeholder='Tên đăng nhập' />
                                        </Form.Item>
                                        <Form.Item
                                            label="Họ và tên"
                                            name="fullname"
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập Họ và tên!' },
                                                { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                            ]}
                                        >
                                            <Input placeholder='Họ và tên' />
                                        </Form.Item>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập Email!' },
                                                { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' },
                                                { type: 'email' }
                                            ]}
                                        >
                                            <Input placeholder='Email' type='email' />
                                        </Form.Item>
                                        <Form.Item
                                            label="Số điện thoại"
                                            name="phone"
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập Số điện thoại!' },
                                                { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                                                        if (!value || vnf_regex.test(value)) {
                                                            return Promise.resolve()
                                                        }
                                                        return Promise.reject('Vui lòng nhập đúng định dạng số điện thoại!')
                                                    }
                                                })
                                            ]}
                                        >
                                            <Input placeholder='Số điện thoại' />
                                        </Form.Item>
                                        <Form.Item
                                            label="Mật khẩu"
                                            name="password"
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập Mật khẩu!' },
                                                { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                            ]}
                                        >
                                            <Input.Password placeholder='Mật khẩu' />
                                        </Form.Item>
                                        <Form.Item
                                            label="Xác nhận mật khẩu"
                                            name="confirmPasswrod"
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
                                            <Input.Password placeholder='Nhập lại mật khẩu' />
                                        </Form.Item>
                                        <FormTitle>Địa chỉ giao hàng</FormTitle>
                                        <Form.Item
                                            label="Tỉnh/Thành Phố"
                                            name="cityId"
                                            hasFeedback
                                            rules={[
                                                { required: true, message: 'Vui lòng chọn Tỉnh/Thành Phố!' }
                                            ]}
                                        >
                                            <Select
                                                onChange={onChangeCity}
                                                placeholder="Tỉnh/Thành"
                                            >
                                                {
                                                    data.map((item, index) => (
                                                        <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="Quận/Huyện"
                                            name="districtId"
                                            hasFeedback
                                            rules={[
                                                { required: true, message: 'Vui lòng chọn Quận/Huyện' }
                                            ]}
                                        >
                                            <Select placeholder="Quận/Huyện" disabled={!selectedData.cityId}
                                                onChange={onChangeDistrict}
                                            >
                                                {
                                                    selectedData.cityId ?
                                                        (
                                                            <>
                                                                {
                                                                    (data.find(item => item.id === selectedData.cityId)).districts.map(item => (
                                                                        <Select.Option value={item.id} key={item.id} >{item.title}</Select.Option>
                                                                    ))
                                                                }
                                                            </>
                                                        )
                                                        :
                                                        (
                                                            <>

                                                            </>
                                                        )
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="Phường/Xã"
                                            name="wardId"
                                            hasFeedback
                                            rules={[
                                                { required: true, message: 'Vui lòng chọn Phường/Xã!' }
                                            ]}
                                        >
                                            <Select disabled={!selectedData.districtId}
                                                onChange={onChangeWard}
                                                placeholder="Phường/Xã"
                                            >
                                                {
                                                    selectedData.cityId && selectedData.districtId ?
                                                        (
                                                            <>
                                                                {
                                                                    ((data.find(item => item.id === selectedData.cityId)).districts.find(item => item.id === selectedData.districtId)).wards.map(item => (
                                                                        <Select.Option value={item.id} key={item.id} >{item.title}</Select.Option>
                                                                    ))
                                                                }
                                                            </>
                                                        )
                                                        :
                                                        (
                                                            <>

                                                            </>
                                                        )
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="Địa chỉ"
                                            name="location"
                                            hasFeedback
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập địa chỉ!' },
                                                { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                        >
                                            <Button type='submit'>Đăng Ký</Button>
                                        </Form.Item>
                                        <Form.Item>
                                            Đã có tài khoản. <Link to="/login">Đăng nhập ngay</Link>
                                        </Form.Item>
                                    </Form>
                                </FormContainer>
                            </Wrapper>
                        </Container>
                    </Helmet>
                )
            }

        </>
    )
}

export default WebRegister