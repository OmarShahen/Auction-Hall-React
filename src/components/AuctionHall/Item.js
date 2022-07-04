import React from 'react'
import styled from 'styled-components'
import Image from '../../images/ballondor.png'


const Container = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 1rem;
    border-radius: 5px;
`

const MainContainer = styled.div`
    display: flex;
`

const ItemWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
`

const ItemContainer = styled.div`
    
`

const ItemImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
`

const ItemImage = styled.img`
    border-radius: 5px;
    width: 400px;
    height: 400px;
`

const ItemInfo = styled.div`
    width: 40rem;
    flex: 1;
`

const ItemName = styled.h3`
    font-weight: bold;

`

const ItemCondition = styled.span`
    padding: 0 1rem;
    color: green;
`

const ItemDescription = styled.p``

const ItemCategoriesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const ItemCategory = styled.span`
    padding: .5rem;
    background-color: #000;
    color: #fff;
    margin: 0 1rem 0 0;
    border-radius: 10px;
`

const Item = () => {
    return (
        <Container>
            <MainContainer>
                <ItemContainer>
                    <ItemWrapper>
                        <ItemImageContainer>
                            <ItemImage src={Image} />
                        </ItemImageContainer>
                        <ItemInfo>
                            <ItemName>
                                Ballon d'or
                                <ItemCondition>
                                    new
                                </ItemCondition>
                            </ItemName>
                                <ItemDescription>
                                The Ballon d'Or is an annual football award presented by French news magazine France Football since 1956. Between 2010 and 2015, in an agreement with FIFA, the award was temporarily merged with the FIFA World Player of the Year and known as the FIFA Ballon d'Or.
                                </ItemDescription>
                                <ItemCategoriesWrapper>
                                    <ItemCategory>antique</ItemCategory>
                                    <ItemCategory>painting</ItemCategory>
                                </ItemCategoriesWrapper>
                        </ItemInfo>
                    </ItemWrapper>
                </ItemContainer>
            </MainContainer>
        </Container>
    )
}

export default Item