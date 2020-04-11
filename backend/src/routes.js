const express = require('express');
const {celebrate,Segments, Joi} = require('celebrate');

const connection = require('./database/connection');

const OngController = require('./controllers/ongController');

const casoController = require('./controllers/casoController');

const profileController = require('./controllers/profileController');

const sessionController = require('./controllers/sessionController');


const routes = express.Router();


routes.get('/ongs',OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().error(new Error('Nome é obrigatorio!')),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}),OngController.create);

routes.post('/casos', casoController.create);
routes.get('/casos',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),casoController.index);


routes.delete('/casos/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),casoController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
}),profileController.index);

routes.post('/session', sessionController.create);

module.exports = routes;