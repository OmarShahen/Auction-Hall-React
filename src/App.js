
import Stats from './pages/AuctionHall/Stats'
import Auctions from './pages/AuctionHall/Auctions'
import Auction from './pages/AuctionHall/Auction'
import AuctionHallLogin from './pages/AuctionHall/AuctionHallLogin'
import AuctionForm from './pages/AuctionHall/AuctionForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auctions" element={<Auctions />}/>
        <Route path='/create-auction' element={<AuctionForm />} />
        <Route path='/auction/:auctionID' element={<Auction />} />
        <Route path='/login' element={<AuctionHallLogin />} />
        <Route path='/' element={<AuctionHallLogin />} />
      </Routes>
    </Router>
  ); 
}

export default App;
