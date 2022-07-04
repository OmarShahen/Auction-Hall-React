import axios from 'axios'

export const auctionHallRequest = axios.create({
    baseURL: 'http://159.223.172.150/api/auction-service'
})

export const itemRequest = axios.create({
    baseURL: 'http://159.223.172.150/api/item-service'
})

export const authRequest = axios.create({
    baseURL: 'http://159.223.172.150/api/auth-service'
})
