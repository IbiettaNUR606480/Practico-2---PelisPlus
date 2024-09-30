const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

exports.addParticipantePelicula = async (req, res) => {
    try {
        const participanteDirector = {
            participanteId: req.body.participanteId,
            peliculaId: req.body.peliculaId,
            rol: "Director"
        };
        const nuevoParticipanteDirector = await db.participantes.create(participanteDirector);
        for (let i = 0; i < req.body.actores.length; i++) {
            const participanteActor = {
                participanteId: req.body.actores[i].participanteId,
                peliculaId: req.body.peliculaId,
                rol: "Actor"
            };
            const nuevoParticipanteActor = await db.participantes.create(participanteActor);
        }
        res.status(201).send(nuevoParticipanteDirector);
    }   catch (error) {
        sendError500(res, error);
    }
}

exports.deleteParticipantePelicula = async (req, res) => {
    const id = req.params.id;
    try {
        const participante = await db.participante.destroy({
            where: {peliculaId: id}
        });
        res.json(participante);
    }   catch (error) {
        sendError500(res, error);
    }
}