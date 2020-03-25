const express = require('express');
const connection = require('./database/connection');

const OngController = require('./controllers/ongController');

const casoController = require('./controllers/casoController');

const profileController = require('./controllers/profileController');

const sessionController = require('./controllers/sessionController');


const routes = express.Router();


routes.get('/ongs',OngController.index);
routes.post('/ongs',OngController.create);

routes.post('/casos',casoController.create);
routes.get('/casos',casoController.index);
routes.delete('/casos/:id',casoController.delete);

routes.get('/profile', profileController.index);

routes.post('/session', sessionController.create);

module.exports = routes;