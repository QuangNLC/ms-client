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
            title: 'T??n S???n Ph???m',
            dataIndex: 'name',
        },
        {
            title: 'M?? S???n Ph???m',
            dataIndex: 'id',
        },
        {
            title: 'Lo???i S???n Ph???m',
            render: (record) => {
                return (
                    <>
                        {record?.category?.title}
                    </>
                )
            }
        },
        {
            title: 'Gi??',
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
            title: 'Thao T??c',
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
            openNotificationWithIcon('warning', 'Th??ng B??o', 'X??a s???n ph???m th??nh c??ng')
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
            title: 'T??n S???n Ph???m',
            dataIndex: 'name',
        },
        {
            title: 'M?? S???n Ph???m',
            dataIndex: 'id',
        },
        {
            title: 'Lo???i S???n Ph???m',
            render: (record) => {
                return (
                    <>
                        {record?.category?.title}
                    </>
                )
            }
        },
        {
            title: 'Gi??',
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
            openNotificationWithIcon('success', 'Th??ng B??o', 'Th??m s???n ph???m th??nh c??ng')
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
                    Modal.success({ title: 'H???p Tho???i Th??ng B??o', content: 'T???o khuy???n m???i th??nh c??ng', okText: 'X??c Nh???n' });
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
            title="Qu???n l?? khuy???n m???i"
        >
            <Container>
                <div
                    style={{ width: '100%', padding: '0 20px' }}
                >
                    <Button type='primary' onClick={() => { navigate("/admin/promotions") }}>Danh S??ch</Button>
                </div>
                <Wrapper>
                    <Left>
                        <LeftTitle>th??ng tin khuy???n m???i</LeftTitle>
                        <Form
                            layout='vertical'
                            wrapperCol={{ span: 24 }}
                            labelCol={{ span: 24 }}
                            onFinish={handleClickSubmitForm}
                        >
                            <FormWrapper>
                                <Form.Item
                                    label="T??n Khuy???n M???i"
                                    name="name"
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Vui l??ng nh???p t??n khuy???n m???i.' },
                                        { whitespace: true, message: 'Vui l??ng kh??ng nh???p kho???ng tr???ng.' }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="M???c Gi???m Gi?? (%)"
                                    name="discount"
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Vui l??ng nh???p t??n khuy???n m???i.' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || value > 0) {
                                                    return Promise.resolve()
                                                }
                                                return Promise.reject('Vui l??ng nh???p s??? l???n h??n 0.')
                                            }
                                        })
                                    ]}
                                >
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    label="Ng??y B???t ?????u"
                                    name="date_after"
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Vui l??ng nh???p ng??y b???t ?????u.' }
                                    ]}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    label="Ng??y K???t Th??c"
                                    name="date_before"
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Vui l??ng nh???p ng??y k???t th??c.' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('date_before') > getFieldValue('date_after')) {
                                                    return Promise.resolve()
                                                }
                                                return Promise.reject('Ng??y k???t th??c ph???i sau ng??y b???t ?????u!')
                                            }
                                        })
                                    ]}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                                {/* <Form.Item
                                    label="Tr???ng Th??i"
                                    name="isactive"
                                >
                                    <Switch />
                                </Form.Item> */}
                                <Form.Item>
                                    {
                                        listPr && listPr.length > 0 ?
                                            (
                                                <Button type='primary' htmlType='submit'>T???o Khuy???n M???i</Button>
                                            )
                                            :
                                            (
                                                <Tooltip
                                                    title="Vui l??ng ch???n s???n ph???m khuy???n m???i."
                                                >
                                                    <Button type='primary' htmlType='submit' disabled>T???o Khuy???n M???i</Button>
                                                </Tooltip>
                                            )
                                    }
                                </Form.Item>
                            </FormWrapper>
                        </Form>
                    </Left>
                    <Right>
                        <ListWrapper>
                            <ListWrapperTitle>s???n ph???m khuy???n m???i</ListWrapperTitle>
                            <ListActionsWrapper>
                                <Button type='primary' disabled={!selectedListPr || selectedListPr <= 0} onClick={handleDeleteSelectedListPrItem}>Xo?? S???n Ph???m</Button>
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
                            <ProductsWrapperTitle>danh s??ch s???n ph???m</ProductsWrapperTitle>
                            <ProductsActionsWrapper>
                                <Button type='primary' disabled={!selectedProducts || selectedProducts <= 0} onClick={handleAddSelectedProductsToList}>Th??m S???n Ph???m</Button>
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