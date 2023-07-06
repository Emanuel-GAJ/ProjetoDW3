import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";


// Dotenv config
config();

// Import routes
import routes from "./routes.js";

// Init express
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.use(routes);

// Start server
const port = process.env.API_PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});
