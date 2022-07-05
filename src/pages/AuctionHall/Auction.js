import React, { useState, useEffect } from 'react'
import Navbar from '../../components/AuctionHall/Navbar'
import Sidebar from '../../components/AuctionHall/SideNavbar'
import styled from 'styled-components'
import { display } from '@mui/system'
import violinImage from '../../images/violin.jpg'
import DataTable from '../../components/AuctionHall/BidsTable'
import AuctionTable from '../../tables/Auction'
import Item from '../../components/AuctionHall/Item'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../sockets/socket'

const Container = styled.div`
 background-color: #fffbff;
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

const ItemCondition = styled.p`
    padding: 1rem 0 0 0;
    font-weight: bold;

`

const BidsContainer = styled.div`
    padding: .8rem;
    background-color: #DCDCDC;
    border-radius: 5px;
    margin: 1rem;
`

const Auction = () => {

    const navigate = useNavigate()

    const [authorized, setAuthorized] = useState(false)
    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('token'))

        if(!token) {
            setAuthorized(false)
            navigate('/login')

            return
        }

        setAuthorized(true)

    }, [])


    return(
        <Container>
            {
                authorized
                ?
                <div>
                    <Navbar />
            <MainContainer>
                <AuctionWrapper>                    
                    <BidsContainer>
                        <AuctionTable />
                    </BidsContainer>
                </AuctionWrapper>
            </MainContainer>
                </div>
                :
                null
            }

        </Container>
    )
}

export default Auction