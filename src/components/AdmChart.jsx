import React from 'react'
import styled from 'styled-components'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Container = styled.div` 
    width: 100%;
    padding: 20px;
`
const Wrapper = styled.div`
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    background-color: white;
`
const Title = styled.h3``

const ChartContainer = styled.div`
    width: 100%;
`



const AdmChart = ({ title, data, dataKey, grid }) => {
    return (
        <Container>
            <Wrapper>
                <Title>{title}</Title>
                <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%" aspect={4 / 1}>
                        <LineChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <XAxis dataKey="name" stroke='#5550bd' />
                            <YAxis />
                            <Tooltip />
                            {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="3 3" />}
                            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>

            </Wrapper>
        </Container>
    )
}

export default AdmChart