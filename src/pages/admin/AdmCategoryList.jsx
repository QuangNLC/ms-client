import React, { useState, useEffect } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { userRows } from '../../assets/data/data';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import usersAPI from '../../api/usersAPI';
import defaultAvt from '../../assets/imgs/default-avt.jpg';
import DialogHOC from '../../hoc/DialogHOC';
import productAPI from '../../api/productsAPI';
import { Button, Form, Input, notification, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';

const Container = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    height: max-content;
`
const FormContainer = styled.div`
    width: 50%;
    padding: 20px;
`
const FormWrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
    margin-bottom: 50px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.55);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.55);
    border-radius: 10px;
    background-color: white;
`
const FormTitle = styled.div`
    width: 100%;
    text-align: left;
    text-transform: capitalize;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 500;
`
const CateFormContainer = styled.div`
    width: 100%;
`
const CateForm = styled.form`
    width: 100%;
`
const CateFormGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`
const CateFormGroupLabel = styled.label`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
`
const CateFormGroupInput = styled.input`
    border:none;
    outline: none;
    border-bottom: 1px solid lightgray;
    padding: 10px;
`
const CateFormButton = styled.div`
    width: 200px;
    padding: 10px 20px;
    border-radius: 10px;
    color: white;
    background-color: teal;
    text-align: center;
    cursor: pointer;
    transititon: all 0.25s ease-in;

    &:hover{
        background-color: darkblue;
    }
`
const ListContainer = styled.div`
    width: ${props => props.isOpenForm ? "50%" : "100%"};
    padding: 20px;
   
`
const ListWrapper = styled.div`
    width: 100%;
    height: 70vh;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.55);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.55);
    padding: 20px;
    
    background-color: white;
`
const TitleContainer = styled.div`   
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Title = styled.span`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
`
const TitleButton = styled.button`
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    color: white;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: all 0.25s ease-in;

    &:hover{
        background-color:darkblue;
    }
`

const UserContainer = styled.div`
    display: flex;
    align-items: center;
`
const UserImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50px;
    object-fit: cover;
    margin-right: 10px;
`
const ActionContainer = styled.div`
    display: flex;
    align-items: center;

`
const EditButton = styled.button`
    border: none;
    border-radius: 10px;
    height: 40px;
    padding: 0px 20px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 20px;
    transition: all 0.25s ease-in;
    font-size: 16px;
    &:hover{
        background-color: rgb(228,228,250);
        color: black;
    }
`
const DeleteButton = styled.button`
    border: none;
    border-radius: 10px;
    padding: 0px 24px;
    height: 40px;
    background-color: rgba(0,0,0, 0.65);
    color: white;
    cursor: pointer;
    margin-right: 10px;
    transition: all 0.25s ease-in;
    
    &:hover{
        background-color: red;
        color: white;
    }
`
const DataContainer = styled.div`
    height: 100%;
