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
                        openNotificationWithIcon('success', '????ng k?? th??nh c??ng!', '????ng k?? th??nh c??ng!');
                        navigate('/login')

                    } else {
                        openNotificationWithIcon('error', '????ng k?? th???t b???i!', '????ng k?? th???t b???i!');
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
                        title="????ng K??"
                    >
                        <Container>
                            <Wrapper>
                                <BackgroundImgContainer>
                                    <BackgroundImg src={loginImg} />
                                </BackgroundImgContainer>
                                <FormContainer>
                                    <FormTitle>????ng K??</FormTitle>
                                    <Form
                                        name='login'
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        onFinish={onFinish}
                                        layout='horizontal'
                                        autoComplete='off'
                                        form={form}
                                    >
                                        <FormTitle>Th??ng tin t??i kho???n</FormTitle>
                                        <Form.Item
                                            label="T??n ????ng nh???p"
                                            name="username"
                                            rules={[
                                                { required: true, message: 'Vui l??ng nh???p t??n t??i kho???n!' },
                                                { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' }
                                            ]}
                                        >
                                            <Input placeholder='T??n ????ng nh???p' />
                                        </Form.Item>
                                        <Form.Item
                                            label="H??? v?? t??n"
                                            name="fullname"
                                            rules={[
                                                { required: true, message: 'Vui l??ng nh???p H??? v?? t??n!' },
                                                { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' }
                                            ]}
                                        >
                                            <Input placeholder='H??? v?? t??n' />
                                        </Form.Item>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                { required: true, message: 'Vui l??ng nh???p Email!' },
                                                { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' },
                                                { type: 'email' }
                                            ]}
                                        >
                                            <Input placeholder='Email' type='email' />
                                        </Form.Item>
                                        <Form.Item
                                            label="S??? ??i???n tho???i"
                                            name="phone"
                                            rules={[
                                                { required: true, message: 'Vui l??ng nh???p S??? ??i???n tho???i!' },
                                                { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                                                        if (!value || vnf_regex.test(value)) {
                                                            return Promise.resolve()
                                                        }
                                                        return Promise.reject('Vui l??ng nh???p ????ng ?????nh d???ng s??? ??i???n tho???i!')
                                                    }
                                                })
                                            ]}
                                        >
                                            <Input placeholder='S??? ??i???n tho???i' />
                                        </Form.Item>
                                        <Form.Item
                                            label="M???t kh???u"
                                            name="password"
                                            rules={[
                                                { required: true, message: 'Vui l??ng nh???p M???t kh???u!' },
                                                { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' }
                                            ]}
                                        >
                                            <Input.Password placeholder='M???t kh???u' />
                                        </Form.Item>
                                        <Form.Item
                                            label="X??c nh???n m???t kh???u"
                                            name="confirmPasswrod"
                                            rules={[
                                                { required: true, message: 'Vui l??ng nh???p X??c nh???n m???t kh???u!' },
                                                { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve()
                                                        }
                                                        return Promise.reject('X??c nh???n m???t kh???u kh??ng tr??ng kh???p!')
                                                    }
                                                })
                                            ]}
                                        >
                                            <Input.Password placeholder='Nh???p l???i m???t kh???u' />
                                        </Form.Item>
                                        <FormTitle>?????a ch??? giao h??ng</FormTitle>
                                        <Form.Item
                                            label="T???nh/Th??nh Ph???"
                                            name="cityId"
                                            hasFeedback
                                            rules={[
                                                { required: true, message: 'Vui l??ng ch???n T???nh/Th??nh Ph???!' }
                                            ]}
                                        >
                                            <Select
                                                onChange={onChangeCity}
                                                placeholder="T???nh/Th??nh"
                                            >
                                                {
                                                    data.map((item, index) => (
                                                        <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="Qu???n/Huy???n"
                                            name="districtId"
                                            hasFeedback
                                            rules={[
                                                { required: true, message: 'Vui l??ng ch???n Qu???n/Huy???n' }
                                            ]}
                                        >
                                            <Select placeholder="Qu???n/Huy???n" disabled={!selectedData.cityId}
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
                                            label="Ph?????ng/X??"
                                            name="wardId"
                                            hasFeedback
                                            rules={[
                                                { required: true, message: 'Vui l??ng ch???n Ph?????ng/X??!' }
                                            ]}
                                        >
                                            <Select disabled={!selectedData.districtId}
                                                onChange={onChangeWard}
                                                placeholder="Ph?????ng/X??"
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
                                            label="?????a ch???"
                                            name="location"
                                            hasFeedback
                                            rules={[
                                                { required: true, message: 'Vui l??ng nh???p ?????a ch???!' },
                                                { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' }
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                        >
                                            <Button type='submit'>????ng K??</Button>
                                        </Form.Item>
                                        <Form.Item>
                                            ???? c?? t??i kho???n. <Link to="/login">????ng nh???p ngay</Link>
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