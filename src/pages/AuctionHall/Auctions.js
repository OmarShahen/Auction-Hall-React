import React from 'react'
import Navbar from '../../components/AuctionHall/Navbar'
import Sidebar from '../../components/AuctionHall/SideNavbar'
import styled from 'styled-components'
import AuctionTable from '../../tables/AuctionsTable'

const Container = styled.div`
    
`

const MainContainer = styled.div`
    display: flex;
    
`

const AuctionWrapper = styled.div`
    width: 100%;
    padding: 1rem;
    
`

const Header = styled.h3`
    font-weight: bold;
    padding-bottom: 2rem;
`


const Auctions = () => {
    return (
        <Container>
            <Navbar />
            <MainContainer>
                
                <AuctionWrapper>
                    <Header>
                        Auctions
                    </Header>
                    <AuctionTable />
                </AuctionWrapper>
            </MainContainer>            
        </Container>
    )
}

export default Auctions