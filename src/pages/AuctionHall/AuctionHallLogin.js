import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AccountBalanceIcon  from '@material-ui/icons/AccountBalance'
import { mobile } from '../../responsive'
import { useNavigate } from 'react-router-dom'
import { authRequest } from '../../api/auctionHallRequest'
import { TailSpin } from 'react-loader-spinner'


const Container = styled.div`
    display: flex;
    background-color: #E5E5E5;
    height: 100vh;
`

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const FormWrapper = styled.div`
    width: 90%;
    display: flex;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    
`

const FormInputsContainer = styled.div`
    flex-grow: 1;
    padding: 3rem 5rem;
`

const FormImageContainer = styled.div`
    flex-grow:2;
    background-color: black;
    display: flex;
    justify-content: center;
    background-image: url("https://images.unsplash.com/photo-1493841160601-33a4807cb6de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80");
    background-repeat: no-repeat;
    background-size: cover;
    ${mobile({display: 'none'})}
`


const ImageWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 5px;
    object-fit: cover;
    
`

const ImageHeader = styled.h3`
    font-size: 3rem;
    padding-top: 7rem;
`


const ImageText = styled.span`
    font-weight: 300;
`

const CompanyName = styled.h2`
    font-weight: bold;
    padding-bottom: 3rem;
    ${mobile({textAlign: "center"})}
`

const Header = styled.h4`
    text-align: center;
    padding-top: 3rem;
`

const IconContainer = styled.div`
    text-align: center;
    
`

const InputsContainer = styled.div`
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
`
const FormInputs = styled.div`
    display: flex;
    flex-direction: column;
`
const Label = styled.label`
    color: #8c8c8c;
`

const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
`


const Input = styled.input`
    border: none;
    border-bottom: 1px solid #8c8c8c;
    &:focus {
        outline: none;
    }
`

const SubmitBtn = styled.button`
    color: white;
    background-color: black;
    border: none;
    padding: .5rem;
    margin: 2rem 0;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AuctionHallLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()


    const submit = (e) => {

        e.preventDefault()

        if(!email) {
            return setEmailError('email is required')
        }

        if(!password) {
            return setPasswordError('password is required')
        }

        setLoading(true)

        authRequest.post('/users/auctionhall/login', { email, password })
        .then(response => {
            setLoading(false)

            sessionStorage.setItem('auctionhall', JSON.stringify(response.data.auctionHall))
            sessionStorage.setItem('token', JSON.stringify(response.data.token))

            navigate('/auctions')

        })
        .catch(error => {
            setLoading(false)
            const field = error.response.data.field

            if(field === 'email') {
                return setEmailError(error.response.data.message)
            }

            if(field === 'password') {
                return setPasswordError(error.response.data.message)
            }
        })
    }



    return (
        <Container>
            <FormContainer>
                <FormWrapper>
                    <FormInputsContainer>
                        <CompanyName>
                            Auction
                        </CompanyName>
                        <IconContainer>
                            <AccountBalanceIcon style={{ fontSize: '4rem' }} />
                        </IconContainer>
                        <Header>
                            Auction Hall Login
                        </Header>
                        
                        <FormInputs>
                            <InputsContainer>
                                <Label>Email</Label>
                                <ErrorMessage>{emailError}</ErrorMessage>
                                <Input type="email" onChange={e => {
                                    setEmail(e.target.value)
                                    setEmailError('')
                                }} ></Input>
                            </InputsContainer>
                            <InputsContainer>
                                <Label>Password</Label>
                                <ErrorMessage>{passwordError}</ErrorMessage>
                                <Input type="password" onChange={e =>{
                                    setPassword(e.target.value)
                                    setPasswordError('')
                                }} ></Input>
                            </InputsContainer>
                            <SubmitBtn onClick={submit}>
                                { loading ? <TailSpin width={30} height={30} color='#FFF' /> : 'LOGIN' }
                            </SubmitBtn>
                        </FormInputs>
                    </FormInputsContainer>
                    <FormImageContainer>
                        <ImageWrapper>
                            <ImageHeader>
                                New Oppurtunities To Grow
                            </ImageHeader>
                            <ImageText>
                                A new way to manage your valuable items and sell it to the right bidder.
                            </ImageText>
                        </ImageWrapper>
                    </FormImageContainer>
                </FormWrapper>
            </FormContainer>
        </Container>
    )
}

export default AuctionHallLogin