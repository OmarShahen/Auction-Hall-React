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
    margin: 1rem 0;
    
`

const Header = styled.h3`
    font-weight: bold;
    padding-bottom: 2rem;
`


const Auctions = () => {

    const [authorized, setAuthorized] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {

        const accessToken = JSON.parse(localStorage.getItem('token'))

        if(!accessToken) {
        setAuthorized(false)
        navigate('/login')
        return 
        }

    setAuthorized(true)

    }, [authorized])

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
            { authorized
                ?
                <div>
                    <Navbar />
                        <MainContainer>
                            
                            <AuctionWrapper>
                                <AuctionTable />
                            </AuctionWrapper>
                        </MainContainer>            
                </div>
                :
                null
            }
        </Container>
    )
}

export default Auctions