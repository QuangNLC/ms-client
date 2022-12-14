import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import productAPI from '../../api/productsAPI'
import { Button, Form, Input, InputNumber, Select, Upload, notification, Empty, Modal, Typography } from 'antd';
import Helmet from '../../components/Helmet'
import fileAPI from '../../api/fileAPI';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DialogHOC from '../../hoc/DialogHOC';
import sizesAPI from '../../api/sizesAPI';
import { useForm } from 'antd/es/form/Form';
import { useNavigate, useParams } from 'react-router-dom';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';

const Container = styled.div`
    padding: 20px;
`
const Wrapper = styled.div`
`
const Details = styled.div`
    width: 100%;
    display: flex;
`
// width: calc(2/3 *  100%);
const Left = styled.div`
    width: 100%;
    padding: 20px;
    
`
const ProductDetailsFormContainer = styled.div`
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    width:  100%;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
`
const Right = styled.div`
    width: calc(1/3 *  100%);
    padding: 20px 10px;
    
`
const ProductSizesDetails = styled.div`
    width: 100%;
    padding:  20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: white;
    border-radius: 10px;
`

const ProductSizesTitleContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const ProductSizesTitle = styled.span`
    flex:  1;
`
const ProductSizesButton = styled.div`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: teal;
    color: white;
    cursor: pointer;
    trasition: all 0.25s ease-in;
    text-transform: capitalize;
    &:hover{
        background-color: darkblue;
    }
`
const Title = styled.h1`
    font-size : 40px;
    font-weight: 300;
`

const SizesContainer = styled.ul`
    width: 100%;
    margin-top: 20px;
    padding: 0 10px;
    border-top: 0.5px solid lightgray;
`
const SizesContainerTitle = styled.div`
    font-size: 18px;
    font-weight:  500;
    margin-top: 5px;
`
const SizeFormContainer = styled.div`
    width: 100%;
`
const SizeDetailsContainer = styled.li`
    padding: 15px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid teal;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const SizeDetails = styled.div`
    flex:  1;
`
const SizeDetailsItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const SizeDetailsItemLabel = styled.span`
    text-transform: capitalize;
    margin-left: 5px;
    font-size: 16px;
    font-weight:  400;
`
const SizeDetailsItemInfo = styled.div``
const SizeDetailsAction = styled.div`
    width: 120px;
    display: flex;
    justify-content: flex-start;
    align-items:  center;
    flex-direction: column;
