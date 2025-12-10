import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Adoption extends Model {
  declare id: number;
  declare userId: number;
  declare animalId: number;
  declare date: Date;
}

Adoption.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    animalId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { sequelize, tableName: "adoptions", timestamps: false }
);
