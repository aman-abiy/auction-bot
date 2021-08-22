let Auctioneer = require('./auctioneer');

let bids = [{
    url: 'https://online-auction.state.gov/en-US/Auction/Lot/e3d0392c-41b6-4ea7-b8ff-14ddaf00aad0?auctionId=f9be06eb-173e-49b3-a731-fa2e2575b680&returnToAuctionUrl=%2Fen-US%2FAuction%2FIndex%2Ff9be06eb-173e-49b3-a731-fa2e2575b680',
    bidAmount: '39.000'
}];

let BASE_URL = 'https://online-auction.state.gov/en-US';

let userData = {
    email: 'ytrfghbytrfghb@gmail.com',
    password: '0961138866Amex'
};

(async() => {
    const auctioneer = new Auctioneer(bids[0])
    await auctioneer.initialize(BASE_URL)
    await auctioneer.login(userData)
    await auctioneer.bidAuction()
})()