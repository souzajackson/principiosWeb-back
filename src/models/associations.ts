import { Adoption } from "./Adoption";
import { Animal } from "./Animal";
import { Shelter } from "./Shelter";
import { User } from "./User";

Shelter.hasMany(Animal, { foreignKey: "shelterId" });
Animal.belongsTo(Shelter, { foreignKey: "shelterId" });
User.hasOne(Shelter, { foreignKey: "userId" });
Shelter.belongsTo(User, { foreignKey: "userId" });
Animal.hasOne(Adoption, { foreignKey: "animalId" });
Adoption.belongsTo(Animal, { foreignKey: "animalId" });
