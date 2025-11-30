import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Donation extends Model {
  declare id: number;
  declare userId: number;
  declare shelterId: number;
  declare amount: number;
  declare date: Date;
}

Donation.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    shelterId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { sequelize, tableName: "donations", timestamps: false }
);
