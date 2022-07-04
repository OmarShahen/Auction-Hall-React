import React, { useState, useEffect } from 'react'
import Navbar from '../../components/AuctionHall/Navbar'
import Sidebar from '../../components/AuctionHall/SideNavbar'
import styled from 'styled-components'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { auctionHallRequest, itemRequest } from '../../api/auctionHallRequest'
import { projectStorage } from '../../firebase/config'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'


const Container = styled.div`
`

const MainContainer = styled.div`
    display: flex;
`

const AuctionWrapper = styled.div`
    width: 100%;
    padding: 1rem;
`

const Header = styled.h3`
    font-weight: bold;
    padding-bottom: 2rem;
`

const ItemCondition = styled.p`
    padding: 1rem 0 0 0;
    font-weight: bold;

`

const FormContainer = styled.div`
    padding: 2rem 0;
`

const FormHeaderContainer = styled.div`
    
`

const FormHeader = styled.h2``

const AuctionFormContainer = styled.form`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-top: 5rem;

`

const LeftFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    fllex: 1;
    width: 50%
`

const RightFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    fllex: 1;
    width: 50%;
`

const InputFieldContainer = styled.div`
`

const InputField = styled.input`
    border: none;
    border-bottom: 2px solid #DCDCDC;
    border-radius: 1px;
    padding: .5rem 5rem .5rem  0;
    margin-bottom: 3rem;
    width: 80%;
    &:focus {
        outline: none;
    }
`

const SelectInputField = styled.input`
    border: none;
    border-bottom: 2px solid #DCDCDC;
    border-radius: 1px;
    padding: .5rem 5rem .5rem  0;
    margin-bottom: 3rem;
    &:focus {
        outline: none;
    }
`

const OptionInputField = styled.option``

const FormLabel = styled.label`
    font-weight: bold;
`

const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
`

const TextArea = styled.textarea`
    width: 80%;
    height: 20rem;
    border: 2px solid #DCDCDC;
    border-radius: 5px;
    margin-bottom: 1rem;
    &:focus {
        outline: none;
    }
`

const UploadBtnContainer = styled.label`
    padding: .5rem;
    background-color: dodgerblue;
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    border-radius: 5px;
    margin-bottom: 1rem;
`

const SubmitBtn = styled.input`
    padding: .5rem;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: none;
