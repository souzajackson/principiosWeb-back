import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";


export class Shelter extends Model {
  declare id: number;
  declare name: string;
  declare address: string;
  declare phone: string;
}

Shelter.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, tableName: "shelters", timestamps: false }
);
