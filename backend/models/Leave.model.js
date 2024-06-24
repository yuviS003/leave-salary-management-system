const { DataTypes, Sequelize } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    LEAVE_ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    LEAVE_APPLIER_ID: { type: Sequelize.UUID, allowNull: false },
    LEAVE_TYPE: { type: DataTypes.STRING, allowNull: false },
    LEAVE_APPLY_DATE: { type: DataTypes.STRING, allowNull: false },
    LEAVE_START_DATE: { type: DataTypes.STRING, allowNull: false },
    LEAVE_END_DATE: { type: DataTypes.STRING, allowNull: true },
    LEAVE_REASON: { type: DataTypes.STRING, allowNull: false },
    LEAVE_STATUS: { type: DataTypes.STRING, allowNull: false },
    LEAVE_APPROVAL_DATE: { type: DataTypes.STRING, allowNull: true },
    LEAVE_APPROVER_ID: { type: Sequelize.UUID, allowNull: true },
  };

  const options = {
    freezeTableName: true,
  };

  return sequelize.define("LEAVE", attributes, options);
}
