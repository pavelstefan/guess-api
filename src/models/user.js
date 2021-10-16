const { DataTypes, Model } = require('sequelize');
const db = require('../utils').db;

class User extends Model { }

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db.connection,
  modelName: 'User',
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['id']
    }
  ]
});

module.exports = User;