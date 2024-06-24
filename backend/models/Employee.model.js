const { DataTypes, Sequelize } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    EMP_ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    EMP_NAME: { type: DataTypes.STRING, allowNull: false },
    EMP_PASSWORD: { type: DataTypes.STRING, allowNull: false },
    EMP_EMAIL: { type: DataTypes.STRING, allowNull: false, unique: true },
    EMP_DOB: { type: DataTypes.STRING, allowNull: false },
    EMP_PHONE: { type: DataTypes.STRING, allowNull: false, unique: true },
    EMP_PAN: { type: DataTypes.STRING, allowNull: false, unique: true },
    EMP_TYPE: { type: DataTypes.STRING, allowNull: false },
    EMP_PERMISSION: { type: DataTypes.STRING, allowNull: false },
    EMP_BASE_SALARY: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    freezeTableName: true,
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: ["EMP_PASSWORD"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("EMPLOYEE", attributes, options);
}
