import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/users/signup", (req: Request, res: Response) => {
  console.log("API Hit");
  res.send({ success: true });
});

export { router as SignupRoute };
