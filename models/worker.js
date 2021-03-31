const Sequelize = require("sequelize");

module.exports = class Worker extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            picture: {
                type:Sequelize.STRING(15),
                allowNull: true,
                defaultValue: "avatar-default"
            },
            tel: {
                type:Sequelize.STRING(15),
                allowNull: false
            },
            address: {
                type:Sequelize.STRING(50),
                allowNull: true,
            },
            rank: {
                type:Sequelize.TINYINT,
                allowNull: true,
                defaultValue: 1

            },
            age: {
                type:Sequelize.TINYINT,
                allowNull: false
            },
            gender:{
                type:Sequelize.BOOLEAN,
                allowNull: false
            },
            created_at:{
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }

        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: "Worker",
            tableName: "workers",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci"
        })
    }
    static associate(db){
        db.Worker.belongsTo(db.User, {foreignKey:db.User.FK_USER_WORKER, targetKey: "id"})
    }
}