module.exports = (sequelize, Sequelize) => {
    const Pelicula = sequelize.define("pelicula", {
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        estreno: {
            type: Sequelize.DATE,
            allowNull: false
        },
        trailer: {
            type: Sequelize.STRING,
            allowNull: false
        },
        calificacion: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
    });
    return Pelicula;
};