import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

export interface ShelterAttributes {
  id: number;
  name: string;
  address: string;
  phone: string;
}

export interface ShelterCreationAttributes extends Optional<ShelterAttributes, "id"> {}

export class Shelter extends Model<ShelterAttributes, ShelterCreationAttributes>
  implements ShelterAttributes
{
  public id!: number;
  public name!: string;
  public address!: string;
  public phone!: string;
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
