import React from 'react'
import styled from 'styled-components'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Container = styled.div` 
    width: 100%;
`
const Wrapper = styled.div`
    padding: 20px;
    background-color: transparent;
`
const Title = styled.h3``

const ChartContainer = styled.div`
    width: 100%;
`



const AdmBarChart = ({ title, data, dataKey, grid }) => {
    return (
        <Container>
            <Wrapper>
                <Title>{title}</Title>
                <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%" aspect={4 / 1}>
                        <BarChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <XAxis dataKey="month" stroke='#5550bd' />
                            <YAxis dataKey="turnover"/>
                            <Bar dataKey="turnover" fill="#8884d8" />
                            <Tooltip />
                            {/* {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="3 3" />} */}
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>

            </Wrapper>
        </Container>
    )
}

export default AdmBarChart