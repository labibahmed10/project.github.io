import express, { Application, urlencoded, Request, Response } from "express";
import cors from "cors";
import allRoutes from "./routes/allRoutes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFoundRoutes from "./middlewares/notFoundRoutes";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// url encoding
app.use(urlencoded({ extended: true }));

app.use("/api/v1", allRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the project for final year",
  });
});

// global error handler
app.use(globalErrorHandler);

// not found routes
app.all("*", notFoundRoutes);

export default app;
