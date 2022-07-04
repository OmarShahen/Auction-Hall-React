import React from 'react'
import styled from 'styled-components'
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem 3rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 100%;
`

const AuctionHallName = styled.span`
    font-weight: bold;
    font-size: 1.2rem;
    color: #00008b;
`

const IconTabsContainer = styled.div`
    display: flex;
`

const IconContainer = styled.div`
    padding: 0 1em;
`

const NameImage = styled.img`
    width: 40px;
    border-radius: 50%;
`

const NameTag = styled.p`
    padding-top: .5rem;
`

const Navbar = () => {

    const auctionHall = JSON.parse(sessionStorage.getItem('auctionhall'))

    return (<Container>
        <AuctionHallName>
            App Name
        </AuctionHallName>
        <IconTabsContainer>
        <IconContainer>
            <NameTag>{auctionHall.firstName + ' ' + auctionHall.lastName}</NameTag>
        </IconContainer>
        <IconContainer>
            <NameImage src={`https://avatars.dicebear.com/api/initials/${auctionHall.firstName + ' ' + auctionHall.lastName}.svg`} />
        </IconContainer>
        </IconTabsContainer>
    </Container>)
}

export default Navbar 