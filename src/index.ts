import express from "express";
// Rotas
import userRoutes from "./routes/UserRoutes";
import shelterRoutes from "./routes/ShelterRoutes";
import animalRoutes from "./routes/AnimalRoutes";
import adoptionRoutes from "./routes/AdoptionRoutes";
import donationRoutes from "./routes/DonationRoutes";
import visitRoutes from "./routes/VisitRoutes";
import authRoutes from './routes/AuthRoutes';
import sequelize from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import cors, { type CorsOptions } from 'cors';


// Inicializa o Express
const app = express();

// Log para ver se o Express está funcionando
app.use((req, res, next) => {
  cors();
  console.log(`🌐 Requisição recebida: ${req.method} ${req.url}`);
  next();
});

const corsOptions: CorsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false, // true só se você usa cookies/sessão
};

// ✅ CORS antes das rotas
app.use(cors());

// ✅ Preflight para qualquer rota (Express 5 friendly)
app.options(/.*/, cors(corsOptions));

// Middlewares importantes
app.use(express.json());

// Log após o express.json
app.use((req, res, next) => {
  console.log(`📦 Body parseado:`, req.body);
  next();
});

// Usa as rotas
app.use("/users", userRoutes);
app.use("/shelters", shelterRoutes);
app.use("/animals", animalRoutes);
app.use("/adoptions", adoptionRoutes);
app.use("/donations", donationRoutes);
app.use("/visits", visitRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

// Testa conexão com banco
sequelize.sync()
  .then(() => console.log("✅ Banco conectado com sucesso!"))
  .catch((err) => console.error("❌ Erro ao conectar no banco:", err));

// Sobe o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;