module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/persona.controller.js");

    router.get('/', controller.listPersona);
    router.get('/:id', controller.getPersonaById);
    router.post('/', controller.createPersona);
    router.patch('/:id', controller.updatePersonaPatch);
    router.put('/:id', controller.updatePersonaPut);
    router.delete('/:id', controller.deletePersona);
    app.use('/api/personas', router);

};