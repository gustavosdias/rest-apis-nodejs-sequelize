const {Model, DataTypes} = require('sequelize');

class imoveis extends Model {
    static init(conn){
        super.init({
            tipoCompra: DataTypes.STRING,
            quartos: DataTypes.INTEGER,
            banheiros: DataTypes.INTEGER,
            vagas: DataTypes.INTEGER,
            pet: DataTypes.BOOLEAN,
            mobilia: DataTypes.BOOLEAN,
            metragem: DataTypes.INTEGER,
            endereco: DataTypes.STRING,
            tipo: DataTypes.STRING
        },
        {
            freezeTableName: true,
            sequelize: conn
        });
    }

}

module.exports = imoveis;