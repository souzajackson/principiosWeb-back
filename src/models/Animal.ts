import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

export enum AnimalSpecies {
  DOG = "DOG",
  CAT = "CAT",
}

export enum AnimalSex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export class Animal extends Model {
  declare id: number;
  declare name: string;
  declare species: AnimalSpecies;
  declare breed: string;
  declare age: number;
  declare sex: AnimalSex;
  declare photoUrl: string;
  declare description: string;
  declare shelterId: number;
}

Animal.init(
  {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },

    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },

    species: {
      type: DataTypes.ENUM(...Object.values(AnimalSpecies)),
      allowNull: false,
    },

    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    age: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },

    sex: {
      type: DataTypes.ENUM(...Object.values(AnimalSex)),
      allowNull: false,
    },

    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    shelterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  { 
    sequelize, 
    tableName: "animals", 
    timestamps: false 
  }
);