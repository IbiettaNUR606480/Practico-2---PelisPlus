module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/participante.controller.js");

    router.post('/', controller.addParticipantePelicula);
    router.delete('/:id', controller.deleteParticipantePelicula);
    app.use('/api/participantes', router);
}