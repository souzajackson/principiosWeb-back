import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { Shelter } from "./Shelter";

export enum AnimalSpecies {
  DOG = "Cachorro",
  CAT = "Gato",
}

export enum AnimalGender {
  MALE = "Macho",
  FEMALE = "Fêmea",
}

export enum AnimalSize {
  SMALL = "Pequeno",
  MEDIUM = "Médio",
  LARGE = "Grande",
}

export class Animal extends Model {
  declare id: number;
  declare name: string;
  declare species: AnimalSpecies;
  declare breed: string;
  declare age: number;
  declare gender: AnimalGender;
  declare size: AnimalSize;
  declare photoUrl: string;
  declare description: string;

  declare personality: string[];   // ARRAY
  declare healthStatus: string;
  declare vaccinated: boolean;
  declare neutered: boolean;

  declare shelterId: number;
}

Animal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
    },

    gender: {
      type: DataTypes.ENUM(...Object.values(AnimalGender)),
      allowNull: false,
    },

    size: {
      type: DataTypes.ENUM(...Object.values(AnimalSize)),
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

    personality: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    healthStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Saudável",
    },

    vaccinated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    neutered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    shelterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "animals",
    timestamps: false,
  }
);

Animal.belongsTo(Shelter, {
  foreignKey: 'shelterId',
  as: 'shelter'
});