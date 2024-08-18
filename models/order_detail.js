'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    static associate(models) {
        this.belongsTo(models.coffee, { foreignKey:'coffeeID' })
        this.belongsTo(models.order_list, { foreignKey:'orderID' })
    }
  }
  order_detail.init({
    detailID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    orderID: DataTypes.INTEGER,
    coffeeID: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'order_detail',
  });
  return order_detail;
};

