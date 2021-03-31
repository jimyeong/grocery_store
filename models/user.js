const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model{
    static  FK_USER_WORKER = "fk_user_worker_id";
    static init(sequelize){
        return super.init({
            grade: {
                type: Sequelize.TINYINT(1),
                defaultValue: 1
            },

            miledge :{
                type: Sequelize.INTEGER(9),
                defaultValue: 0

            },
            point: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            created_at:{
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: "User",
            tableName: "users",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci"
        })
    }
    static associate (db){
        db.User.hasMany(db.Worker, {foreignKey: User.FK_USER_WORKER, sourceKey:"id"})
    }
}