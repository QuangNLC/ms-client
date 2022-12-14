import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PublishIcon from '@mui/icons-material/Publish';
import { Link, useParams } from 'react-router-dom';
import usersAPI from '../../api/usersAPI';
import defaultAvt from '../../assets/imgs/default-avt.jpg';
import DialogHOC from '../../hoc/DialogHOC'
import { Checkbox, Input, Radio, Select, Button, Modal, notification } from 'antd';
import authAPI from '../../api/authAPI';

const Container = styled.div`
    width: 100%;
    padding: 20px;
`
const UserTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const UserTitle = styled.h1``
const UserTitleButtonContainer = styled.div``
const UserTitleButton = styled.button`
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
    margin-top: 20px;
`
const UserShow = styled.div`
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-right: 20px;
    background-color: white;
    border-radius: 10px;
`
const UserShowTop = styled.div`
    display: flex;
    align-items: center;
`
const UserShowTopImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`
const UserShowTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`
const UserShowTopUsername = styled.span`
    font-weight: 600;
`
const UserShowTopUserTitle = styled.span`
    font-weight: 300;
`
const UserShowBottom = styled.div`
    margin-top: 20px;
`
const UserShowTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(231, 230, 230);
`
const UserShowInfo = styled.div`
    display: flex;
    align-items:center;
    margin: 20px 0px;
    color: #444;
`
const UserShowInfoIcon = styled.div`
    margin-right: 10px;
`
const UserShowInfoTitle = styled.span``

const UserUpdate = styled.div`
    flex: 2;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: white;
    border-radius: 10px;
`
const UserUpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`
const UserUpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const UserUpdateLeft = styled.div``
const UserUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 30px;
`
const ItemLabel = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
`
const ItemError = styled.span`
    padding: 5px;
    font-size: 12px;
    color: red;
    display: none;
`
const ItemInput = styled.input`
    border: none;
    width: 250px;
    height: 30px;
    padding: 5px;
    border-bottom: 1px solid gray;

    &:disabled {
        background-color: rgba(0,0,0, 0.25);
    }

    &:invalid {
        border-bottom: 1px solid red;
    }

    &:invalid ~ span {
        display: block;
    }
`


const UserUpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const UserUpdateUpload = styled.div``
const UserUpdateUploadImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px; 
`
const UserUpdateUploadLabel = styled.label``
const UserUpdateUploadInput = styled.input`
    display: none;
`
const UpdateButton = styled.div`
    border-radius: 5px;
    border: none;
    padding: 5px;
    cursor: pointer;
    background-color: teal;
    color: white;
    font-weight: 500;
    transition: all 0.25s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        background-color: darkblue;
    }
