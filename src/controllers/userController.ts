import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user';
import * as bcrypt from 'bcrypt';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const bcryptRounds = 10;
      const hashedPassword = await bcrypt.hash(password, bcryptRounds);
      // Validate request data (you may want to use a validation library)
      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
