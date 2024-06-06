const express = require('express');
const router = require('./routes');
const cors = require('cors');
const app = express();

const corsOPtions = {
    origin: '*'
}

app.use(cors(corsOPtions));

app.use(express.json());

app.use('/api', router);

module.exports = app;