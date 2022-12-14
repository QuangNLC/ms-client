import React from 'react'
import styled from 'styled-components';
import AdmChart from '../../components/AdmChart';
import AdmFeaturedInfo from '../../components/AdmFeaturedInfo';
import { userStatsData } from '../../assets/data/data';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdmPieChart from '../../components/AdmPieChart';
import { useEffect } from 'react';
import { useState } from 'react';
import reportAPI from '../../api/reportAPI';
import AdmBarChart from '../../components/AdmBarChart';
import { Select, Spin } from 'antd';
import { formatter } from '../../utils';

const Container = styled.div`
    width: 100%;
`
const WidgetContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
const Widget = styled.div`
    flex: 1;
    margin: 0px 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: white;
`
const WidgetTitle = styled.div`
    font-size: 20px;
`
const WidgetDetail = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: center;
    font-size: 30px;
    font-weight: 600;
`
const BarChartContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
    padding: 20px;
`
const BarChartSelectYear = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const BarCharWrapper = styled.div`
    width: 100%;
    padding: 0 20px;
    background-color: white;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75)  
`

const PieChartContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    padding: 20px;
`

const PieChartWrapper = styled.div`
    width: 100%;
    padding: 20px;
    background-color: white;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
`

const data = [
    { name: 'Chờ Xác Nhận', value: 10, color: '#FFBB28' },
    { name: 'Đã Xác Nhận', value: 20, color: '#00C49F' },
    { name: 'Đang Giao', value: 30, color: '#FF8042' },
    { name: 'Hoàn Thành', value: 40, color: '#0088FE' },
    { name: 'Hủy Đơn', value: 50, color: '#fa0505' },
];
const getPieColor = (name) => {
    let color = '#FFBB28'

    switch (name) {
        case ('Chờ Xác Nhận'): {
            color = '#FFBB28';
            break;
        }
        case ('Đã Xác Nhận'): {
            color = '#00C49F';
            break;
        }
        case ('Đang Giao'): {
            color = '#FF8042';
            break;
        }
        case ('Hoàn Tất'): {
            color = '#0088FE';
            break;
        }
        case ('Đang Chờ'): {
            color = '#fa0505';
            break;
        }
    }
    return color;
}

const AdmDashboard = () => {
    const [chartData, setChartData] = useState([])

    const [barChartData, setBarChartData] = useState([])
    const [barChartLoading, setbarChartLoading] = useState(true)
    const [barChartYear, setBarChartYear] = useState(2022)
    const onChangeBarChartYear = (value) => {
        console.log(value)
        setBarChartYear(value)
    }

    const [pieChartData, setPieChartData] = useState([])
    const [pieChartLoading, setPieChartLoading] = useState(true)
    const [totalOrderCountToday, setTotalOrderCountToday] = useState(0)
    const [totalOrderCountLoading, setTotalOrderCountLoading] = useState(true)
    const [totalSellThisMonth, setTotalSellThisMonth] = useState(0)
    const [totalSellThisMonthLoading, setTotalSellThisMonthLoading] = useState(true)



    useEffect(() => {
        if (barChartYear) {
            reportAPI.getChartData(barChartYear)
                .then((res) => {
                    if (!res.status) {
                        setBarChartData(res.map((item, index) => {
                            return ({
                                month: `Tháng ${item.month}`,
                                turnover: item.turnover
                            })
                        }))
                        setbarChartLoading(false)
                        console.log(res)
                    } else {
                        console.log(res)
                    }
                })
                .catch(err => console.log(err))
        }
    }, [barChartYear])


    useEffect(() => {
        setbarChartLoading(true)
        setPieChartLoading(true)
        setTotalOrderCountLoading(true)
        setTotalSellThisMonthLoading(true)
        reportAPI.getChartData(2022)
            .then((res) => {
                if (!res.status) {
                    setBarChartData(res.map((item, index) => {
                        return ({
                            month: `Tháng ${item.month}`,
                            turnover: item.turnover
                        })
                    }))
                    setbarChartLoading(false)
                    console.log(res)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
        reportAPI.getOrderStat()
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setPieChartData(res.map((item, index) => ({
                        ...item,
                        color: getPieColor(item.name)
                    })))
                    setPieChartLoading(false)
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
        reportAPI.getTodayOrderCount()
            .then(res => {
                if (!res.status) {
                    console.log(res)
                    setTotalOrderCountToday(res)
                    setTotalOrderCountLoading(false)
                } else {
                    if (res.status === 200) {
                        setTotalOrderCountToday(res.data)
                        setTotalOrderCountLoading(false)
                    }
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
        reportAPI.getProductSellThisMonth()
            .then(res => {
                if (!res.status) {
                    setTotalSellThisMonth(res)
                    setTotalSellThisMonthLoading(false)
                } else {
                    if (res.status === 200) {
                        console.log(res)
                        setTotalSellThisMonth(0)
                        setTotalSellThisMonthLoading(false)
                    }
                    console.log(res)
                }
            }
            )
            .catch(err => console.log(err))
    }, [])



    return (
        <Container>
            {/* <AdmFeaturedInfo /> */}
            <WidgetContainer>
                <Widget>
                    {
                        totalOrderCountLoading ?
                            (
                                <Spin />
                            )
                            :
                            (
                                <>
                                    <WidgetTitle>Hôm Nay</WidgetTitle>
                                    <WidgetDetail>{`${totalOrderCountToday} Đơn Hàng`}</WidgetDetail>
                                </>

                            )
                    }

                </Widget>
                <Widget>
                    {
                        totalSellThisMonthLoading ?
                            (
                                <Spin />
                            )
                            :
                            (
                                <>
                                    <WidgetTitle>Hàng Bán Được Tháng Này</WidgetTitle>
                                    <WidgetDetail>{`${totalSellThisMonth} Sản Phẩm`}</WidgetDetail>
                                </>

                            )
                    }


                </Widget>
            </WidgetContainer>
            <BarChartContainer>
                <BarChartSelectYear>
                    Năm:
                    <Select value={barChartYear} onChange={onChangeBarChartYear}>
                        <Select.Option value={2021}>
                            2021
                        </Select.Option>
                        <Select.Option value={2022}>
                            2022
                        </Select.Option>
                        <Select.Option value={2023}>
                            2023
                        </Select.Option>
                    </Select>
                </BarChartSelectYear>
                <BarCharWrapper>
                    {
                        barChartLoading ?
                            (
                                <Spin />
                            )
                            :
                            (
                                <AdmBarChart title={"Doanh Thu"} data={barChartData} dataKey={"turnover"} grid />
                            )
                    }
                </BarCharWrapper>
            </BarChartContainer>
            <PieChartContainer>
                <PieChartWrapper>
                    {
                        pieChartLoading ?
                            (
                                <Spin />
                            )
                            :
                            (
                                <AdmPieChart data={pieChartData} />
                            )
                    }
                </PieChartWrapper>
            </PieChartContainer>
        </Container>
    )
}

export default AdmDashboard