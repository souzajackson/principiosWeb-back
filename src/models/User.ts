import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: 'USER' | 'SHELTER' | 'SUPER'; 

  static async getUserByName(name: string): Promise<User | null> {
    return await User.findOne({
      where: { name }
    });
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },

    role: { 
      type: DataTypes.ENUM('USER', 'SHELTER', 'SUPER'),
      allowNull: false,
      defaultValue: 'USER'
    }
  },
  { sequelize, tableName: "users", timestamps: false }
);