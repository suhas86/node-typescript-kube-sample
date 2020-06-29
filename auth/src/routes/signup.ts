import express, { Request, Response } from "express";
import { User } from "../models/user";
import { body, check, validationResult } from "express-validator";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("firstName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("First Name is required"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be minimum of 6 characters"),
    check("password").custom((val, { req }) => {
      if (val !== req.body.confirmPassword) {
        throw new Error("Passwords don't match");
      } else {
        return val;
      }
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email already exists" });
    }

    const user = new User({ email, firstName, lastName, password });

    await user.save();

    return res.status(201).send(user);
  }
);

export { router as SignupRoute };
