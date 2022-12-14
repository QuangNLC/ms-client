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
    min-height: 100vh;
`
const Wrapper = styled.div`
    width: 100%;
    padding: 50px;
    display: flex;
    align-items: top;
    justify-content: space-between;
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

const AdmMyAccount = () => {

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
            title: "Hộp Thoại Xác Nhận",
            content: "Bạn có đồng ý thay đổi ảnh đại diện hay không?",
            okText: "Xác Nhận",
            cancelText: "Hủy Bỏ",
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
                                title: "Hộp Thoại Thông Báo",
                                content: "Thay đổi ảnh đại diện thành công!"
                            })
                        })
                        .catch(err => console.log(err))

                }
            }
        })
    }

    const onFinish = (value) => {
        Modal.confirm({
            title: "Hộp Thoại Xác Nhận",
            content: "Bạn có muốn cập nhật thông tin tài khoản không?",
            okText: "Xác Nhận",
            cancelText: "Hủy Bỏ",
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
                                title: "Hộp Thoại Thông Báo",
                                content: "Cập nhật thông tin tài khoản thành công!"
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
            title="Thông tin tài khoản"
        >
            <Container>
                <Wrapper>
                    {
                        isAuth ?
                            (
                                <>
                                    <ContentContainer>
                                        <Top>
                                            <Typography.Title>Hồ Sơ Của Tôi</Typography.Title>
                                            <Typography.Text>Quản lý thông tin hồ sơ</Typography.Text>
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
                                                        label="Tên Đăng Nhập"
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
                                                        label="Họ Tên"
                                                        name="fullname"
                                                        hasFeedback
                                                        rules={[
                                                            { required: true, message: "Vui lòng nhập họ và tên!" },
                                                            { whitespace: true, message: "Vui lòng không nhập khoảng trống!" }
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Số Điện Thoại"
                                                        name="phone"
                                                        rules={[
                                                            { required: true, message: "Vui lòng nhập số điện thoại!" },
                                                            { whitespace: true, message: "Vui lòng không nhập khoảng trống!" }
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
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
                                                            { required: true, message: 'Vui lòng nhập địa chỉ nhận hàng!' },
                                                            { whitespace: true, message: 'Vui lòng không nhập khoảng trống!' }
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                    >
                                                        <Button style={{ borderRadius: "20px" }} type='primary' htmlType='submit'>Lưu</Button>
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
                                                        <Button style={{ borderRadius: "20px" }}>Chọn Ảnh</Button>
                                                    </Upload>
                                                    <Typography.Text>Dung lượng tối đa: 1MB</Typography.Text>
                                                    <Typography.Text>Định dạng: .JPG, .JPEG, .PNG</Typography.Text>
                                                    {
                                                        uploadList && uploadList.length > 0 && (
                                                            <Button style={{ marginTop: 20 }} onClick={handleUploadAvatar}>Lưu Ảnh</Button>
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

export default AdmMyAccount