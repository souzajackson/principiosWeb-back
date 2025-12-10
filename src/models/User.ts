import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";


export class User
  extends Model
{
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, tableName: "users", timestamps: false }
);
