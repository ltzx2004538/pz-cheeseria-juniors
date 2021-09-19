import * as express from 'express';
import {OrderServiceImpl} from './service/order';

const cheeses = require('./data/cheeses.json');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json()

const orderService = new OrderServiceImpl();

router.get('/api/cheeses', (req, res, next) => {
	res.json(cheeses);
});

router.get('/api/orders', (req, res) => {
	res.json(orderService.getOrders());
});

router.post('/api/orders', jsonParser, (req,res) => {
	const {items,amount} = req.body;
	const result = orderService.addOrder(items,amount);
	res.json(result);
});
export default router;