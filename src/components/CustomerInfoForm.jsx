import React, { useEffect, useState } from 'react'
import vietnamData from '../assets/data/vietnamData.json'
import { Button, Form, Input, Select, Typography, Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import {useSelector} from 'react-redux'


const CustomerInfoForm = ({onClose,  onFinish, initialValues}) => {

    const  auth = useSelector(state => state.auth.auth)

    const [data, setData] = useState(vietnamData)
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
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
    
    const [form] = useForm()


    const onChangeCity =  (value) =>{
        console.log(value)
        setSelectedData({
            cityId: value,
            districtId: null,
            wardId: null
        })
    }

    const onChangeDistrict  =  (value) => {
        setSelectedData({
            ...selectedData,
            districtId: value,
            wardId: null
        })
    }

    const  onChangeWard = (value) => {
        setSelectedData({
            ...selectedData,
            wardId: value
        })
    }
    const onChagePayId  = (value) => {
        setSelectedData({
            ...selectedData,
            payId: value
        })
    }

    const  onChangeInput =  (e) => {
        // setSelectedData({
        //     ...selectedData,
        //     [e.target.name] : e.target.value
        // })
        console.log(e)
    }

    const onFormSubmit  = (value) => {
        Modal.confirm({
            title: "Xác nhận đặt hàng!",
            content:  "Xác nhận đặt hàng với những thông tin đã nhập ?",
            okText: "Xác Nhận",
            cancelText: "Hủy Bỏ",
            onOk: () => {
                onFinish(value)
            }
        })
    }

    useEffect(()=>  {
        form.setFieldValue('name',auth.info.fullname);
        form.setFieldValue('phone',auth.info.phone);
        form.setFieldValue('adress',auth.info.adress ? auth.info.adress :  '');
    },[auth])

    return (
        <>
            <Form
                name="districtForm"
                layout='horizontal'
                wrapperCol={{span: 16}}
                labelCol={{span: 8}}
                form={form}
                onFinish={onFormSubmit}
            >
                <Form.Item>
                    Phương thức thanh toán
                </Form.Item>
                <Form.Item
                    label="Thanh toán"
                    name="payId"
                    hasFeedback
                    rules={[
                        {required: true, message: 'Vui lòng chọn phương thức thanh toán!'}
                    ]}
                >
                    <Select
                        placeholder="Phương thức thanh toán"
                        onChange={onChagePayId}
                    >
                        <Select.Option value="1">Thanh toán khi nhận hàng!</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Typography>Thông tin liên hệ giao hàng</Typography>
                </Form.Item>
                <Form.Item
                    label="Họ và tên"
                    name="name"
                    hasFeedback
                    rules={[
                        {required: true, message: "Vui lòng nhập họ và tên!"},
                        {whitespace: true,  message:"Vui lòng không nhập khoảng trắng!"}
                    ]}
                >
                    <Input  />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    hasFeedback
                    rules={[
                        {required: true, message: "Vui lòng nhập số điện thoại!"},
                        {whitespace: true,  message:"Vui lòng không nhập khoảng trắng!"}
                    ]}
                >
                    <Input  />
                </Form.Item>
                <Form.Item>
                    <Typography>Địa chỉ giao hàng</Typography>
                </Form.Item>
                <Form.Item
                    label="Tỉnh/Thành Phố"
                    name="cityId"
                    hasFeedback
                    rules={[
                        {required: true, message: 'Vui lòng chọn Tỉnh/Thành Phố!'}
                    ]}
                >
                    <Select
                        onChange={onChangeCity}
                        placeholder="Tỉnh/Thành"
                    >
                        {
                            data.map((item, index) => (
                                <Select.Option key={item.Id} value={item.Id}>{item.Name}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Quận/Huyện"
                    name="districtId"
                    hasFeedback
                    rules={[
                        {required: true, message: 'Vui lòng chọn Quận/Huyện'}
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
                                            (data.find(item => item.Id === selectedData.cityId)).Districts.map(item => (
                                                <Select.Option value={item.Id} key={item.Id} >{item.Name}</Select.Option>
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
                        {required: true, message: 'Vui lòng chọn Phường/Xã!'}
                    ]}
                >
                    <Select disabled={!selectedData.districtId}
                        onChange={onChangeWard}
                        placeholder="Phường/Xã" 
                    >
                        {
                            selectedData.cityId && selectedData.districtId  ?
                                (
                                    <>
                                        {
                                            ((data.find(item => item.Id === selectedData.cityId)).Districts.find(item =>  item.Id  ===  selectedData.districtId)).Wards.map(item => (
                                                <Select.Option value={item.Id} key={item.Id} >{item.Name}</Select.Option>
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
                    name="adress"
                    hasFeedback
                    rules={[
                        {required: true, message: 'Vui lòng nhập địa chỉ nhận hàng!'},
                        {whitespace: true, message: 'Vui lòng không nhập khoảng trống!'}
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ghi Chú"
                    name="note"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="|"
                >
                    <Button style={{marginRight: '20px'}} type='primary' htmlType='submit'>Đặt Hàng</Button>
                    <Button onClick={onClose}>Hủy Bỏ</Button>
                </Form.Item>
            </Form>
            <Modal
                open={isOpenConfirm}
                title="Xác Nhận Đặt Hàng"
                okText="Xác Nhận"
                cancelText="Hủy Bỏ"
                onOk={() => {console.log('checkout')}}
                onCancel={() =>  {setIsOpenConfirm(false)}}
            >

            </Modal>
        </>
    )
}

export default CustomerInfoForm