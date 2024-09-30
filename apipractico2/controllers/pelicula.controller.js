const db = require ("../models");
const { isRequestValid, sendError500 } = require ("../utils/request.utils");

exports.listPelicula = async (req, res) => {
    try {
        const peliculas = await db.peliculas.findAll({
            include: "persona",
            order: [
                ['calificacion', 'DESC']
            ]
        });
        res.json(peliculas);
    } catch (error) {
        sendError500(error);
    }
}

exports.getPeliculaById = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await getPeliculaOr404(id, res);
        if(!pelicula) { 
            return;
        }
        res.json(pelicula);
    }   catch (error) {
        sendError500(error);
    }
}

exports.createPelicula = async (req, res) => {
    const requiredFields = ["titulo", "descripcion", "estreno", "trailer", "calificacion"];
    if(!isRequestValid(requiredFields, req.body, res)) {
        return;
    }   try {
        const pelicula = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            estreno: req.body.estreno,
            trailer: req.body.trailer,
            calificacion: req.body.calificacion
        };
        const nuevaPelicula = await db.peliculas.create(pelicula);
        res.status(201).json(nuevaPelicula);
    }   catch (error) {
        sendError500(error);
    }
}

exports.updatePeliculaPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await getPeliculaOr404(id, res);
        if(!pelicula) {
            return;
        }
        pelicula.titulo = req.body.titulo || pelicula.titulo;
        pelicula.descripcion = req.body.descripcion || pelicula.descripcion;
        pelicula.estreno = req.body.estreno || pelicula.estreno;
        pelicula.trailer = req.body.trailer || pelicula.trailer;
        pelicula.calificacion = req.body.calificacion || pelicula.calificacion;
        await pelicula.save();
        res.json(pelicula);
    }   catch (error) {
        sendError500(error);
    }
}

exports.updatePeliculaPut = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await getPeliculaOr404(id, res);
        if (!pelicula) {
            return;
        }
        const requiredFields = ["titulo", "descripcion", "estreno", "trailer", "calificacion"];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        pelicula.titulo = req.body.titulo;
        pelicula.descripcion = req.body.descripcion;
        pelicula.estreno = req.body.estreno;
        pelicula.trailer = req.body.trailer;
        pelicula.calificacion = req.body.calificacion;
        await pelicula.save();

        res.json(pelicula);
    }   catch (error) {
        sendError500(error);
    }
}

exports.deletePelicula = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await getPeliculaOr404(id, res);
        if (!pelicula) {
            return;
        }
        await pelicula.destroy();
        res.json({ message: "Pelicula eliminada" });
    }   catch (error) {
        sendError500(error);
    }
}

exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await getPeliculaOr404(id, res);
        if (!pelicula) {
            return;
        }
        if (!req.file) {
            res.status(400).json({ message: "No se ha subido ninguna imagen" });
            return;
        }
        const picture = req.files.profilePicture;
        const pictureName = pelicula.id + ".jpg";
        picture.mv(`public/peliculas/${pictureName}`);
        await pelicula.save();
        res.json(pelicula);
    }   catch (error) {
        sendError500(error);
    }
}

async function getPeliculaOr404(id, res) {
    const pelicula = await db.peliculas.findByPk(
        id,
        {
            include: "persona"
        }
    );
    if (!pelicula) {
        res.status(404).json({
            msg: 'Pelicula no encontrada'
        });
        return;
    }
    return pelicula;
}