import express from "express";

// Rotas
import userRoutes from "./routes/userRoutes";
import shelterRoutes from "./routes/shelterRoutes";
import animalRoutes from "./routes/animalRoutes";
import adoptionRoutes from "./routes/adoptionRoutes";
import donationRoutes from "./routes/donationRoutes";
import visitRoutes from "./routes/visitRoutes";

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

// Sobe o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
