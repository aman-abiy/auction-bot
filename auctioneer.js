const puppeteer = require('puppeteer');

class Auctioneer {
    constructor(bid) {
        this.url = bid.url;
        this.bidAmount = bid.bidAmount;
        this.browser = null;
        this.page = null;
    }

    async initialize(BASE_URL) {
        this.browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            defaultViewport: {
                width: 1366,
                height: 663
            }
        });
        this.page = await this.browser.newPage();
        await this.page.setDefaultNavigationTimeout(0);
        await this.page.goto(BASE_URL);
    }

    async login(userData) {
        await this.page.waitForSelector('#apple > li:nth-child(3) > a')
        await this.page.click('#apple > li:nth-child(3) > a');
        await this.page.waitForSelector('#Email')
        await this.page.type('#Email', userData.email, { delay: 25 });
        await this.page.type('#Password', userData.password, { delay: 25 });
        await this.page.click('#loginForm > form > div:nth-child(7) > div > input')
        await this.page.evaluateOnNewDocument(
            token => {
                localStorage.clear();
                localStorage.setItem('id', 'c3b2bd6ece23f7ea3b5c599459c81648');
                localStorage.setItem('expiry', '1629637311710');
            },
        )
    }

    async bidAuction() {
        await this.page.goto(this.url)
        await this.page.waitForSelector('body > div.eupopup-container.eupopup-container-bottom.eupopup-color-default > div.eupopup-buttons > a.eupopup-button.eupopup-button_1');
        await this.page.click('body > div.eupopup-container.eupopup-container-bottom.eupopup-color-default > div.eupopup-buttons > a.eupopup-button.eupopup-button_1');
        await this.page.waitForSelector('.oa-bg-orange > input');
        const input = await this.page.$('.oa-bg-orange > input')
        await input.click({ clickCount: 3 })
        await this.page.keyboard.press('Backspace')
        await this.page.type('.oa-bg-orange > input', this.bidAmount, { delay: 100 });
        await this.page.waitForSelector('.input-group > .btn-primary');
        await this.page.click('.input-group > .btn-primary')
        await this.page.waitForSelector('.modal-footer .btn-primary')
        await this.page.click('.modal-footer .btn-primary');
    }
}

module.exports = Auctioneer;