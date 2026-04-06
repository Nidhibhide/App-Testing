import express from "express";
import cors from "cors";
import morgan from "morgan";
import allroutes from "./routes";

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("combined"));

app.use((req, res, next) => {
  console.log(`API Hit → Method: ${req.method}, URL: ${req.originalUrl}`);
  next();
});

app.use("/api", allroutes);

export default app;  