`

const openNotificationWithIcon = (type, title, des) => {
    notification[type]({
        message: title,
        description: des,
    });
};



const AdmUserDetail = () => {
    const { username } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [selectedRole, setSelectedRole] = useState(3)
    const [updateValue, setUpdateValue] = useState({});

    const handleUpdateUser = (user) => {
        const payload = {
            username: username,
            roleid: selectedRole
        };
        Modal.confirm({
            title: 'Hộp Thoại Xác Nhận',
            content: 'Bạn có muốn cập nhật tài khoản không.',
            okText: 'Xác Nhận',
            cancelText: 'Hủy Bỏ',
            onOk: () => {
                console.log(payload)
                setIsLoading(true)
                authAPI.updateRoleByAdm(payload)
                    .then(res => {
                        if (!res.status) {
                            openNotificationWithIcon('success', 'Thông Báo', 'Cập nhật tài khoản thành công.')
                            setIsLoading(false);
                            console.log(res.roles.id)
                            setSelectedRole(res.roles.id);

                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }

    const onChangeUpdateValue = (e) => {
        setUpdateValue({
            ...updateValue,
            [e.target.name]: e.target.value
        })
    }

    const onChangeSelectedRole = (e) => {
        setSelectedRole(e.target.value)
    }


    console.log(updateValue)

    useEffect(() => {
        setIsLoading(true)
        console.log(username);
        usersAPI.getUser(username)
            .then(res => {
                console.log(res);
                setUser(res);
                setUpdateValue(res);
                setIsLoading(false);
                console.log(res.roles.id)
                setSelectedRole(res.roles.id);
            })
            .catch(err => {
                console.log(err);
            });
    }, [username])

    return (
        <Container>
            <UserTitleContainer>
                <UserTitle>Chỉnh sửa tài khoản</UserTitle>
                <UserTitleButtonContainer>
                    <Link to="/admin/user-list" style={{ marginRight: "20px", width: "0px" }}>
                        <UserTitleButton style={{ width: "120px", borderRadius: "20px" }}>Danh sách
                        </UserTitleButton>
                    </Link>
                    <Link to="/admin/new-user">
                        <UserTitleButton style={{ width: "120px", borderRadius: "20px" }}>Tạo mới</UserTitleButton>
                    </Link>
                </UserTitleButtonContainer>
            </UserTitleContainer>
            {
                isLoading ?
                    (
                        <>
                            Loading...
                        </>
                    )
                    :
                    (
                        <>
                            {updateValue &&
                                <UserContainer>
                                    <UserShow>
                                        <UserShowTop>
                                            <UserShowTopImg src={`http://localhost:8080/api/file/images/${user?.photo}`} alt="" />
                                            <UserShowTopTitle>
                                                <UserShowTopUsername>{user.fullname}</UserShowTopUsername>
                                            </UserShowTopTitle>
                                        </UserShowTop>
                                        <UserShowBottom>
                                            <UserShowTitle>Thông tin tài khoản</UserShowTitle>
                                            <UserShowInfo>
                                                <UserShowInfoIcon><PermIdentityOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>{user.username}</UserShowInfoTitle>
                                            </UserShowInfo>
                                            <UserShowInfo>
                                                <UserShowInfoIcon><CalendarTodayOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>10.12.1999</UserShowInfoTitle>
                                            </UserShowInfo>
                                            <UserShowTitle>Thông tin liên lạc</UserShowTitle>
                                            <UserShowInfo>
                                                <UserShowInfoIcon><PhoneAndroidOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>{user.phone}</UserShowInfoTitle>
                                            </UserShowInfo>
                                            <UserShowInfo>
                                                <UserShowInfoIcon><LocationSearchingOutlinedIcon /></UserShowInfoIcon>
                                                <UserShowInfoTitle>New York | USA</UserShowInfoTitle>
                                            </UserShowInfo>
                                        </UserShowBottom>
                                    </UserShow>
                                    <UserUpdate>
                                        <UserUpdateTitle>Chỉnh sửa quyền tài khoản</UserUpdateTitle>
                                        {/* <UserUpdateForm>
                                            <UserUpdateLeft>
                                                <UserUpdateItem>
                                                    <ItemLabel>Tên tài khoản</ItemLabel>
                                                    <ItemInput placeholder='annabeck99' type="text" name="username" value={updateValue.username} disabled />
                                                </UserUpdateItem>
                                                <UserUpdateItem>
                                                    <ItemLabel>Email</ItemLabel>
                                                    <ItemInput placeholder={updateValue.email} type="email" name="email" value={updateValue.email} disabled />
                                                </UserUpdateItem>
                                                <UserUpdateItem>
                                                    <ItemLabel>Họ và Tên</ItemLabel>
                                                    <ItemInput
                                                        placeholder={updateValue.fullname}
                                                        type="text"
                                                        value={updateValue.fullname}
                                                        name="fullname"
                                                        onChange={onChangeUpdateValue}
                                                    />
                                                    <ItemError>Tên đầy đủ tối thiểu 3 ký tự trở lên!</ItemError>
                                                </UserUpdateItem>
                                                <UserUpdateItem>
                                                    <ItemLabel>Số điện thoại</ItemLabel>
                                                    <ItemInput
                                                        placeholder={updateValue.phone}
                                                        value={updateValue.phone}
                                                        type="number"
                                                        name="phone"
                                                        onChange={onChangeUpdateValue}
                                                    />
                                                    <ItemError>Số điện thọai đang để trống!</ItemError>
                                                </UserUpdateItem>
                                            </UserUpdateLeft>
                                            <UserUpdateRight>
                                                <UserUpdateUpload>
                                                    <UserUpdateUploadImg src={updateValue.photo || defaultAvt} alt="" />
                                                    <UserUpdateUploadLabel htmlFor='file'><PublishIcon style={{ cursor: "pointer" }} /></UserUpdateUploadLabel>
                                                    <UserUpdateUploadInput type={"file"} id="file" />
                                                </UserUpdateUpload>
                                                <DialogHOC
                                                    title="Confirm Dialog"
                                                    content="Do you want to update this user?"
                                                    onYes={() => { handleUpdateUser(updateValue) }}
                                                >
                                                    <UpdateButton style={{ width: "120px", borderRadius: "20px" }}>Cập nhật</UpdateButton>
                                                </DialogHOC>
                                            </UserUpdateRight>
                                        </UserUpdateForm> */}
                                        <div
                                            style={{ marginTop: 20 }}
                                        >
                                            <Radio.Group onChange={onChangeSelectedRole} value={selectedRole}>
                                                <Radio value={3}>Người Dùng</Radio>
                                                <Radio value={1}>Quản Lý</Radio>
                                            </Radio.Group>
                                        </div>
                                        <div
                                            style={{ marginTop: 20 }}
                                        >
                                            <Button onClick={handleUpdateUser} type='primary'>Cập Nhật</Button>
                                        </div>

                                    </UserUpdate>
                                </UserContainer>
                            }
                        </>
                    )
            }
        </Container>
    )
}

export default AdmUserDetail