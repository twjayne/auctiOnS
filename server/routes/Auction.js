import express from 'express';
import queries from '../db/queries';
const router = express.Router();

router.post('/register', async (req, res) => {
    let d = {'op': 'register', 'success': true ,'server_id': 0}
    try {
        await queries.Auction.register(req.body.username)
        res.json(d)
    }
    catch(e) {
        console.log(e)
        d.success = false
        res.json(d)
    }
})
router.get('/getItemInfo', async (req, res) => {
    try {
        const data = await queries.Auction.getItemInfo()

        res.json(data[0])
    }
    catch(e) {
        console.log(e)
    }
})
router.get('/getLogs', async (req, res) => {
    try {
        const data = await queries.Auction.getLogs()
        res.json(data)
    }
    catch(e) {
        console.log(e)
    }
})
router.post('/bidding', async (req, res) => {
    //{'username' : string , 'current_price' : string, 'num_mi' : string}
    const name = req.body.username
    const current_price = req.body.current_price
    const num_mi = req.body.num_mi

    try {
        const d = await queries.Auction.bidding(name, current_price, num_mi)
        res.json(d)
    }
    catch (e) {
        console.log(e)
        res.json(e)
    }
})

module.exports = router;
