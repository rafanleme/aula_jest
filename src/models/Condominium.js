const { Model, DataTypes } = require("sequelize");

class Condominium extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        ticket: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "condominiums",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Manager, {
      foreignKey: "created_manager_id",
      as: "created_manager",
    });
    this.belongsToMany(models.Manager, {
      foreignKey: "condominium_id",
      through: models.Management,
      as: "managers",
    });
  }
}

module.exports = Condominium;
