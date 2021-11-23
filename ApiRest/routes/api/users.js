//Creamos un manejador de rutas para Users.
//La password la vamos a encriptar con el modulo "bcryptjs"
//Y haremos validaciones con el modulo de "express-validator"
//Token y autenticacion "con jwt-simple"

const router = require('express').Router();
const bcrytp = require('bcryptjs');
const { User } = require('../../db');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');

//Antes de guardar el usuario en la db, encriptamos la password para que ya se guarde encriptada.
router.post('/register', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El mail debe ser correcto').isEmail()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }

    req.body.password = bcrytp.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.json(user);

});


//comprobamos los datos del Usuario
router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });//Recuperamos el usuario
    if (user) {//Si el usuario existe en nuestra db
        const iguales = bcrytp.compareSync(req.body.password, user.password);//Comprobamos si las pass coinciden.
        if (iguales) {//Si el login es correcto.
            res.json({ success: createToken(user) }); //Llamamos y le pasamos el usuario para que lo encripte...
        } else {
            res.json({ error: 'Error de usuario y/o contraseña' });
        }
    } else {
        res.json({ error: 'Error de usuario y/o contraseña' });
    }
});


const createToken = (user) => {
    const payload = {
        //Codifico dentro del TOKEN que voy a enviar al usuario cuando el login sea correcto.
        //Encapsulo la información que quiero
        usuarioId: user.id,
        createdAt: moment().unix(),//Para ver cuando se ha creado el TOKEN
        expiredAt: moment().add(5, 'minutes').unix()
    }

    return jwt.encode(payload, 'frase secreta');
    //Los JWT se utilizan para autenticar a los usuarios, para ello, el usuario requiere de un login tradicional como es el usuario y password. Una vez, que el sistema de Backend valida que el usuario y contraseña son correctos, este retorna un token al usuario. El primer parametro es el objeto que quiero encriptar, el segundo la "frase secreta"
}

module.exports = router;

/*Notas:
    En node.js, la interfaz randomBytes (Ej: Linea 22 col 60) del módulo criptográfico incorporado se utiliza para obtener números aleatorios seguros.
    Enlace: https://www.npmjs.com/package/bcryptjs;

    Metodo check y validatorResult: Comprueba los diferentes datos que estoy insertando en la ruta con la que estoy trabajando, funciona como un middlewares (funciones de validación, comparacion o informar cualquier tipo de error/es)
    Enlace: https://express-validator.github.io/docs/

    Utilizo el modulo jwt-simple como Middleware de codificación y decodificación. Es una biblioteca criptográfica de JavaScript. La usamos para transmitir información con la identidad y claims de un usuario de forma segura entre un cliente/servidor.
    Enlace: https://content.breatheco.de/es/lesson/what-is-JWT-and-how-to-implement-with-Flask

    Utilizo el modulo "moment" para el manejo de las fechas de creación
    Enlace: https://www.oscarlijo.com/blog/aprende-a-usar-moment-js/
*/