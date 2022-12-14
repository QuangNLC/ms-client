import React from 'react'
import styled from 'styled-components'
import Product from './Product'

const Container = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`

const Products = ({ items }) => {
    return (
        <Container>
            <Wrapper>
                {
                    items && items.map(item => (
                        <Product item={item} key={item.id} />
                    ))
                }
            </Wrapper>
        </Container>
    )
}

export default Products