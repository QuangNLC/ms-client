import React from 'react'
import styled from 'styled-components'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


const Container = styled.div` 
    width: 100%;
    padding: 20px;
`
const Wrapper = styled.div`
    display: flex;
`
const Title = styled.h3``

const ChartContainer = styled.div`
    width: 50%;
    height: 300px;
`
const NoteContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const NoteItem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`
const NoteItemlabel = styled.div`
    margin-right: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => `${props.bg}`};
`
const NoteItemContent = styled.div`
    font-size: 14px;
    font-weight: 300;
`



const COLORS = [ '#FFBB28', '#00C49F', '#FF8042','#0088FE','#fa0505'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const AdmPieChart = ({data}) => {
    return (
        <Container>
            <Wrapper>
                <Title>Đơn Hàng</Title>
                <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
                <NoteContainer>
                    {
                        data.map((item, index) => (
                            <NoteItem key={index}>
                                <NoteItemlabel bg={item.color}></NoteItemlabel>
                                <NoteItemContent>{item.name}</NoteItemContent>
                            </NoteItem>
                        ))
                    }
                </NoteContainer>
            </Wrapper>
        </Container>
    )
}

export default AdmPieChart