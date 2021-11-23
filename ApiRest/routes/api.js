//Generador de las rutas
//Manejador de rutas

const router = require('express').Router();

const middleware = require('./middlewares');
const apiFilmsRouter = require('./api/films');
const apiUsersRouter = require('./api/users');


//En el flujo de '/films' vamos a requerir el middlewares de autenticacion.
router.use('/films', middleware.checkToken, apiFilmsRouter);
//Todas las rutas que vengan con '/films' lo mandamos al gestor de rutas apiFilmsRouter
//Importante: Todas las rutas que ingresen a este fichero ya viene con el prefijo '/api'
//Entonces ---> Todas las rutas que mandamos a la apiFilmsRouter ya tendran el prefijo '/api/films'
router.use('/users', apiUsersRouter);

module.exports = router;


