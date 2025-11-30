import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { Shelter } from "./Shelter";

export interface AnimalAttributes {
  id: number;
  name: string;
  species: string;
  age: number;
  shelterId: number;
}

export interface AnimalCreationAttributes extends Optional<AnimalAttributes, "id"> {}

export class Animal extends Model<AnimalAttributes, AnimalCreationAttributes>
  implements AnimalAttributes
{
  public id!: number;
  public name!: string;
  public species!: string;
  public age!: number;
  public shelterId!: number;
}

Animal.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    species: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    shelterId: { type: DataTypes.INTEGER, allowNull: false }
  },
  { sequelize, tableName: "animals", timestamps: false }
);

Shelter.hasMany(Animal, { foreignKey: "shelterId" });
Animal.belongsTo(Shelter, { foreignKey: "shelterId" });
