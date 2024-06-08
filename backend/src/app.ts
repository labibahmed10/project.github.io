import express, { Application, urlencoded, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// url encoding
app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "The app is running",
  });
});

app.listen(8080, () => {
  console.log("the app is running on port 8080");
});
