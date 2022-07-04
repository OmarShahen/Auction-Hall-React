import React from 'react'
import Navbar from '../../components/AuctionHall/Navbar'
import SideNavbar from '../../components/AuctionHall/SideNavbar'
import styled from 'styled-components'
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import SellRoundedIcon from '@mui/icons-material/SellRounded'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded'
import Table from '../../components/AuctionHall/Table'
import AuctionList from '../../components/AuctionHall/AuctionList'



const Container = styled.div``

const DashboardContainer = styled.div`
    display: flex;
`

const DashboardStatesWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    padding: 5rem 0;
    flex-wrap: wrap;    
`

const StatCardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 1rem 1rem 1rem 1rem;
    gap: 5rem;
    border-radius: 10px;
    margin: 1rem;
`

const StateCardNumberColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const StateCardIndicatorsColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`

const IndicatorNumber = styled.span`
    color: green;
    font-size: 1.5rem;
`

const CardIcon = styled.div`
    display: flex;
    justify-content: flex-end;
`

const StatCardHeader = styled.span`
    font-weight: bold;
    color: #A0A0A0;
`

const StateCardNumber = styled.span`
    font-size: 2rem;
    font-weight: 300;
`

const StateCardViewList = styled.span`
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
        color: dodgerblue;
    }
`


const Stats = () => {
    return (
        <Container>
            <Navbar />
            <DashboardContainer>
                <SideNavbar />
                <DashboardStatesWrapper>
                    <StatCardWrapper>
                        <StateCardNumberColumn>
                            <StatCardHeader>
                                ITEMS
                            </StatCardHeader>
                            <StateCardNumber>
                                100
                            </StateCardNumber>
                            <StateCardViewList>
                                View all items
                            </StateCardViewList>
                        </StateCardNumberColumn>
                        <StateCardIndicatorsColumn>
                            <IndicatorNumber>
                                <ArrowDropUpRoundedIcon />
                                20%
                            </IndicatorNumber>
                            <CardIcon>
                                <Inventory2RoundedIcon />
                            </CardIcon>
                        </StateCardIndicatorsColumn>
                    </StatCardWrapper>
                    <StatCardWrapper>
                        <StateCardNumberColumn>
                            <StatCardHeader>
                                SOLD ITEMS
                            </StatCardHeader>
                            <StateCardNumber>
                                25
                            </StateCardNumber>
                            <StateCardViewList>
                                View all sold items
                            </StateCardViewList>
                        </StateCardNumberColumn>
                        <StateCardIndicatorsColumn>
                            <IndicatorNumber>
                                <ArrowDropUpRoundedIcon />
                                10%
                            </IndicatorNumber>
                            <CardIcon>
                                <SellRoundedIcon />
                            </CardIcon>
                        </StateCardIndicatorsColumn>
                    </StatCardWrapper>
                    <StatCardWrapper>
                        <StateCardNumberColumn>
                            <StatCardHeader>
                                ACTIVE AUCTIONS
                            </StatCardHeader>
                            <StateCardNumber>
                                2
                            </StateCardNumber>
                            <StateCardViewList>
                                View all auctions
                            </StateCardViewList>
                        </StateCardNumberColumn>
                        <StateCardIndicatorsColumn>
                            <IndicatorNumber>
                                <ArrowDropUpRoundedIcon />
                                20%
                            </IndicatorNumber>
                            <CardIcon>
                                <GavelRoundedIcon />
                            </CardIcon>
                        </StateCardIndicatorsColumn>
                    </StatCardWrapper>
                </DashboardStatesWrapper>
                
            </DashboardContainer>
        </Container>
    )
}

export default Stats