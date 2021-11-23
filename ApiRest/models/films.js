//tabla donde almacenamos nuestras peliculas.

//Definimos nuestros modelo
module.exports = (sequelize, type) => {
    return sequelize.define('film', {
        //El primer paramatro el nombre de la tabla en singular.
        //El segundo es un objeto con son los campos que vamos a generar.
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

//Enlace  en: https://sequelize.org/master/manual/model-basics.html