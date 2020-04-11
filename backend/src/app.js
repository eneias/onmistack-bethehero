const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const {errors} = require('celebrate');

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);
//app.use(errors());

app.use((error, req, res, next) => {

    let statusCode = error.statusCode || 422;

    if (error.joi) {

        return res.status(statusCode).json( {
            message: error.joi.message,
            detail: error.joi.details
        });
    }
  
    return res.status(statusCode).send(error);
});

module.exports = app;