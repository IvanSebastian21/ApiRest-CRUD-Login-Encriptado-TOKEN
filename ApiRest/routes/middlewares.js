//Middlewares: Funcion antes que se gestionen cualquiera de las rutas.
//Para todo aquellos que se quieran comunicar con mi aplicion lo obligamos a que lo pasen a traves de las cabaceras.
const jwt = require('jwt-simple');
const moment = require('moment');

//Hacemos comprobaciones
const checkToken = (req, res, next) => {

    if (!req.headers['user-token']) {
        return res.json({ error: 'Necesitas incluir el user-token en la cabecera' });
    }

    const userToken = req.headers['user-token'];
    //Intentamos desencriptarlo
    let payload = {};

    try {
        payload = jwt.decode(userToken, 'frase-secreta');
    } catch (err) {
        return res.json({ error: 'El token es incorrecto' });
    }
    if (payload.expiredAt < moment().unix()) {
        return res.json({ error: 'El token ha expirado' });
    }

    req.usuarioId = payload.usuarioId;

    next();
}

module.exports = {
    checkToken: checkToken
}