import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: white;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.85);
`

const Announcement = () => {
    return (
        <Container>Giảm giá lên đến 50%, chiết khấu lớn nhất - Hãy nhanh tay - Cửa hàng ưu đãi trong thời gian có hạn </Container>
    )
}

export default Announcement