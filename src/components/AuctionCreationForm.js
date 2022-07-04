import React from 'react'
import '../styles/auction-creation-form.css'

const AuctionCreationForm = () => {

    return (
        <div className="auction-creation-form">
            <div className="form-header">
                <h2>
                    Create an <span>Auction</span> in 3 minutes
                </h2>
            </div>
            <form>
                    <div>
                        <input type="text" id="auction-name-field" placeholder="Auction Name"/>
                    </div>
                    <div>
                        <input type="date" id="auction-start-time-field" placeholder="Auction Start Time"/>
                    </div>
                    <div>
                        <input type="date" id="auction-end-time-field" placeholder="Auction End Time"/>
                    </div>
                    <div>
                        <input type="number" id="auction-starting-price-field" placeholder="Auction Starting Price"/>
                    </div>
                    <div>
                        <input type="number" id="auction-bidding-value-field" placeholder="Auction Bidding Value"/>
                    </div>
                    <div className="submit-btn">
                        <input type="submit" value="CREATE AUCTION" />
                    </div>
            </form>
        </div>
    )
}

export default AuctionCreationForm