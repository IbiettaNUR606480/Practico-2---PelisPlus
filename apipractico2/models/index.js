const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.personas = require("./persona.model.js")(sequelize, Sequelize);
db.peliculas = require("./pelicula.model.js")(sequelize, Sequelize);
db.person_movie = require("./participante.model.js")(sequelize, Sequelize);

// Relaciones entre personas y participantes
db.personas.belongsToMany(db.peliculas, {
    through: db.participante,
    foreignKey: "participanteId",
    otherKey: "peliculaId",
});
db.peliculas.belongsToMany(db.personas, {
    through: db.participante,
    foreignKey: "peliculaId",
    otherKey: "participanteId",
});

module.exports = db;