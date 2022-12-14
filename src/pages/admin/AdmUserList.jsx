import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { userRows } from '../../assets/data/data';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import usersAPI from '../../api/usersAPI';
import defaultAvt from '../../assets/imgs/default-avt.jpg';
import DialogHOC from '../../hoc/DialogHOC';


const Container = styled.div`
    width: 100%;
    padding: 20px;
`
const Wrapper = styled.div`
    width: 100%;
    height: 500px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
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





const AdmUserList = () => {
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
            field: 'username', headerName: 'Tên tài khoản', width: 200,
            renderCell: (params) => (
                <UserContainer>
                    <UserImg src={params.row.photo ? `http://localhost:8080/api/file/images/${params.row.photo}` : defaultAvt} alt="" />
                    {params.row.username}
                </UserContainer>
            )
        },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'activated', headerName: 'Trạng thái', width: 120, },
        { field: 'phone', headerName: 'Số điện thoại', width: 120, },
        {
            field: 'action', headerName: "Thao tác", width: 250,
            renderCell: (params) => (
                <ActionContainer >
                    <Link to={"/admin/user/" + params.row.username} >
                        <EditButton style={{ borderRadius: "20px" }}>Sửa</EditButton>
                    </Link>
                    <DialogHOC title="Confirm Dialog" content="Do you want to delete this user?" onYes={() => { hadleDeleteUser(params.row.username) }}>
                        <DeleteButton style={{ borderRadius: "20px" }}>
                            <DeleteOutlineOutlinedIcon style={{ fontSize: "20px", marginTop: "5px" }} />
                        </DeleteButton>
                    </DialogHOC>
                </ActionContainer>
            )
        }
    ];

    const hadleDeleteUser = (username) => {
        usersAPI.deleteUser(username)
            .then(res => {
                const index = findIndexInArrByUsername(data, username);
                setData(data.filter((item, crrIndex) => {
                    if (crrIndex !== index) {
                        return item;
                    }
                }));
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        usersAPI.getall()
            .then((res) => {
                setData(res.map((item, index) => (
                    {
                        ...item, id: item.username
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
            <Wrapper style={{ height: 400, width: '100%' }}>
                <TitleContainer>
                    <Title>Danh sách tài khoản</Title>
                    <Link to="/admin/new-user">
                        <TitleButton style={{ width: "100px", borderRadius: "20px" }}>Thêm mới</TitleButton>
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
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                            />
                        </>
                }
            </Wrapper>
        </Container>
    )
}

export default AdmUserList