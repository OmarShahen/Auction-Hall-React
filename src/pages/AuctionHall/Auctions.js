import React, { useState, useEffect } from 'react'
import Navbar from '../../components/AuctionHall/Navbar'
import Sidebar from '../../components/AuctionHall/SideNavbar'
import styled from 'styled-components'
import AuctionTable from '../../tables/AuctionsTable'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    width: 100%;
`

const MainContainer = styled.div`
    display: flex;
    
`

const AuctionWrapper = styled.div`
    width: 100%;
    padding: .8rem;
    background-color: #DCDCDC;
    border-radius: 5px;
    margin: 1rem;
    
`

const Header = styled.h3`
    font-weight: bold;
    padding-bottom: 2rem;
`


const Auctions = () => {

    /*const navigate = useNavigate()

    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {

        const token = JSON.parse(sessionStorage.getItem('token'))

        console.log(token)

        if(!token) {
            setAuthorized(false)
            navigate('/login')
            return 
        }

        setAuthorized(true)
    }, [authorized])*/


    return (
        <Container>
            <Navbar />
            <MainContainer>
                
                <AuctionWrapper>
                    <AuctionTable />
                </AuctionWrapper>
            </MainContainer>            
        </Container>
    )
}

export default Auctions