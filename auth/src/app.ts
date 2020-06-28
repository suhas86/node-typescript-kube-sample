import express from "express";
import { json } from "body-parser";
import { SignupRoute } from "./routes/signup";
const app = express();

app.use(json());
app.set("trust proxy", true);
app.use(SignupRoute);

export { app };
