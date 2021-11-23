# ApiRest. Metodologias del tipo CRUD + Login + Token
En esta oportunidad aborde la creación de una Api Rest usando un stack de herramientas como NodeJS para poder manejar mi servidor. ExpressJS para desarrollar toda la lógica del lado del servidor. MySQL 
para la creacion de mi base de datos. El uso de Sequelize como ORM para poder generar las tablas y la interacción con las mismas dentro de la base de datos y un stack de librerías para la creacion, verificación y autenticación del login de mis usuarios y por ultimo la creación de un TOKEN de seguridad para controlar y determinar el contenido al que puede acceder cada usuario. 

## Acompañame y veamos como abordar este nuevo desafio :muscle:
 
Primero y principal. Definimos las rutas.
>GET /api/films - recupera todas las peliculas  
POST /api/films - crea una pelicula  
PUT /api/films/4 - edita la pelicula 4  
DELETE /api/films/4 - borra la pelicula 4

Sequalize permite crear modelos de una tabla con los siguientes campos en nuestra base de datos:  
```JavaScript
module.exports = (sequelize, type) => {
    return sequelize.define('film', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tittle: type.STRING,
        description: type.STRING,
        score: type.INTEGER,
        director: type.STRING
    })
}
```

Luego en otro script definimos la ruta para el login de nuestros usuarios.  
>api/users/login  
api/users/register  
  
```JavaScript
module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: type.STRING,
        email: type.STRING,
        password: type.STRING(150)
    });
}
```
## Nota:   
*Las api`s suelen considerarse como el contrato entre el proveedor de información y el usuario,
donde se establece el contenido que se necesita por parte del consumidor (la llamada) y el que requiere el productor (la respuesta)
las empresas pueden compartir recursos e información mientras conservan la seguridad, el control y la autenticación*

### Por la seguridad de nuestros Usuarios vamos a encriptar las password ya que se consideran datos sensibles

Para eso vamos a emplear un Stack de librerias que nos permiten *encriptar* las password y luego para la verificacion podremos *codificarlas* y *decodificarlas* para luego compararlas   
```JavaScript
const bcrytp = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');
```
El usuario podra crear una cuenta y logearse, esos datos van a viajar encriptados a nuestra base de datos. Si el usuario posteriormente se deslogea, vuelve a logear y concuerda el *username*, *email* y *password* tendra accedo a la información que ofrece nuestra servidor (En este caso las peliculas que anteriormente creamos)  
```JavaScript
router.post('/register', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El mail debe ser correcto').isEmail()
]...
```
## Por Ultimo: Nuestro TOKEN de seguridad   
*Un token es un mecanismo de seguridad para realizar validaciones de distinto tipo. Viene siendo una palabra clave alfanumérica
o compuesta de solo números. Sin embargo, en ambos casos el token tiene la función de identificar al usuario que lo porta*

La creacion de esta Api consta de los siguientes puntos a tener en cuenta:  
- La API Rest permite que la aplicación acceda a bases de datos desde diferentes servidores, ExpressJS nos permite acceder a los datos de una base de datos MySQL desde cualquier aplicación externa.  
- Sincronizamos nuestros modelos con la base de datos para poder trabajar sin necesidad de usar sintaxis de SQL.  
- Tratamos la creación de los diferentes métodos para poder gestionar las rutas que nos permitan interactuar con una de las tablas de nuestra base de datos.  
- Gestionar usuarios para acceder a los datos de nuestra API.  
- Empleo la librería express-validator para poder limpiar los datos que entran desde el cliente para registrar usuarios.  
- Para la encriptación de la clave de usuario utilizamos la librería bcryptjs.  
- Diferentes métodos para gestionar el login dentro de nuestra API. (Seguimos utilizando la librería BcryptJS para la gestión de la clave del usuario) . 
- Generación de un token para gestionar el acceso de usuarios a través de la librería jwt-simple.

### Entendiendo el metodo que nos ofrece Node.js "http.createServer()";


JavaScript al ser un lenguaje de scripts de alto nivel incorporado en los navegadores nos permite implementar interactividad en páginas web / apps. 

Más información: [Node js](https://www.w3schools.com/nodejs/met_http_createserver.asp)

### Resumiendo: 
El método http.createServer () convierte nuestra computadora en un servidor HTTP.

El método http.createServer () crea un objeto de servidor HTTP .

El objeto del servidor HTTP puede escuchar los puertos de nuestra computadora y ejecutar una función, un requestListener , cada vez que se realiza una solicitud.

<h3><strong> Lenguajes: <strong></h3>
    <h2>
     Javascript <img style='width: 3rem; height: 3rem; margin-top: 1rem' src="https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_960_720.png"/>  |
     Node Js <img style='width: 3rem; height: 3rem; margin-top: 1rem' src="https://res.cloudinary.com/druj3xeao/image/upload/v1635268343/readme/pngwing.com_9_nptorj.png"/> |
     Express <img <img style='width: 3rem; height: 3rem; margin-top: 1rem' src="https://res.cloudinary.com/druj3xeao/image/upload/v1635268180/readme/pngwing.com_5_mtcqjs.png"/> |
