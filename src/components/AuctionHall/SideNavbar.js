import React from 'react'
import styled from 'styled-components'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded'
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import { NavLink } from 'react-router-dom'


const Container = styled.div`
  position: sticky;
  top: 0;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 13rem;
  height: 100vh;
  padding-top: 1rem;
  

`

const IconContainer = styled.div`
    padding: 1.5rem .5rem;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    transition: all .5s ease;
    &:hover {
        color: dodgerblue;
    }

`

const IconText = styled.span`
    padding: 0 .5rem;
`
const SideNavbar = () => {
    return (
        <Container>
            <IconContainer>
                <NavLink to="/auctions">
                    <GavelRoundedIcon />
                    <IconText>Auctions</IconText>
                </NavLink>
            </IconContainer>
            <IconContainer>
                    <QueryStatsRoundedIcon />
                    <IconText>Create Auction</IconText>
            </IconContainer>
            <IconContainer>
                <NavLink to="/login" onClick={e => {
                    sessionStorage.removeItem('auctionhall')
                    sessionStorage.removeItem('token')
                }}>
                    <ExitToAppRoundedIcon />
                    <IconText>
                        Logout
                    </IconText>
                </NavLink>
            </IconContainer>
        </Container>
    )
}

export default SideNavbar