import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import MaterialTable from 'material-table'
import TableIcons from './TableIcons'
import AccountBalanceIcon  from '@material-ui/icons/AccountBalance'
import { auctionHallRequest } from '../api/auctionHallRequest'
import { socket } from '../sockets/socket'

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`
const Status = styled.span`
    color: ${props => props.sold === 'SOLD' ? '#dc143c' : '#5bc0de'};
`

const Button = styled.button`
    padding: .3rem .8rem;
    margin: 0 .5rem;
    border: none;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
    border-radius: 5px;
`

const Text = styled.span`
    font-weight: bold;
    color: dodgerblue;
`

const AuctionTable = () => {

    const [bids, setBids] = useState([])
    const [loading, setLoading] = useState(true)

    const formateBidsData = (auctionBids) => {

        for(let i=0;i<auctionBids.length;i++) {
            auctionBids[i].firstName = auctionBids[i].bidder.firstName
            auctionBids[i].lastName = auctionBids[i].bidder.lastName
            auctionBids[i].email = auctionBids[i].bidder.email
            auctionBids[i].date = formateDate(auctionBids[i].date)
            auctionBids[i].imageURL = `https://avatars.dicebear.com/api/initials/${auctionBids[i].firstName + ' ' + auctionBids[i].lastName }.svg`
        }

        return auctionBids
    }

    const formateDate = (auctionDate) => {
        const newDate = new Date(auctionDate)

        return `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()} ${newDate.getHours() + 1}:${newDate.getMinutes()}:${newDate.getSeconds()}`
    }

    useEffect(() => {

        const auctionID = window.location.pathname.split('/')[2]

        auctionHallRequest.get(`/auctions/${auctionID}`)
        .then(response => {

            setBids(formateBidsData(response.data.bids))
            setLoading(false)
        })
        .catch(error => {
            console.error(error)
            setLoading(false)
        })
        
    }, [loading])

    useEffect(() => {

        const auctionID = window.location.pathname.split('/')[2]

        //socket.on('connection-check', response => console.log(response))

        //socket.on('join-auction-error', response => console.log(response))

        socket.emit('join-auction', { auctionID: auctionID })

        //socket.on('join-auction-success', response => console.log(response))

        socket.on('bid-success', response => setLoading(true))
    }, [])


    const columns = [
        { title: 'Image', field: 'imageURL', render: rowData => <img src={rowData.imageURL} style={{ width: 40, borderRadius: '50%'}} /> },
        { title: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },
        { title: 'E-mail', field: 'email' },
        { title: 'Bid Value', field: 'value' },
        { title: 'Bid Date', field: 'date' }
    ]

    return <div>
        <MaterialTable 
        title="Bids" 
        isLoading={loading}
        icons={TableIcons}
        data={bids}
        columns={columns}
        options={{ pageSize: 10 }}
        actions={[
            {
                icon: TableIcons.Refresh,
                tooltip: 'Reload Auction',
                onClick: e => setLoading(true),
                isFreeAction: true
            }
        ]}
        />
    </div>
}

export default AuctionTable