import { Button, Form, Input, Spin, Typography, Upload, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import usersAPI from '../../api/usersAPI'
import { setAuthAction } from '../../redux/actions/AuthReducerAction'
import { useForm } from 'antd/lib/form/Form'
import addressAPI from '../../api/addressAPI'

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
    border-right: 1px  solid lightgray;
`
const AvatarContainer = styled.div`
    flex: 1;
    padding: 20px;
`
const PreviewImg = styled.div`
    width: 100%;
    display:  flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`
const Avt = styled.img`
    width:  130px;
    height: 130px;
    border-radius:  50%;
    object-fit: cover;
    object-position: center;
`
const UploadButton = styled.div`
    width: 100%;
    display: flex;
    flex-direction:  column;
    justify-content: center;
    align-items:  center;
`

const WebMyAccount = () => {

    const auth = useSelector(state => state.auth.auth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const { username } = auth ? auth.info : "";
    const navigate = useNavigate();
    const location = useLocation();
    const [prevAvt, setPrevAvt] = useState(null);
    const [uploadList, setUploadList] = useState([]);
    const [formInitValue, setFormInitValue] = useState({

    });
    const [form] = useForm();
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const [selectedData, setSelectedData] = useState({
        cityId: null,
        districtId: null,
        wardId: null
    })

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

    const handleUploadAvatar = () => {
        Modal.confirm({
            title: "H???p Tho???i X??c Nh???n",
            content: "B???n c?? ?????ng ?? thay ?????i ???nh ?????i di???n hay kh??ng?",
            okText: "X??c Nh???n",
            cancelText: "H???y B???",
            onOk: () => {
                if (uploadList && uploadList.length > 0) {
                    const formData = new FormData();
                    uploadList.forEach(item => {
                        formData.append('file', item)
                    })
                    usersAPI.updateUserAvatar(auth.info.username, formData)
                        .then(res => {
                            dispatch(setAuthAction({ ...auth, info: res }));
                            setUploadList([])
                            Modal.success({
                                title: "H???p Tho???i Th??ng B??o",
                                content: "Thay ?????i ???nh ?????i di???n th??nh c??ng!"
                            })
                        })
                        .catch(err => console.log(err))

                }
            }
        })
    }

    const onFinish = (value) => {
        Modal.confirm({
            title: "H???p Tho???i X??c Nh???n",
            content: "B???n c?? mu???n c???p nh???t th??ng tin t??i kho???n kh??ng?",
            okText: "X??c Nh???n",
            cancelText: "H???y B???",
            onOk: () => {
                const { username, address, ...others } = auth.info
                let reqUser = {
                    ...others,
                    ...value,
                    address: {
                        ...address,
                        city: {
                            id: value.cityId
                        },
                        district: {
                            id: value.districtId
                        },
                        ward: {
                            id: value.wardId
                        },
                        location: value.location
                    }
                }
                console.log(reqUser)
                usersAPI.updateUserDeatails(username, reqUser)
                    .then(res => {
                        if (!res.status) {
                            console.log('update')
                            dispatch(setAuthAction({ ...auth, info: res }));
                            Modal.success({
                                title: "H???p Tho???i Th??ng B??o",
                                content: "C???p nh???t th??ng tin t??i kho???n th??nh c??ng!"
                            })
                        } else {
                            console.log(res)
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }


    useEffect(() => {
        if (uploadList.length > 0) {
            let url = URL.createObjectURL(uploadList[0])
            console.log(url)
            setPrevAvt(url)
        } else {

            auth && setPrevAvt(`http://localhost:8080/api/file/images/${auth.info.photo}`)
        }
    }, [uploadList])

    useEffect(() => {
        return () => {
            if (prevAvt && (prevAvt !== `http://localhost:8080/api/file/images/${auth.info.photo}`)) {
                URL.revokeObjectURL(prevAvt)
            }
        }
    }, [prevAvt])

    useEffect(() => {
        console.log(auth)
        if (auth) {
            setPrevAvt(`http://localhost:8080/api/file/images/${auth.info.photo}`)
            addressAPI.getCityData()
                .then(res => {
                    if (!res.status) {
                        console.log(res)
                        setData(res)
                    } else {
                        console.log(res)
                    }
                }).then((res) => {
                    setFormInitValue({
                        email: auth.info.email,
                        fullname: auth.info.fullname,
                        username: auth.info.username,
                        phone: auth.info.phone,
                        cityId: auth.info.address.city.id,
                        districtId: auth.info.address.district.id,
                        wardId: auth.info.address.ward.id,
                        location: auth.info.address.location
                    })
                    setSelectedData({
                        cityId: auth.info.address.city.id,
                        districtId: auth.info.address.district.id,
                        wardId: auth.info.address.ward.id
                    })
                }
                )
                .catch(err => console.log(err))

        } else {
            navigate("/login")
        }
    }, [auth])

    useEffect(() => {
        form.resetFields();
    }, [formInitValue])

    return (
        <Helmet
            title="Th??ng tin t??i kho???n"
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
                                                    t??i  kho???n  c???a t??i
                                                </NavItem>
                                            </Link>
                                            <Link
                                                to="/change-password"
                                                style={{ color: 'inherit' }}
                                            >
                                                <NavItem actived={location.pathname === '/change-password'}>
                                                    ?????i m???t kh???u
                                                </NavItem>
                                            </Link>
                                            <Link
                                                to="/my-orders"
                                                style={{ color: 'inherit' }}
                                            >
                                                <NavItem actived={location.pathname === '/my-orders'}>
                                                    ????n  h??ng
                                                </NavItem>
                                            </Link>
                                        </Nav>
                                    </NavContainer>
                                    <ContentContainer>
                                        <Top>
                                            <Typography.Title>H??? S?? C???a T??i</Typography.Title>
                                            <Typography.Text>Qu???n l?? th??ng tin h??? s??</Typography.Text>
                                        </Top>
                                        <Bottom>
                                            <FormContainer>
                                                <Form
                                                    name="user"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 20 }}
                                                    layout='horizontal'
                                                    form={form}
                                                    initialValues={formInitValue}
                                                    onFinish={onFinish}
                                                >
                                                    <Form.Item
                                                        label="T??n ????ng Nh???p"
                                                    >
                                                        <Typography.Text>{auth.info.username}</Typography.Text>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Email"
                                                        name="email"
                                                    >
                                                        <Typography.Text>{auth.info.email}</Typography.Text>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="H??? T??n"
                                                        name="fullname"
                                                        hasFeedback
                                                        rules={[
                                                            { required: true, message: "Vui l??ng nh???p h??? v?? t??n!" },
                                                            { whitespace: true, message: "Vui l??ng kh??ng nh???p kho???ng tr???ng!" }
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="S??? ??i???n Tho???i"
                                                        name="phone"
                                                        rules={[
                                                            { required: true, message: "Vui l??ng nh???p s??? ??i???n tho???i!" },
                                                            { whitespace: true, message: "Vui l??ng kh??ng nh???p kho???ng tr???ng!" }
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
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
                                                            { required: true, message: 'Vui l??ng nh???p ?????a ch??? nh???n h??ng!' },
                                                            { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng!' }
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                    >
                                                        <Button style={{ borderRadius: "20px" }} type='primary' htmlType='submit'>L??u</Button>
                                                    </Form.Item>
                                                </Form>
                                            </FormContainer>
                                            <AvatarContainer>
                                                <PreviewImg>
                                                    <Avt src={prevAvt} />
                                                </PreviewImg>

                                                <UploadButton>
                                                    {
                                                        uploadList && uploadList.length > 0 && (
                                                            <Button icon={<DeleteForeverOutlinedIcon />} style={{ marginBottom: 10 }} onClick={() => { setUploadList([]) }}></Button>
                                                        )
                                                    }
                                                    <Upload
                                                        name="file"
                                                        beforeUpload={(file, fileList) => { setUploadList([file]); return false }}
                                                        showUploadList={{ showRemoveIcon: false }}
                                                        listType='picture'
                                                        accept='.png,.jpg,.jpeg'
                                                        fileList={uploadList}
                                                    >
                                                        <Button style={{ borderRadius: "20px" }}>Ch???n ???nh</Button>
                                                    </Upload>
                                                    <Typography.Text>Dung l?????ng t???i ??a: 1MB</Typography.Text>
                                                    <Typography.Text>?????nh d???ng: .JPG, .JPEG, .PNG</Typography.Text>
                                                    {
                                                        uploadList && uploadList.length > 0 && (
                                                            <Button style={{ marginTop: 20 }} onClick={handleUploadAvatar}>L??u ???nh</Button>
                                                        )
                                                    }

                                                </UploadButton>
                                            </AvatarContainer>
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
        </Helmet >
    )
}

export default WebMyAccount