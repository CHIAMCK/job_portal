import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      const bcryptRounds = 10;
      const hashedPassword = await bcrypt.hash(password, bcryptRounds);
      // Validate request data (you may want to use a validation library)
      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role
      });
    
      await newUser.save();
      res.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async logIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ 
            userId: user._id,
            role: user.role
        }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json();
    } catch (error) {
        next(error);    
    }
  }
}

export default new UserController();
