import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { Shelter } from "./Shelter";
import { User } from "./User";

export class Visit extends Model {
  declare id: number;
  declare userId: number;
  declare shelterId: number;
  declare date: Date;

  declare shelter?: Shelter;
  declare visitor?: User;
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
