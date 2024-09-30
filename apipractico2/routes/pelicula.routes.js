module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pelicula.controller.js");

    router.get('/', controller.listPelicula);
    router.get('/:id', controller.getPeliculaById);
    router.post('/', controller.createPelicula);
    router.put('/:id', controller.updatePeliculaPut);
    router.patch('/:id', controller.updatePeliculaPatch);
    router.delete('/:id', controller.deletePelicula);
    router.post(':id/foto', controller.uploadPicture);
    app.use('/api/peliculas', router);
};