`

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description:
            des,
    });
};


const AdmEditProductDetails = () => {

    const { productId } = useParams()
    const [uploadList, setUploadList] = useState([])
    const [categories, setCategories] = useState([])
    const [materials, setMaterials] = useState([])
    const [sizes, setSizes] = useState([])
    const [reqImg, setReqImg] = useState([])
    const [editingSizes, setEditingSizes] = useState([])
    const [product, setProduct] = useState({
        "name": "",
        "export_price": 200000.0,
        "title": "ao dep mau dep mac vao sieu dep",
        "cover": "acc",
        "category": {
            "id": 1,
            "title": "??o thun"
        },
        "productsizes": [],
        "images": [
            {

                "photo": "default-product-img.jpg",
                "isdefault": true
            }
        ]
    })
    const [formInitValue, setFormInitValue] = useState({
        name: '',
        export_price: 0,
        title: '',
        category: 0,
        material: 0
    })
    const navigate = useNavigate();
    const [sizeForm] = useForm();
    const [detailsForm] = useForm();


    /////////add size
    const [isAddingSizeModal, setIsAddingSizeModal] = useState(false)
    const [addSizeForm] = useForm();

    const onClickOpenAddSize = () => {
        setIsAddingSizeModal(true)
        addSizeForm.setFieldsValue({
            id: 0,
            quantity: null,
        })
    }

    const onClickSubmitAddSize = () => {
        addSizeForm.submit()
    }

    const onClickCancelAddSize = () => {
        setIsAddingSizeModal(false)
        addSizeForm.setFieldsValue({
            id: 0,
        })
    }

    const handleAddSize = (value) => {
        console.log(value)
        let index = sizes.findIndex(item => item.id === value.id);
        if (index !== -1) {
            console.log({ size: sizes[index] })
            let sIndex = editingSizes.findIndex(s => s.size.id === value.id)
            if (sIndex !== -1) {
                openNotificationWithIcon('info', 'Th??ng b??o', `???? t???n t???i size ${sizes[index].title}`)
            } else {
                setEditingSizes([...editingSizes, { size: sizes[index] }])
            }
        }
        onClickCancelAddSize()
    }

    const handleRemoveSize = (item, index) => {
        console.log(item, index)
        editingSizes.splice(index, 1)
        console.log(editingSizes)
        setEditingSizes([...editingSizes])
    }

    ////////



    const handleUploadImage = () => {
        const formData = new FormData();
        uploadList.forEach(item => {
            formData.append('file', item)
        })
        fileAPI.upload('images', formData)
            .then(res => {
                if (!res.status) {
                    console.log(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }

    const onFinish = (value) => {
        let images = []
        let reqValue = {
            id: product.id,
            ...value,
            category: {
                id: value.category
            },
            images: product.images,
            productsizes: editingSizes.length > 0 ? editingSizes.map((s) => ({ size: s.size, quantity: value[`sizeId${s.size.id}`] })) : [],
            material: {
                id: value.material
            }
        }
        console.log(reqValue)
        Modal.confirm({
            title: 'H???p Tho???i X??c Nh???n',
            content: 'B???n c?? mu???n c???p nh???t s???n ph???m kh??ng',
            okText: 'X??c Nh???n',
            cancelText: 'H???y B???',
            onOk: () => {
                if (uploadList.length > 0) {
                    const formData = new FormData();
                    uploadList.forEach(item => {
                        formData.append('file', item)
                    })
                    fileAPI.upload('images', formData)
                        .then(res => {
                            if (!res.status) {
                                return res.map((item, index) => {
                                    return {
                                        photo: item,
                                        isdefault: index === 1
                                    }
                                })
                            } else {
                                console.log(res)
                            }
                        })
                        .then(imgsRes => {
                            productAPI.updateProduct({ ...reqValue, images: [...product.images, ...imgsRes] })
                                .then(res => {
                                    if (!res.status) {
                                        console.log(res)
                                        setProduct({ ...res });
                                        setUploadList([])
                                        setFormInitValue({
                                            ...formInitValue,
                                            name: res?.name,
                                            export_price: res?.export_price,
                                            category: res?.category?.id,
                                            material: res?.material?.id,
                                            title: res?.title
                                        })
                                        Modal.info({ title: 'H???p Tho???i Th??ng B??o', content: 'C???p Nh???t Th??ng Tin S???n Ph???m Th??nh C??ng' })
                                    } else {
                                        console.log(res)
                                    }
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                } else {
                    productAPI.updateProduct(reqValue)
                        .then(res => {
                            if (!res.status) {
                                console.log(res)
                                setProduct({ ...res });
                                setFormInitValue({
                                    ...formInitValue,
                                    name: res?.name,
                                    export_price: res?.export_price,
                                    category: res?.category?.id,
                                    material: res?.material?.id,
                                    title: res?.title
                                })
                                Modal.info({ title: 'H???p Tho???i Th??ng B??o', content: 'C???p Nh???t Th??ng Tin S???n Ph???m Th??nh C??ng' })
                            } else {
                                Modal.error({
                                    title: 'H???p Tho???i Th??ng B??o',
                                    content: res?.data ? res?.data : 'C???p nh???t th???t b???i.'
                                })
                            }
                        })
                        .catch(err => console.log(err))
                }
            }
        })
    }

    const handleCreateProductSize = (value) => {
        let index = product.productsizes.findIndex(item => item.size.id === value.id)
        if (index === -1) {
            setProduct({
                ...product,
                productsizes: [...product.productsizes, { quantity: value.quantity, size: sizes.find(item => item.id === value.id) }]
            })
            sizeForm.setFieldsValue({
                id: 0,
                quantity: ""
            })
        } else {
            openNotificationWithIcon('warning', 'C???p nh???t th???t b???i', 'Ch??a ch???n size!')
            sizeForm.setFieldsValue({
                id: 0,
                quantity: ""
            })
        }

    }

    useEffect(() => {
        productAPI.getAllCategory().then(res => {
            if (!res.status) {
                setCategories(res)
            } else {
                console.log(res);
            }
        })
            .catch(err => console.log(err))
        productAPI.getAllMaterial().then(res => {
            if (!res.status) {
                setMaterials(res)
            } else {
                console.log(res)
            }
        })
            .catch(err => console.log(err))
        sizesAPI.getAll()
            .then(res => {
                if (!res.status) {
                    {
                        setSizes(res)
                    }
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        productAPI.getProduct(productId)
            .then(res => {
                if (!res.status) {
                    setProduct({ ...res });
                    console.log(res)
                    setFormInitValue({
                        ...formInitValue,
                        name: res?.name,
                        export_price: res?.export_price,
                        category: res?.category?.id,
                        material: res?.material?.id,
                        title: res?.title
                    })
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }, [productId])

    useEffect(() => {
        if (product) {
            setFormInitValue({
                ...formInitValue,
                name: product?.name,
                export_price: product?.export_price,
                category: product?.category?.id,
                material: product?.material?.id,
                title: product?.title
            })
            detailsForm.resetFields();
            if (product.productsizes) {
                setEditingSizes(product.productsizes.length > 0 ? product.productsizes.map(s => ({ size: s.size })) : [])
                product.productsizes.map(s => {
                    detailsForm.setFieldValue(`sizeId${s.size.id}`, s.quantity)
                })
            }
        }
    }, [product])

    return (
        <Helmet
            title="Qu???n l?? s???n ph???m"
        >
            <Container>
                <Wrapper>
                    <Title>CH???NH S???A S???N PH???M V???I M?? L?? {productId}</Title>
                    <Details>
                        <Left>
                            <ProductDetailsFormContainer>
                                <Form
                                    name='product-details'
                                    wrapperCol={24}
                                    labelCol={24}
                                    layout={'vertical'}
                                    onFinish={onFinish}
                                    initialValues={formInitValue}
                                    form={detailsForm}
                                >
                                    <Form.Item>
                                        <Typography.Title level={4}>
                                            C???p nh???t s???n ph???m
                                        </Typography.Title>
                                    </Form.Item>
                                    <Form.Item
                                        label="T??n s???n ph???m"
                                        name="name"
                                        rules={[
                                            { required: true },
                                            { whitespace: true }
                                        ]}
                                        hasFeedback
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Th??ng tin m?? t???"
                                        name="title"
                                        rules={[
                                            { required: true },
                                            { whitespace: true }
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                    <Form.Item
                                        label="Gi?? b??n"
                                        name="export_price"
                                        rules={[
                                            { required: true },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (value && value > 0) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject('Gi?? b??n ph???i l???n h??n 0!')
                                                }
                                            })
                                        ]}
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Th??? lo???i s???n ph???m"
                                        name="category"
                                        rules={[
                                            ((getFieldValue) => ({
                                                validator(_, value) {
                                                    if (value && value > 0) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject('Vui l??ng ch???n th??? lo???i!')
                                                }
                                            }))
                                        ]}
                                        defaultValue={product.category.id}
                                    >
                                        <Select defaultValue={0}>
                                            <Select.Option value={0} disabled>Vui l??ng ch???n th??? lo???i</Select.Option>
                                            {
                                                categories && categories.length > 0 && categories.map((item, index) => (
                                                    <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                                                ))
                                            }

                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="Ch???t li???u s???n ph???m"
                                        name="material"
                                        rules={[
                                            ((getFieldValue) => ({
                                                validator(_, value) {
                                                    if (value && value > 0) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject('Vui l??ng ch???n th??? lo???i!')
                                                }
                                            }))
                                        ]}
                                    >
                                        <Select defaultValue={0}>
                                            <Select.Option value={0} disabled>Vui l??ng ch???n ch???t li???u</Select.Option>
                                            {
                                                materials && materials.length > 0 && materials.map((item, index) => (
                                                    <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                                                ))
                                            }

                                        </Select>
                                    </Form.Item>
                                    {/* <Form.Item
                                        label="Size"
                                    >
                                        {editingSizes.length > 0 ?
                                            (
                                                editingSizes.map((item, index) => {
                                                    return (
                                                        <div key={item.size.id}>
                                                            <div><b>{item.size.title}</b></div>
                                                            <div>{item.quantity}</div>
                                                        </div>
                                                    )
                                                })
                                            )
                                            :
                                            (
                                                <Empty description={'Size tr???ng'} />
                                            )
                                        }
                                    </Form.Item> */}
                                    <Form.Item>
                                        <Button onClick={onClickOpenAddSize}>Th??m size s???n ph???m</Button>
                                    </Form.Item>
                                    <Form.Item>
                                        {
                                            editingSizes.length > 0 ?
                                                (
                                                    editingSizes.map((item, index) => {
                                                        return (
                                                            <div
                                                                key={item?.size?.id}
                                                                style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                                            >
                                                                <Form.Item
                                                                    label={item?.size?.title}
                                                                    name={`sizeId${item?.size?.id}`}
                                                                    rules={[
                                                                        { required: true, message: "S??? l?????ng kh??ng ???????c nh???p kho???ng tr???ng!" },
                                                                        ({ getFieldValue, setFieldValue }) => ({
                                                                            validator(_, value) {
                                                                                if (value && value > 0) {
                                                                                    setFieldValue('quantity', Math.floor(value))
                                                                                    return Promise.resolve()
                                                                                }
                                                                                return Promise.reject('S??? l?????ng kh??ng ???????c nh??? h??n 0!')
                                                                            }
                                                                        })
                                                                    ]}
                                                                >
                                                                    <InputNumber/>
                                                                </Form.Item>
                                                                <Button icon={<DisabledByDefaultOutlinedIcon />} onClick={() => handleRemoveSize(item, index)}></Button>
                                                            </div>

                                                        )
                                                    })
                                                )
                                                :
                                                (
                                                    <Empty description={'Size tr???ng.'} />
                                                )
                                        }
                                    </Form.Item>
                                    <Form.Item
                                        label="???nh"
                                    >
                                        {
                                            product && product.images.length > 0 ?
                                                (
                                                    <>
                                                        {product.images.map((item, index) => {
                                                            return (
                                                                <img style={{ width: '90px', height: '160px', marginRight: '10px', objectFit: 'contain', cursor: 'pointer' }} src={`http://localhost:8080/api/file/images/${item.photo}`} />
                                                            )
                                                        })}
                                                    </>

                                                )
                                                :
                                                (
                                                    <Empty />
                                                )
                                        }
                                    </Form.Item>
                                    <Form.Item>
                                        <Upload.Dragger
                                            action={"http://localhost:3000/api/file/images"}
                                            multiple
                                            listType='picture'
                                            showUploadList={{ showRemoveIcon: true }}
                                            accept='.png,.jpg,.jpeg'
                                            fileList={uploadList}
                                            beforeUpload={(file, fileList) => {
                                                setUploadList(prev => [...prev, file])
                                                return false
                                            }}
                                            onRemove={(file) => {
                                                setUploadList(uploadList.filter((item) => file.uid !== item.uid))
                                            }}
                                        >
                                            {/* <p>K??o th??? ???nh ho???c</p> */}
                                            <br />
                                            <Button style={{ borderRadius: "20px" }}>Ch???n ???nh</Button>
                                        </Upload.Dragger>

                                        {/* <Button onClick={() => {handleUploadImage()}}>Upload</Button> */}
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Button htmlType='submit' style={{ borderRadius: "20px" }}> C???p nh???t </Button>
                                    </Form.Item>
                                </Form>
                            </ProductDetailsFormContainer>
                        </Left>
                        {/* <Right>
                            <ProductSizesDetails>
                                <ProductSizesTitleContainer>
                                    <ProductSizesTitle>Size s???n ph???m</ProductSizesTitle>
                                    <ProductSizesButton>Size m???i</ProductSizesButton>
                                </ProductSizesTitleContainer>
                                <SizeFormContainer>
                                    <Form
                                        name='size'
                                        labelCol={24}
                                        wrapperCol={24}
                                        layout={'vertical'}
                                        style={{ width: '70%' }}
                                        onFinish={handleCreateProductSize}
                                        form={sizeForm}
                                    >
                                        <Form.Item
                                            label="Size"
                                            name="id"
                                            rules={[
                                                ((getFieldValue) => ({
                                                    validator(_, value) {
                                                        if (value && value > 0) {
                                                            return Promise.resolve()
                                                        }
                                                        return Promise.reject('Vui l??ng ch???n size!')
                                                    }
                                                }))
                                            ]}
                                            hasFeedback
                                        >
                                            <Select defaultValue={0}>
                                                <Select.Option value={0} disabled>Size</Select.Option>
                                                {
                                                    sizes.length > 0 && sizes.map(item => (
                                                        <Select.Option value={item.id} key={item.id}>{item.title}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="S??? l?????ng"
                                            name="quantity"
                                            rules={[
                                                { required: true },
                                                ({ getFieldValue, setFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (value && value > 0) {
                                                            setFieldValue('quantity', Math.floor(value))
                                                            return Promise.resolve()
                                                        }
                                                        return Promise.reject('S??? l?????ng kh??ng ???????c nh??? h??n 0!')
                                                    }
                                                })
                                            ]}
                                            hasFeedback
                                        >
                                            <InputNumber style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button style={{ borderRadius: "20px" }} htmlType='submit'>T???o size</Button>
                                        </Form.Item>
                                    </Form>
                                </SizeFormContainer>
                                <SizesContainer>
                                    <SizesContainerTitle>Danh s??ch size s???n ph???m</SizesContainerTitle>
                                    {
                                        product.productsizes.length > 0 ?
                                            (
                                                product.productsizes.map(item => (
                                                    <SizeDetailsContainer key={item.size.id}>
                                                        <SizeDetails>
                                                            <SizeDetailsItem>
                                                                <SizeDetailsItemLabel>Size: </SizeDetailsItemLabel>
                                                                <SizeDetailsItemInfo>{item.size.title}</SizeDetailsItemInfo>
                                                            </SizeDetailsItem>
                                                            <SizeDetailsItem>
                                                                <SizeDetailsItemLabel>S??? l?????ng: </SizeDetailsItemLabel>
                                                                <SizeDetailsItemInfo>{item.quantity}</SizeDetailsItemInfo>
                                                            </SizeDetailsItem>
                                                        </SizeDetails>
                                                        <SizeDetailsAction>
                                                            <DialogHOC
                                                                title="Th??ng b??o!"
                                                                content="B???n c?? mu???n x??a size n??y kh??ng?"
                                                                onYes={() => { console.log('???? x??a size') }}
                                                            >
                                                                <Button
                                                                    icon={<DeleteOutlineOutlinedIcon />}
                                                                    style={{ marginTop: 10, borderRadius: 10 }}
                                                                >
                                                                </Button>
                                                            </DialogHOC>
                                                            <Button
                                                                icon={<CreateOutlinedIcon />}
                                                                style={{ marginTop: 10, borderRadius: 10 }}
                                                            >
                                                            </Button>
                                                        </SizeDetailsAction>
                                                    </SizeDetailsContainer>
                                                ))
                                            )
                                            :
                                            (
                                                <>
                                                    <Empty description={'Size tr???ng!'} />
                                                </>
                                            )
                                    }
                                </SizesContainer>
                            </ProductSizesDetails>
                        </Right> */}
                    </Details>
                    <Modal
                        open={isAddingSizeModal}
                        centered
                        okText="X??c Nh???n"
                        cancelText="H???y B???"
                        onOk={onClickSubmitAddSize}
                        onCancel={onClickCancelAddSize}
                    >
                        <Form
                            name='size'
                            labelCol={24}
                            wrapperCol={24}
                            layout={'vertical'}
                            style={{ width: '100%' }}
                            form={addSizeForm}
                            onFinish={handleAddSize}
                        >
                            <Form.Item
                                label="Size"
                                name="id"
                                rules={[
                                    ((getFieldValue) => ({
                                        validator(_, value) {
                                            if (value && value > 0) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject('Vui l??ng ch???n size!')
                                        }
                                    }))
                                ]}
                                hasFeedback
                            >
                                <Select defaultValue={0}>
                                    <Select.Option value={0} disabled>Size</Select.Option>
                                    {
                                        sizes.length > 0 && sizes.map(item => (
                                            <Select.Option value={item.id} key={item.id}>{item.title}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default AdmEditProductDetails