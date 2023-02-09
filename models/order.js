'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "Customer"
      })
      Order.belongsTo(models.Laundry)
    }

    //getter
    get calculatedDay(){
      return this.finishedDate.getDay() - this.date.getDay()
    }
  }
  Order.init({
    orderNumber: DataTypes.INTEGER,
    pickUpLocation: DataTypes.STRING,
    date: DataTypes.DATE,
    finishedDate: DataTypes.DATE,
    totalPrice: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    orderStatus: DataTypes.BOOLEAN,
    paymentStatus: DataTypes.BOOLEAN,
    LaundryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};