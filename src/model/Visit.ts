import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Visit extends Model {
  declare id: number;
  declare userId: number;
  declare shelterId: number;
  declare date: Date;
}

Visit.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    shelterId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false }
  },
  { sequelize, tableName: "visits", timestamps: false }
);
