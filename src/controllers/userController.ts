import { Request, Response } from 'express';
import UserModel from '../models/user';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password } = req.body;

      // Validate request data (you may want to use a validation library)
      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        password,
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();
