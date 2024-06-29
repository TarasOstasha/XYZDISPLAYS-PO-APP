const { Router } = require('express');
const { optionController } = require('../controllers');
//const { paginate, upload } = require('../middleware');

// api/option
const optionRouter = Router();

optionRouter
  .route('/')
  //.get(orderController.getOrders)
  .post(optionController.saveOption)


// orderRouter
//   .route('/:id')
//   .get(orderController.getOrderById)



module.exports = optionRouter;