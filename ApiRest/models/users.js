//Creamos el modelo de users. Y luego lo exportamos a db.js para que se sincronice.

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: type.STRING,
        email: type.STRING,
        password: type.STRING(150)//Vamos a encriptar la pass
    });
}