import React from 'react'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem 3rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 100vw;
`

const LogoutBtn = styled.button`
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    background-color: red;
    border: none;
    border-radius: 5px;
    padding: .1rem .5rem;
    ${mobile({
        padding: '.5rem 1rem',
        width: '5rem',
        height: '2rem'
})}
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
    ${mobile({
        display: 'none'
    })}
`

const Navbar = () => {

    const auctionHall = JSON.parse(localStorage.getItem('auctionhall'))

    const navigate = useNavigate()

    return (<Container>
        <LogoutBtn onClick={ e => {
            navigate('/login')
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }}>
            LOGOUT
        </LogoutBtn>
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