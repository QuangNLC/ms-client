import { Spin } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedAdminLayout = ({children}) => {
    const auth = useSelector(state => state.auth.auth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)


    const check = isAuth && auth?.info.roles && (auth?.info?.roles.rolename === "ROLE_ADMIN")

    useEffect(() => {
        const check = isAuth && auth?.info.roles && (auth?.info?.roles.rolename === "ROLE_ADMIN")
        if(!check){
            navigate("/")
        }
    }, [auth, isAuth])

    return (
        check ? (
            children
        ) : (
            <Spin />
        )
    )
}

export default ProtectedAdminLayout