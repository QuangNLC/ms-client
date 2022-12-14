import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import productsAPI from '../../api/productsAPI';
import DialogHOC from '../../hoc/DialogHOC';
import { Form, Input, Modal, Select } from 'antd';
import moment from 'moment'

const Container = styled.div`
    width: 100%;
    padding: 20px;
`
const Wrapper = styled.div`
    width: 100%;
    height:  max-content;
    display:  flex;
    justify-content:center;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
`
const Top = styled.div`
    width:  100%;
    min-height:  50vh;
    padding:  20px;
    display:  flex;
    justify-content:  center;
    align-items:  top;
`
const Left = styled.div`
    width: calc(2/3 *  100%);
    padding: 20px;
    
`
const ProductDetailsFormContainer = styled.div`
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    width:  100%;
    padding: 20px;
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
`
const ProductSizesTitle = styled.span``

const Bottom = styled.div`
    width:  100%;
    height:  600px;
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

const AdmProductList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isModal, setIsModal] = useState(false);

    const findIndexInArrByUsername = (arr, username) => {
        let result = -1;

        arr.forEach((item, index) => {
            if (item.username === username) {
                result = index;
            };
        });

        return result;
    }

    const columns = [
        {
            field: 'index', headerName: 'STT', width: 50,
        },
        { field: 'name', headerName: 'Tên Sản Phẩm', width: 300, },
        {
            field: 'category', headerName: 'Thể Loại', width: 120,
            renderCell: (params) => (
                <>{params.row.category.title}</>
            )
        },
        {
            field: 'material', headerName: 'Chất Liệu', width: 120,
            renderCell: (params) => (
                <>{params.row.material.title}</>
            )
        },
        {
            field: 'stock', headerName: 'Số Lượng', width: 100,
            renderCell: (params) => (
                <>{params.row.productsizes.reduce((total, item) => { return total + item.quantity }, 0)}</>
            )
        },
        { field: 'export_price', headerName: "Giá Bán", width: 130 },
        { field: 'create_date', headerName: 'Ngày Tạo', width: 140 },
        {
            field: 'action', headerName: "Thao Tác", width: 200,
            renderCell: (params) => (
                <ActionContainer>
                    <Link to={"/admin/edit-product/" + params.row.id}>
                        <EditButton style={{ borderRadius: "20px" }}>Sửa</EditButton>
                    </Link>
                    <DialogHOC title="Thông báo!" content="Bạn có muốn xóa sản phẩm này ?" onYes={() => { hadleDeleteUser(params.row.id) }}>
                        <DeleteButton style={{ borderRadius: "20px" }}>
                            <DeleteOutlineOutlinedIcon style={{ fontSize: "20px", marginTop: "5px" }} />
                        </DeleteButton>
                    </DialogHOC>
                </ActionContainer>
            )
        }
    ];

    const hadleDeleteUser = (id) => {
        console.log(id)
        productsAPI.deleteProduct(id)
            .then((res) => {
                if (!res.status) {
                    let index = data.findIndex(item => item.id === id)
                    if (index !== -1) {
                        data.splice(index, 1);
                        setData([...data])
                        Modal.info({
                            title: 'Hộp THoại Thông Báo',
                            content: 'Xóa sản phẩm thành công'
                        })
                    }
                }
                else {
                    Modal.error({
                        title: 'Hộp Thoại Thông Báo',
                        content: res?.data ? res?.data : 'Xoá thất bại.'
                    })
                }
            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        productsAPI.getAll()
            .then((res) => {
                setData(res.map((item, index) => (
                    {
                        ...item,
                        index: index + 1,
                        create_date: moment(item.create_date).format('DD-MM-YYYY')
                    }
                )));
                setIsLoading(false);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
    return (
        <Container>
            <Wrapper>
                <Bottom>
                    <TitleContainer>
                        <Title>DANH SÁCH SẢN PHẨM</Title>
                        <Link to="/admin/new-product">
                            <TitleButton style={{ width: "120px", borderRadius: "20px" }}>Thêm mới</TitleButton>
                        </Link>
                    </TitleContainer>
                    {
                        isLoading ?
                            (
                                <>
                                    Loading...
                                </>
                            )
                            :
                            <>

                                <DataGrid
                                    rows={data}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[5]}
                                    style={{ height: "calc( 100% - 50px)" }}
                                />
                            </>
                    }
                </Bottom>
            </Wrapper>
        </Container>
    )
}

export default AdmProductList