`


const AuctionForm = () => {

    const navigate = useNavigate()

    const [categories, setCategories] = useState([])

    const [itemName, setItemName] = useState()
    const [startingPrice, setStartingPrice] = useState()
    const [minimumRaise, setMinimumRaise] = useState()
    const [category, setCategory] = useState()
    const [condition, setCondition] = useState()
    const [auctionStartTime, setAuctionStartTime] = useState()
    const [auctionEndTime, setAuctionEndTime] = useState()
    const [itemDescription, setItemDescription] = useState()
    const [itemImage, setItemImage] = useState()
    const [itemImageURL, setItemImageURL] = useState()
    const [isImageLoading, setIsImageLoading] = useState(false)
    const [isFormSubmit, setIsFormSubmit] = useState(false)

    const [itemNameError, setItemNameError] = useState()
    const [startingPriceError, setStartingPriceError] = useState()
    const [minimumRaiseError, setMinimumRaiseError] = useState()
    const [categoryError, setCategoryError] = useState()
    const [conditionError, setConditionError] = useState()
    const [auctionStartTimeError, setAuctionStartTimeError] = useState()
    const [auctionEndTimeError, setAuctionEndTimeError] = useState()
    const [itemDescriptionError, setItemDescriptionError] = useState()
    const [itemImageError, setItemImageError] = useState()

    const getCategories = () => {
        return categories.map(category => {
            return <option value={category.name}>{category.name}</option>
        })
    }

    useEffect(() => {

        itemRequest.get('/categories')
        .then(response => setCategories(response.data.categories))
        .catch(error => console.error(error))

    }, [])

    const submit = (e) => {

        e.preventDefault()

        if(!itemName) {
            return setItemNameError('item name is required')
        }
        
        if(!startingPrice && !Number.isInteger(startingPrice)) {
            return setStartingPriceError('starting price is required')
        }

        if(!minimumRaise && !Number.isInteger(minimumRaise) && minimumRaise < 10) {
            return setMinimumRaiseError('minimum raise is required and must be greater than 10')
        }

        if(!itemDescription) {
            return setItemDescriptionError('item description is required')
        }

        if(!category) {
            return setCategoryError('category is required')
        }

        if(!condition) {
            return setConditionError('condition is required')
        }

        const nowDate = new Date()
        const auctionStartDate = new Date(auctionStartTime)

        if(!auctionStartTime && nowDate > auctionStartDate) {
            return setAuctionStartTimeError('auction start time is required and must pass this moment')
        }

        const auctionEndDate = new Date(auctionEndTime)
        if(!auctionEndTime && auctionEndDate > auctionStartDate) {
            return setAuctionEndTimeError('auction end time is required and must pass the auction start time')
        }

        if(!itemImageURL) {
            return setItemImageError('image is required')
        }

        const auctionHall = JSON.parse(sessionStorage.getItem('auctionhall'))

        const newAuction = {
            itemName,
            itemDescription,
            itemCategory: category,
            itemCondition: condition,
            startingPrice,
            minimumRaise,
            auctionStartTime,
            auctionEndTime,
            imageURL: itemImageURL,
            ownerID: auctionHall._id
        }

        setIsFormSubmit(true)

        auctionHallRequest.post('/create', newAuction)
        .then(response => {
            setIsFormSubmit(false)
            navigate('/auctions')
        })
        .catch(error => {
            console.error(error)
            setIsFormSubmit(false)
        })

    }

    const handleFile = e => {

        let selected = e.target.files
        const types = ['image/png', 'image/jpeg', 'image/jpg']

        if(!selected || selected.length !== 1) {
            return setItemImageError('1 image is required')
        }

        if(!types.includes(selected[0].type)) {
            return setItemImageError('please select an image (png or jpg)')
        }

        const image = selected[0]

        setItemImage(image.name)
        setIsImageLoading(true)
        const storageRef = ref(projectStorage, `auctions/${image.name}`)
        const metadata = { contentType: image.type }
        const uploadTask = uploadBytesResumable(storageRef, image, metadata)
        uploadTask.on('state_changed', snapshot => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        }, error => {
            setItemImageError(error)
            setIsImageLoading(false)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then(downloadURL => {
                setIsImageLoading(false)
                setItemImage(image.name)
                setItemImageURL(downloadURL)
            })
        })

    }

    return (
        <Container>
            <Navbar />
            <MainContainer>
                <AuctionWrapper>                    
                    <FormContainer>
                        <FormHeaderContainer>
                            <FormHeader>
                                CREATE AUCTION
                            </FormHeader>
                            <AuctionFormContainer>
                                <LeftFormContainer>
                                    <InputFieldContainer>
                                    <FormLabel>Item Name:</FormLabel><br />
                                    <ErrorMessage>{itemNameError}</ErrorMessage>
                                        <InputField type="text" placeholder="Auction Item Name" onClick={e => setItemNameError('')} onChange={e => setItemName(e.target.value)} />
                                    </InputFieldContainer>
                                    <InputFieldContainer>
                                    <FormLabel>Starting Price:</FormLabel><br />
                                    <ErrorMessage>{startingPriceError}</ErrorMessage>
                                        <InputField type="number" placeholder="Auction Starting Price" onClick={e => setStartingPriceError('')} onChange={e => setStartingPrice(e.target.value)} />
                                    </InputFieldContainer>
                                    <InputFieldContainer>
                                    <FormLabel>Minimum Raise:</FormLabel><br />
                                    <ErrorMessage>{minimumRaiseError}</ErrorMessage>
                                        <InputField type="number" placeholder="Auction Minimum Raise" onClick={e => setMinimumRaiseError('')} onChange={e => setMinimumRaise(e.target.value)} />
                                    </InputFieldContainer>
                                    <InputFieldContainer>
                                    <FormLabel>Description:</FormLabel><br />
                                    <ErrorMessage>{itemDescriptionError}</ErrorMessage>
                                    <TextArea onClick={e => setItemDescriptionError('')} onChange={e => setItemDescription(e.target.value)}>

                                    </TextArea>
                                    </InputFieldContainer>
                                </LeftFormContainer>
                                <RightFormContainer>
                                <InputFieldContainer>
                                <FormLabel>Category:</FormLabel><br />
                                <ErrorMessage>{categoryError}</ErrorMessage>
                                        <SelectInputField list="category" onClick={e => setCategoryError('')} placeholder="Item Category" onChange={e => setCategory(e.target.value)} />
                                           <datalist id="category">
                                            { getCategories() }
                                           </datalist>
                                    </InputFieldContainer>
                                    <InputFieldContainer>
                                    <FormLabel>Condition:</FormLabel><br />
                                    <ErrorMessage>{conditionError}</ErrorMessage>
                                        <SelectInputField list="condition" onClick={e => setConditionError('')}  placeholder="Item Condition" onChange={e => setCondition(e.target.value)} />
                                           <datalist id="condition">
                                            <OptionInputField value="new">new</OptionInputField>
                                            <OptionInputField value="used">used</OptionInputField>
                                           </datalist>
                                    </InputFieldContainer>
                                    <InputFieldContainer>
                                    <FormLabel>Auction Start Time:</FormLabel><br />
                                    <ErrorMessage>{auctionStartTimeError}</ErrorMessage>
                                        <InputField type="datetime-local" placeholder="Auction Start Time" onClick={e => setAuctionStartTimeError('')}  onChange={e => setAuctionStartTime(e.target.value)} />
                                    </InputFieldContainer>
                                    <InputFieldContainer>
                                    <FormLabel>Auction End Time:</FormLabel><br />
                                    <ErrorMessage>{auctionEndTimeError}</ErrorMessage>
                                        <InputField type="datetime-local" placeholder="Auction End Time" onClick={e => setAuctionEndTimeError('')}  onChange={e => setAuctionEndTime(e.target.value)} />
                                    </InputFieldContainer>
                                    <InputFieldContainer>
                                    <ErrorMessage>{itemImageError}</ErrorMessage>
                                    <FormLabel>{itemImage}</FormLabel>
                                    <UploadBtnContainer>

                                        { isImageLoading ? <TailSpin color="#FFF" height={40} width={40} />
                                         :
                                        'UPLOAD IMAGE' }
                                        
                                        <input type="file" onChange={handleFile} style={{ display: 'none' }}/>
                                    </UploadBtnContainer>
                                    </InputFieldContainer>
                                    <InputFieldContainer>
                                        <SubmitBtn type="submit" onClick={submit} className="bg-danger text-white" value="CREATE AUCTION" />
                                    </InputFieldContainer>
                                </RightFormContainer>
                            </AuctionFormContainer>
                        </FormHeaderContainer>
                    </FormContainer>
                </AuctionWrapper>
            </MainContainer>
        </Container>
    )
}

export default AuctionForm