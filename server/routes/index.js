const { Router } = require('express');

const orderRouter = require('./orderRouter');
const productRouter = require('./productRouter');
const optionRouter = require('./optionRouter');



const router = Router();

// api
router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/option', optionRouter);

module.exports = router;




