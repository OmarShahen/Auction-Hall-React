import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import styled from 'styled-components'
import { auctionHallRequest } from '../api/auctionHallRequest'
import { NavLink, useNavigate } from 'react-router-dom'

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`

const Status = styled.span`
    color: ${props => {
        if(props.status === 'SOLD') {
            return '#d9534f'
        } else if(props.status === 'ACTIVE') {
            return '#5cb85c'
        } else {
            return '#5bc0de'
        }
    }};

`

const Button = styled.button`
    padding: .3rem .8rem;
    margin: 0 .5rem;
    border: none;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
    border-radius: 5px;
`




const AuctionsTable = () => {

    const navigate = useNavigate()

    const [auctions, setAuctions] = useState([])
    const [loading, setLoading] = useState(true)

    const [startingPriceError, setStartingPriceError] = useState('')
    const [minimumRaiseError, setMinimumRaiseError] = useState('')
    const [auctionStartTimeError, setAuctionStartTimeError] = useState('')
    const [auctionEndTimeError, setAuctionEndTimeError] = useState('')

    const checkStartingPrice = (startingPrice) => {
        //setStartingPriceError('')

        if(!startingPrice) {
            setStartingPriceError('starting price is required')
            return false
        }

        if(!Number.isInteger(startingPrice)) {
            setStartingPriceError('starting price must be integer')
            return false
        }

        if(startingPrice < 10) {
            setStartingPriceError('starting price is must be greater than 10')
            return false
        }

        return true
    }

    const checkMinimumRaise = (minimumRaise) => {

        //setMinimumRaiseError('')

        if(!minimumRaise) {
            setMinimumRaiseError('minimum raise is required')
            return false
        }

        if(!Number.isInteger(minimumRaise)) {
            setMinimumRaiseError('minimum raise must be a number')
            return false
        }

        if(minimumRaise < 1) {
            setMinimumRaiseError('minimum raise too low')
            return false
        }

        return true
    }

    const checkAuctionStartTime = (auctionStartTime) => {

        //setAuctionStartTimeError('')

        try {

            if(!auctionStartTime) {
                setAuctionStartTimeError('auction start time is required')
                return false
            }

            const date = new Date(auctionStartTime)

            if(Date.now() > date - 3600000) {
                setAuctionStartTimeError('auction start time has already passed')
                return false
            }

        } catch(error) {
            console.error(error)
            setAuctionStartTimeError('auction start time is invalid')
            return false
        }

        return true
    }

    const checkAuctionEndTime = (auctionEndTime, auctionStartTime) => {

        //setAuctionEndTimeError('')

        try {

            if(!auctionEndTime) {
                setAuctionEndTimeError('auction end time is required')
                return false
            }

            const date = new Date(auctionEndTime)

            if(date < auctionStartTime) {
                setAuctionEndTimeError('auction end time is before auction start time')
                return false
            }

        } catch(error) {
            console.error(error)
            setAuctionEndTimeError('auction end time is invalid')
            return false
        }

        return true
    }

    const columns = [
        { 
            field: 'itemName',
            title: 'Item Name',
            width: 400,
            editable: 'never'
        },
        { 
            field: 'currentPrice',
            title: 'Current Price',
            editable: 'never'
        },
        {
            field: 'startingPrice',
            title: 'Starting Price',
            //validate: rowData => checkStartingPrice(rowData.startingPrice) ? '' : startingPriceError
        },
        {
            field: 'minimumRaise',
            title: 'Minimum Raise',
            //validate: rowData => checkMinimumRaise(rowData.minimumRaise) ? '' : minimumRaiseError
        },
        {
            field: 'auctionStartTime',
            title: 'Start Date',
            type: 'date',
            //validate: rowData => checkAuctionStartTime(rowData.auctionStartTime) ? '' : auctionStartTimeError
        },
        {
            field: 'auctionEndTime',
            title: 'End Date',
            //validate: rowData => checkAuctionEndTime(rowData.auctionEndTime) ? '' : auctionEndTimeError
        },
        {
            title: 'View Auction',
            editable: 'never',
            render: prop => <NavLink to={`/auction/${prop._id}`}>
                    <button className="view-auction-btn" >view</button>
                </NavLink>
        }
        
    ]




    const formateAuctionData = (auctions) => {

        for(let i=0;i<auctions.length;i++) {
            auctions[i].itemName = formateItemName(auctions[i].item.name)
            auctions[i].auctionStartTime = formateDate(auctions[i].auctionStartTime)
            auctions[i].auctionEndTime = formateDate(auctions[i].auctionEndTime)
        }

        return auctions
    }

    const formateItemName = (name) => {
        if(name.length > 30) {
            let newName = ''

            for(let i=0;i<25;i++) {
                newName += name[i]
            }

            return newName + '...'

        } else {
            return name
        }
    }

    const formateDate = (auctionDate) => {
        const newDate = new Date(auctionDate)

        return `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()} ${newDate.getHours() + 1}:${newDate.getMinutes()}:${newDate.getSeconds()}`
    }

    const deleteAuction = async (auction) => {

        auctionHallRequest.delete(`${auction._id}`)
        .then(response => setLoading(true))
        .catch(error => {
            console.log(error)
            setLoading(true)
        })
    }

    const updateAuction = async (newAuction, oldAuction) => {

        const newAuctionData = {
            startingPrice: newAuction.startingPrice,
            minimumRaise: newAuction.minimumRaise,
            auctionStartTime: newAuction.auctionStartTime,
            auctionEndTime: newAuction.auctionEndTime
        }

        auctionHallRequest.put(`${newAuction._id}`, newAuctionData)
        .then(data => setLoading(true))
        .catch(error => {
            console.log(error.response.data)
            setLoading(true)
        })
    }

    useEffect(() => {

        const auctionHall = JSON.parse(localStorage.getItem('auctionhall'))

        auctionHallRequest.get(`/get-owner-auctions/${auctionHall._id}`)
        .then(response => {
            const auctions = formateAuctionData(response.data.ownerAuctions)
            setAuctions(auctions)
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
        })
    }, [loading])

    return (
        <div>
            <MaterialTable
             title='Auctions'
             isLoading={loading}
             icons={TableIcons} 
             columns={columns} 
             data={auctions}
             editable={{
                onRowDelete: deleteAuction,
                onRowUpdate: updateAuction
             }}
             options={
                 { pageSize: 10 }
             }

             actions={[
                {
                    icon: TableIcons.Add,
                    tooltip: 'Create Auction',
                    onClick: e => navigate('/create-auction'),
                    isFreeAction: true
                },
                {
                    icon: TableIcons.Refresh,
                    tooltip: 'Reload Auction',
                    onClick: e => setLoading(true),
                    isFreeAction: true
                }
             ]}
             
             />
        </div>
    )
}

export default AuctionsTable