import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { Shelter } from "./Shelter";


export class Animal extends Model {
  declare id: number;
  declare name: string;
  declare species: string;
  declare age: number;
  declare shelterId: number;
}

Animal.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    species: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    shelterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  { sequelize, tableName: "animals", timestamps: false }
);
