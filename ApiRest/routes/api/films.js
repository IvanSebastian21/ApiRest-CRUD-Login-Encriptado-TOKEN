const router = require('express').Router();

const { Film } = require('../../db');//Traemos el modelo Film

router.get('/', async (req, res) => {
    const films = await Film.findAll();//Recuperamos todo los registros de las peliculas de la tabla
    res.json(films);//Toma el objeto array, lo convierte en un paquete Json y lo manda al cliente que lo pide.
});

router.post('/', async (req, res) => {//Podemos incorporar o asociar objetos a traves del "body"
    const film = await Film.create(req.body);
    res.json(film);
})

router.put('/:filmId', async (req, res) => {
    await Film.update(req.body, {//Le pasamos los parametros que queremos actualizar.
        where: { id: req.params.filmId }//Importante: debemos tambien pasarle el filtro que queremos hacer sobre los datos de la tabla. Sino se actualizan todos los registro. 
    });
    res.json({ success: "Se ha modificado correctamente" });
});

router.delete('/:filmId', async (req, res) => {
    await Film.destroy({
        where: { id: req.params.filmId }
    });
    res.json({ success: "Se ha borrado correctamente" });
});

/*
Nota: IMPORTANTE
where: { id: req.params.filmId} ---> "Quiero "modificar" y/o "eliminar" todas aquellas peliculas cuyo ID sea igual a lo que recibo por la URL ('/:filmId')"
*/

module.exports = router;


