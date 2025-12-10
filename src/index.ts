import express from "express";

// Rotas
import userRoutes from "./routes/UserRoutes";
import shelterRoutes from "./routes/ShelterRoutes";
import animalRoutes from "./routes/AnimalRoutes";
import adoptionRoutes from "./routes/AdoptionRoutes";
import donationRoutes from "./routes/DonationRoutes";
import visitRoutes from "./routes/VisitRoutes";

import sequelize from "./config/database";
import { errorHandler } from "./middleware/errorHandler";

sequelize.sync();

// Inicializa o Express
const app = express();

// Middlewares importantes
app.use(express.json());

// Usa as rotas
app.use("/users", userRoutes);
app.use("/shelters", shelterRoutes);
app.use("/animals", animalRoutes);
app.use("/adoptions", adoptionRoutes);
app.use("/donations", donationRoutes);
app.use("/visits", visitRoutes);

app.use(errorHandler);


// Sobe o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
