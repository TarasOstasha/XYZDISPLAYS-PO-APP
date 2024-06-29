const createHttpError = require('http-errors');

module.exports.saveOption = async (req, res, next) => {
    const { body } = req;

    try {
        // save to DB
        // const createdOption = await Option.create(body)   
        // if (!createdOption) {
        //     return next(createHttpError(400, 'Something went wrong'));
        //   }     
        
        console.log(req.body);
        res.status(201).send({ data: body })
    } catch (error) {
        console.log(error);
        next(error);
    }
    
}