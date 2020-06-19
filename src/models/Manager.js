const { Model, DataTypes } = require("sequelize");

class Manager extends Model {
  //init, inicia o model com os campos editáveis
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        cpf: DataTypes.STRING,
        email: DataTypes.STRING,
        cellphone: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  //definimos as associações ou relacionamentos
  static associate(models) {
    this.belongsToMany(models.Condominium, {
      foreignKey: "manager_id",
      through: models.Management,
      as: "condominium",
    });
  }
}

module.exports = Manager;
