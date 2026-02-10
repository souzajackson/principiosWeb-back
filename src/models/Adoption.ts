import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Adoption extends Model {
  declare id: number;
  declare userId: number;
  declare animalId: number;
  declare date: Date;
  declare status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

Adoption.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    animalId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: {
      type: DataTypes.ENUM('PENDING','APPROVED','REJECTED'),
      allowNull: false,
      defaultValue: 'PENDING'
    }
  },
  { sequelize, tableName: "adoptions", timestamps: false }
);
