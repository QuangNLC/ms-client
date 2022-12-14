import React from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { Form, Input, InputNumber, DatePicker, Switch, Button, Table, Checkbox, notification, Tooltip, Modal } from 'antd'
import { useState } from 'react'
import { formatter } from '../../utils'
import { useEffect } from 'react'
import productAPI from '../../api/productsAPI'
import { useSelector } from 'react-redux'
import promotionsAPI from '../../api/promotionsAPI'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
`
const Left = styled.div`
    flex: 1;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
`
const LeftTitle = styled.div`
    width: 100%;
    font-size: 20px;
    font-weight: 300;
    text-transform: capitalize;
    margin-bottom: 20px;
`
const FormWrapper = styled.div`
    width: 100%;
`
const Right = styled.div`
    flex: 3;
    margin: 0 10px;
`
const ListWrapper = styled.div`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: white;
    margin-bottom: 15px;
`
const ListWrapperTitle = styled.div`
    width: 100%;
    font-size: 20px;
    font-weight: 300;
    text-transform: capitalize;
`
const ListActionsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
`

const ProductsWrapper = styled.div`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: white;
`
const ProductsWrapperTitle = styled.div`
    width: 100%;
    font-size: 20px;
    font-weight: 300;
    text-transform: capitalize;
`
const ProductsActionsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
`

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};

const AdmNewPromotions = () => {
    const auth = useSelector(state => state.auth.auth);
    const navigate = useNavigate();
    const [listPr, setListPr] = useState([])
    const [selectedListPr, setSelectedListPr] = useState([])
    const listPrColumn = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Mã Sản Phẩm',
            dataIndex: 'id',
        },
        {
            title: 'Loại Sản Phẩm',
            render: (record) => {
                return (
                    <>
                        {record?.category?.title}
                    </>
                )
            }
        },
        {
            title: 'Giá',
            dataIndex: 'export_price',
            render: (text) => {
                return (
                    <>
                        {formatter.format(text)}
                    </>
                )
            },
            sorter: (a, b) => a.export_price - b.export_price
        },
        ,
        {
            title: 'Thao Tác',
            render: (record) => {
                return (
                    <Checkbox onChange={(e) => { handleClickSelectListPrItem(e, record) }} />
                )
            }
        }
    ]

    const handleClickSelectListPrItem = (e, item) => {
        console.log(e.target.checked, item)
        if (e.target.checked) {
            let index = selectedListPr.findIndex((pr) => pr.id === item.id)
            if (index === -1) {
                selectedListPr.push(item);
                setSelectedListPr([...selectedListPr])
            }
        } else {
            let index = selectedListPr.findIndex((pr) => pr.id === item.id)
            if (index !== -1) {
                selectedListPr.splice(index, 1);
                setSelectedListPr([...selectedListPr])
            }
        }
    }


    const handleDeleteSelectedListPrItem = () => {
        if (selectedListPr) {
            selectedListPr.forEach((item) => {
                let index = listPr.findIndex(pr => pr.id === item.id)
                if (index !== -1) {
                    listPr.splice(index, 1)
                    products.push(item)
                }
            })
            setProducts([...products])
            setListPr([...listPr])
            setSelectedListPr([])
            openNotificationWithIcon('warning', 'Thông Báo', 'Xóa sản phẩm thành công')
        }
    }

    const [products, setProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    const productsColumn = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Mã Sản Phẩm',
            dataIndex: 'id',
        },
        {
            title: 'Loại Sản Phẩm',
            render: (record) => {
                return (
                    <>
                        {record?.category?.title}
                    </>
                )
            }
        },
        {
            title: 'Giá',
            dataIndex: 'export_price',
            render: (text) => {
                return (
                    <>
                        {formatter.format(text)}
                    </>
                )
            },
            sorter: (a, b) => a.export_price - b.export_price
        },
        ,
        {
            title: '',
            render: (record) => {
                return (
                    <Checkbox onChange={(e) => { handleClickSelectProductItem(e, record) }} />
                )
            }
        }
    ]

    const handleClickSelectProductItem = (e, item) => {
        console.log(e.target.checked, item)
        if (e.target.checked) {
            let index = selectedProducts.findIndex((pr) => pr.id === item.id)
            if (index === -1) {
                selectedProducts.push(item);
                setSelectedProducts([...selectedProducts])
            }
        } else {
            let index = selectedProducts.findIndex((pr) => pr.id === item.id)
            if (index !== -1) {
                selectedProducts.splice(index, 1);
                setSelectedProducts([...selectedProducts])
            }
        }
    }

    const handleAddSelectedProductsToList = () => {
        if (selectedProducts) {
            selectedProducts.forEach((item) => {
                let index = products.findIndex(pr => pr.id === item.id)
                if (index !== -1) {
                    products.splice(index, 1)
                }
            })
            setProducts([...products])
            setListPr([...listPr, ...selectedProducts])
            setSelectedProducts([])
            openNotificationWithIcon('success', 'Thông Báo', 'Thêm sản phẩm thành công')
        }

    }

    const handleClickSubmitForm = (value) => {
        console.log(value)
        let payload = {
            title: value?.name,
            date_after: new Date(value?.date_after),
            date_befor: new Date(value?.date_before),
            users: {
                username: auth?.info?.username
            },
            by_persent: value?.discount,
            check: 0,
            listpr: [...listPr.map(item => item.id)]
        }
        promotionsAPI.createPromotion(payload)
            .then(res => {
                if (!res.status) {
                    Modal.success({ title: 'Hộp Thoại Thông Báo', content: 'Tạo khuyến mại thành công', okText: 'Xác Nhận' });
                    navigate('/admin/promotions')
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log(selectedListPr)
    }, [selectedListPr])

    useEffect(() => {
        console.log(selectedProducts)
    }, [selectedProducts])

    useEffect(() => {
        // productAPI.getAll()
        //     .then(res => {
        //         if (!res.status) {
        //             setProducts(res.map((item, index) => ({
        //                 index: index + 1,
        //                 key: item.id,
        //                 ...item
        //             })))
        //         }else{
        //             console.log(res)
        //         }
        //     })
        //     .catch(err => console.log(err))
        promotionsAPI.getProductNotExist()
            .then(res => {
                if (!res.status) {
                    setProducts(res.map((item, index) => ({
                        index: index + 1,
                        key: item.id,
                        ...item
                    })))
                    console.log(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Helmet
            title="Quản lý khuyến mại"
        >
            <Container>
                <div
                    style={{ width: '100%', padding: '0 20px' }}
                >
                    <Button type='primary' onClick={() => { navigate("/admin/promotions") }}>Danh Sách</Button>
                </div>
                <Wrapper>
                    <Left>
                        <LeftTitle>thông tin khuyến mại</LeftTitle>
                        <Form
                            layout='vertical'
                            wrapperCol={{ span: 24 }}
                            labelCol={{ span: 24 }}
                            onFinish={handleClickSubmitForm}
                        >
                            <FormWrapper>
                                <Form.Item
                                    label="Tên Khuyến Mại"
                                    name="name"
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập tên khuyến mại.' },
                                        { whitespace: true, message: 'Vui lòng không nhập khoảng trống.' }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Mức Giảm Giá (%)"
                                    name="discount"
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập tên khuyến mại.' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || value > 0) {
                                                    return Promise.resolve()
                                                }
                                                return Promise.reject('Vui lòng nhập số lớn hơn 0.')
                                            }
                                        })
                                    ]}
                                >
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    label="Ngày Bắt Đầu"
                                    name="date_after"
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập ngày bắt đầu.' }
                                    ]}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    label="Ngày Kết Thúc"
                                    name="date_before"
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập ngày kết thúc.' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('date_before') > getFieldValue('date_after')) {
                                                    return Promise.resolve()
                                                }
                                                return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu!')
                                            }
                                        })
                                    ]}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                                {/* <Form.Item
                                    label="Trạng Thái"
                                    name="isactive"
                                >
                                    <Switch />
                                </Form.Item> */}
                                <Form.Item>
                                    {
                                        listPr && listPr.length > 0 ?
                                            (
                                                <Button type='primary' htmlType='submit'>Tạo Khuyến Mại</Button>
                                            )
                                            :
                                            (
                                                <Tooltip
                                                    title="Vui lòng chọn sản phẩm khuyến mại."
                                                >
                                                    <Button type='primary' htmlType='submit' disabled>Tạo Khuyến Mại</Button>
                                                </Tooltip>
                                            )
                                    }
                                </Form.Item>
                            </FormWrapper>
                        </Form>
                    </Left>
                    <Right>
                        <ListWrapper>
                            <ListWrapperTitle>sản phẩm khuyến mại</ListWrapperTitle>
                            <ListActionsWrapper>
                                <Button type='primary' disabled={!selectedListPr || selectedListPr <= 0} onClick={handleDeleteSelectedListPrItem}>Xoá Sản Phẩm</Button>
                            </ListActionsWrapper>
                            <Table
                                dataSource={listPr}
                                columns={listPrColumn}
                                scroll={{
                                    y: '40vh'
                                }}
                            />
                        </ListWrapper>
                        <ProductsWrapper>
                            <ProductsWrapperTitle>danh sách sản phẩm</ProductsWrapperTitle>
                            <ProductsActionsWrapper>
                                <Button type='primary' disabled={!selectedProducts || selectedProducts <= 0} onClick={handleAddSelectedProductsToList}>Thêm Sản Phẩm</Button>
                            </ProductsActionsWrapper>
                            <Table
                                dataSource={products}
                                columns={productsColumn}
                                scroll={{
                                    y: '40vh'
                                }}
                            />
                        </ProductsWrapper>
                    </Right>
                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default AdmNewPromotions