`

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description:
            des,
    });
};


const AdmCategoryList = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const [isOpenForm, setIsOpenForm] = useState(true);
    const [updatingId, setUpdatingId] = useState(undefined);
    const [categoryValue, setCategoryValue] = useState({ id: undefined, title: "" });
    const [form] = useForm();

    const handleClickEditButton = (id) => {
        console.log(id)
        productAPI.getCategoryDetails(id)
            .then(res => {
                if (!res.status) {
                    setCategoryValue({
                        ...res
                    })
                    setIsOpenForm(true);
                    setUpdatingId(id);
                } else {
                    console.log(res)
                }
            })
    };

    const columns = [
        {
            field: 'id', headerName: 'STT', width: 80,
        },
        {
            field: 'title', headerName: 'Tên thể loại sản phẩm', width: 260
        },
        {
            field: 'action', headerName: "Thao tác", width: 250,
            renderCell: (params) => (
                <ActionContainer>
                    <EditButton style={{ borderRadius: "20px" }} onClick={() => { handleClickEditButton(params.row.id) }}>Sửa</EditButton>
                    <DialogHOC title="Thông báo!" content="Bạn có xác nhận muốn xóa?" onYes={() => { handleDeleteCategory(params.row.id) }}>
                        <DeleteButton style={{ borderRadius: "20px" }}>
                            <DeleteOutlineOutlinedIcon style={{ fontSize: "20px", marginTop: "5px" }} />
                        </DeleteButton>
                    </DialogHOC>
                </ActionContainer>
            )
        }
    ];


    const handleSubmitCreateForm = () => {
        productAPI.createCategory({ title: categoryValue.title })
            .then(res => {
                if (!res.status) {
                    const newData = [{ ...res }, ...data];
                    setData(newData);
                    haldeCloseForm();
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
    }
    const haldeCloseForm = () => {
        setIsOpenForm(false);
        setUpdatingId(undefined);
        setCategoryValue({ id: undefined, title: "" });
    }


    const handleUpdateCategoryDetails = (value) => {
        productAPI.updateCategoryDetails(value)
            .then(res => {
                if (!res.status) {
                    setData(data.map((item, index) => {
                        if (item.id === res.id) {
                            return { ...res };
                        } else {
                            return item;
                        }
                    }));
                    haldeCloseForm();
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err));
    }

    const toggleOpenForm = () => {
        if (isOpenForm) {
            if (updatingId) {
                setUpdatingId(undefined);
                setCategoryValue({ id: undefined, title: "" });
            } else {
                setIsOpenForm(false);
            }
        } else {
            setIsOpenForm(true);
            setUpdatingId(undefined);
            setCategoryValue({ id: undefined, title: "" });
        }
    }

    const onChange = (e) => {
        setCategoryValue({
            ...categoryValue,
            [e.target.name]: e.target.value
        })
    }

    const handleDeleteCategory = (id) => {
        if (id) {
            productAPI.deleteCategory(id)
                .then(res => {
                    if (!res.status) {
                        setData(data.filter((item, index) => item.id !== id));
                        openNotificationWithIcon('warning', 'Thông báo!', 'Xóa thể loại thành công!');
                        haldeCloseForm();
                    } else {
                        if (res.status === 500) {
                            Modal.error({
                                title: 'Hộp Thoại Thông Báo',
                                content: res.data
                            })
                        } else {
                            Modal.error({
                                title: 'Hộp Thoại Thông Báo',
                                content: 'Xóa không thành công!'
                            })
                        }
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
        }
    }


    const onFinish = (value) => {
        if (!value.id) {
            productAPI.createCategory({ title: value.title })
                .then(res => {
                    if (!res.status) {
                        const newData = [{ ...res }, ...data];
                        setData(newData);
                        openNotificationWithIcon('success', 'Thành công!', 'Tạo thể loại thành công!');
                        haldeCloseForm();
                    } else {
                        console.log(res);
                    }
                })
                .catch(err => console.log(err));
        } else {
            productAPI.updateCategoryDetails(value)
                .then(res => {
                    if (!res.status) {
                        setData(data.map((item, index) => {
                            if (item.id === res.id) {
                                return { ...res };
                            } else {
                                return item;
                            }
                        }));
                        openNotificationWithIcon('success', 'Thành công', 'Cập nhật thể loại thành công!')
                        haldeCloseForm();
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        productAPI.getAllCategory()
            .then((res) => {
                setData(res.map((item, index) => (
                    {
                        ...item
                    }
                )));
                setIsLoading(false);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])


    useEffect(() => {
        form.resetFields();
    }, [categoryValue])

    return (
        <Helmet
            title="Categories Manager"
        >
            <Container>

                <ListContainer
                    isOpenForm={isOpenForm}
                >
                    <ListWrapper>
                        <TitleContainer>
                            <Title>DANH SÁCH THỂ LOẠI SẢN PHẨM</Title>
                            <TitleButton style={{ width: "120px", borderRadius: "20px" }} onClick={toggleOpenForm}>Thêm mới</TitleButton>
                        </TitleContainer>
                        {
                            isLoading ?
                                (
                                    <>
                                        Loading...
                                    </>
                                )
                                :
                                <DataContainer>

                                    <DataGrid
                                        rows={data}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        style={{ height: 500 }}
                                    />
                                </DataContainer>
                        }
                    </ListWrapper>
                </ListContainer>
                {
                    isOpenForm &&
                    <FormContainer>
                        <FormWrapper>
                            <FormTitle>{updatingId ? "Cập nhật" : "Tạo mới"}</FormTitle>
                            <CateFormContainer>
                                {/* <CateForm>
                                    {
                                        updatingId ?
                                            (
                                                <>
                                                    <CateFormGroup>
                                                        <CateFormGroupLabel>Id</CateFormGroupLabel>
                                                        <CateFormGroupInput value={categoryValue.id} disabled />
                                                    </CateFormGroup>
                                                    <CateFormGroup>
                                                        <CateFormGroupLabel>Title</CateFormGroupLabel>
                                                        <CateFormGroupInput onChange={onChange} name="title" placeholder="Title" value={categoryValue.title} />
                                                    </CateFormGroup>
                                                    <CateFormGroup>
                                                        <DialogHOC
                                                            title="Confirm Dialog"
                                                            content="Do you want to up date this category details?"
                                                            onYes={() => { handleUpdateCategoryDetails(categoryValue) }}
                                                        >
                                                            <CateFormButton>Update</CateFormButton>
                                                        </DialogHOC>
                                                    </CateFormGroup>
                                                    <CateFormGroup>
                                                        <DialogHOC
                                                            title="Confirm Dialog"
                                                            content="Do you want to delete this category ?"
                                                            onYes={() => handleDeleteCategory(updatingId)}
                                                        >
                                                            <CateFormButton>Delete</CateFormButton>
                                                        </DialogHOC>
                                                    </CateFormGroup>
                                                    <CateFormGroup>
                                                        <CateFormButton onClick={() => { haldeCloseForm() }}>Close</CateFormButton>
                                                    </CateFormGroup>
                                                </>
                                            )
                                            :
                                            (<>
                                                <CateFormGroup>
                                                    <CateFormGroupLabel>Title</CateFormGroupLabel>
                                                    <CateFormGroupInput onChange={onChange} name="title" placeholder="Title" value={categoryValue.title} />
                                                </CateFormGroup>
                                                <CateFormGroup>
                                                    <CateFormButton onClick={handleSubmitCreateForm}>Create</CateFormButton>
                                                </CateFormGroup>
                                                <CateFormGroup>
                                                    <CateFormButton onClick={() => { haldeCloseForm() }}>Close</CateFormButton>
                                                </CateFormGroup>
                                            </>
                                            )
                                    }

                                </CateForm> */}
                                <Form
                                    name='category'
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    onFinish={onFinish}
                                    layout='horizontal'
                                    autoComplete='off'
                                    initialValues={categoryValue}
                                    form={form}
                                >
                                    {
                                        updatingId ?
                                            (
                                                <>
                                                    <Form.Item
                                                        label="ID sản phẩm"
                                                        name="id"
                                                        hasFeedback
                                                    >
                                                        <Input disabled />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Tên thể loại sản phẩm"
                                                        name="title"
                                                        rules={[
                                                            { required: true, message: 'Không được để trống!' },
                                                            { whitespace: true, message: 'Không nhập ký tự dấu cách!' },
                                                            { min: 3, message: 'Không được nhập ít hơn 3 ký tự!' },
                                                            { max: 50, message: 'Không được nhập nhiều hơn 50 ký tự!' }
                                                        ]}
                                                        hasFeedback
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </>
                                            )
                                            :
                                            (
                                                <>
                                                    <Form.Item
                                                        label="Tên thể loại sản phẩm"
                                                        name="title"
                                                        rules={[
                                                            { required: true, message: 'Không được để trống!' },
                                                            { whitespace: true, message: 'Không được nhập ký tự dấu cách' },
                                                            { min: 3, message: 'Không được nhập ít hơn 3 ký tự!' },
                                                            { max: 50, message: 'Không được nhập nhiều hơn 50 ký tự!' }
                                                        ]}
                                                        hasFeedback
                                                    >
                                                        <Input placeholder='Ví dụ: Áo mùa đông...' />
                                                    </Form.Item>
                                                </>
                                            )
                                    }

                                    <Form.Item>
                                        {
                                            updatingId ?
                                                (
                                                    <>
                                                        <DialogHOC
                                                            title="Thông báo!"
                                                            content="Bạn có muốn cập nhật không?"
                                                            onYes={() => form.submit()}
                                                        >
                                                            <CateFormButton style={{ borderRadius: "20px" }}>Cập nhật</CateFormButton>
                                                        </DialogHOC>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <CateFormButton style={{ borderRadius: "20px" }} onClick={() => { form.submit() }}>Thêm mới</CateFormButton>
                                                    </>
                                                )
                                        }
                                    </Form.Item>
                                    <Form.Item>
                                        <CateFormButton style={{ borderRadius: "20px" }} onClick={haldeCloseForm}>Đóng</CateFormButton>
                                    </Form.Item>
                                </Form>
                            </CateFormContainer>
                        </FormWrapper>
                    </FormContainer>
                }
            </Container >
        </Helmet >
    )
}

export default AdmCategoryList