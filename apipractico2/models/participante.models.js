module.exports  = (sequelize, Sequelize) => {
    const Participante = sequelize.define("actor", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        participanteId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        peliculaId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        rol: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Participante;
}