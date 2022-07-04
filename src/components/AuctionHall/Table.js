import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components'


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

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 70
    },
    { 
        field: 'AuctionName',
        headerName: 'Auction Name',
        width: 160
    },
    { 
        field: 'HighestBid',
        headerName: 'Highest Bid',
        width: 160
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 160,
        renderCell: props =><Container><Status status={props.row.status}>{props.row.status}</Status></Container>
    },
    {
        field: 'StartDate',
        headerName: 'Start Date',
        type: 'date',
        width: 160,
    },
    {
        field: 'EndDate',
        headerName: 'End Date',
        description: 'This column has a value getter and is not sortable.',
        width: 160
    },
    {
        field: 'action',
        headerName: 'Action',
        width: 300,
        renderCell: props => {
            return <Container>
                <Button backgroundColor="rgba(0, 128, 0, 0.05)" color="#5cb85c">View</Button>
                <Button backgroundColor="rgba(255, 217, 0, 0.05)" color="#daa520">Edit</Button>
                <Button backgroundColor="rgba(255, 0, 0, 0.05)" color="#dc143c">Delete</Button>
            </Container>
        }
    }
];

const rows = [
  { id: 1, AuctionName: 'Snow', HighestBid: 2000, status: 'UPCOMING', StartDate: '2022-6-6', EndDate: '2022-6-12' },
  { id: 2, AuctionName: 'Lannister', HighestBid: 1000, status: 'ACTIVE', StartDate: '2022-6-6', EndDate: '2022-6-12' },
  { id: 3, AuctionName: 'Lannister', HighestBid: 2000, status: 'ACTIVE', StartDate: '2022-6-6', EndDate: '2022-6-12' },
  { id: 4, AuctionName: 'Stark', HighestBid: 3000, status: 'SOLD', StartDate: '2022-6-6', EndDate: '2022-6-12' },
  { id: 5, AuctionName: 'Targaryen', HighestBid: 12000, status: 'SOLD', StartDate: '2022-6-6', EndDate: '2022-6-12' },
  { id: 6, AuctionName: 'Melisandre', HighestBid: 18000, status: 'SOLD', StartDate: '2022-6-6', EndDate: '2022-6-12' },
  { id: 7, AuctionName: 'Clifford', HighestBid: 40000, status: 'SOLD', StartDate: '2022-6-6', EndDate: '2022-6-12' },
  { id: 8, AuctionName: 'Frances', HighestBid: 30000, status: 'SOLD', StartDate: '2022-6-6', EndDate: '2022-6-12' },
  { id: 9, AuctionName: 'Roxie', HighestBid: 22000, status: 'SOLD', StartDate: '2022-6-6', EndDate: '2022-6-12' },
];

export default function DataTable() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
      />
    </div>
  );
}
