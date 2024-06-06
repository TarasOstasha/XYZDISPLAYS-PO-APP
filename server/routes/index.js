const { Router } = require('express');

const orderRouter = require('./orderRouter');
const productRouter = require('./productRouter');



const router = Router();

// api
router.use('/orders', orderRouter);
router.use('/products', productRouter);

module.exports = router;




