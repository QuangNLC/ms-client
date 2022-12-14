import React from 'react'
import styled from 'styled-components'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { formatter } from '../utils/index'

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
const Featured = styled.div`
    flex: 1;
    margin: 0px 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: white;
`
const Title = styled.span`
    font-size: 20px;
`
const MoneyContainer = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: center;
`
const Money = styled.span`
    font-size: 30px;
    font-weight: 600;
`
const MoneyRate = styled.span`
    display: flex;
    align-items: center;
    margin-left: 12px;
    color: ${props => props.negative ? "red":"green"};
`
const Sub = styled.div`
    font-size: 15px;
    color: gray;
`

const AdmFeaturedInfo = () => {
    return (
        <Wrapper>
            <Featured>
                <Title>Hôm Nay</Title>
                <MoneyContainer>
                    <Money>0 Đơn Hàng</Money>
                </MoneyContainer>
            </Featured>
            <Featured>
                <Title>Hàng Bán Được Tháng Này</Title>
                <MoneyContainer>
                    <Money>15 Sản Phẩm</Money>
                </MoneyContainer>
            </Featured>
            <Featured>
                <Title>Doanh Số Tháng Này</Title>
                <MoneyContainer>
                    <Money>{formatter.format(180000)}</Money>
                    {/* <MoneyRate>
                        +2.4 <ArrowUpwardIcon />
                    </MoneyRate> */}
                </MoneyContainer>
                {/* <Sub>Compared to last month.</Sub> */}
            </Featured>
        </Wrapper>
    )
}

export default AdmFeaturedInfo