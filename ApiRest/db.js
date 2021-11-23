const Sequelize = require('sequelize');

const FilmModel = require('./models/films');
const UserModel = require('./models/users');

//Definimos los parametros de conexion.
const sequelize = new Sequelize('demo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//Creamos los modelos.

const Film = FilmModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Tablas Sincronizadas');
    });

module.exports = {
    Film,
    User
}