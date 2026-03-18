import { Adoption } from "./Adoption";
import { Animal } from "./Animal";
import { Shelter } from "./Shelter";
import { User } from "./User";
import { Visit } from "./Visit";

export function setUpAssociations() {
  Shelter.hasMany(Animal, { foreignKey: "shelterId" });
  Animal.belongsTo(Shelter, { foreignKey: "shelterId" });
  User.hasOne(Shelter, { foreignKey: "userId" });
  Shelter.belongsTo(User, { foreignKey: "userId" });
  Animal.hasOne(Adoption, { foreignKey: "animalId" });
  Adoption.belongsTo(Animal, { foreignKey: "animalId" });
  Visit.belongsTo(Shelter, {
    foreignKey: 'shelterId',
    as: 'shelter',
  });
  
  Shelter.hasMany(Visit, {
    foreignKey: 'shelterId',
    as: 'visits',
  });
}
