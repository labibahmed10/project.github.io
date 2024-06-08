import express, { Application, urlencoded, Request, Response } from "express";
import cors from "cors";
import allRoutes from "./routes/allRoutes";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// url encoding
app.use(urlencoded({ extended: true }));

app.use("/api/v1", allRoutes);

// global error handler
app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the project for final year",
  });
});

export default app;
