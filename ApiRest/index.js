const express = require('express');
const bodyParser = require('body-parser');
/*body-parser: 
    Módulo de middleware. Para manejar la solicitud de HTTP POST en Express.js utilice esta libreria para gestionar las petisiones post para luego poder mandar objetos asiciados al post. Descomprime datos de solicitud entrantes si están comprimidos
 */
const apiRouter = require('./routes/api')//Exportamos el manejador de rutas
const app = express();

require('./db');

app.use(bodyParser.json());
//analiza el texto como JSON y expone el objeto resultante en req.body.
app.use(bodyParser.urlencoded({ extended: true }));
//analiza el texto como datos codificados de URL y expone el objeto resultante en req.body
//Enlace: https://www.it-swarm-es.com/es/node.js/que-hace-body-parser-con-express/825575205/#:~:text=en%20%24_POST%20.-,bodyParser.,el%20objeto%20resultante%20en%20req.

app.use('/api', apiRouter);
//Nota: Ahora debemos diferenciar las rutas entre: "/api/films" !=== "/api/users"

app.listen(3000, () => {
    console.log('servidor on');
});