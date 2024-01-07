import { Response, NextFunction } from 'express';
import UserModel, { UserDocument } from '../models/user';
import { AuthenticatedRequest } from '../middlewares/authorizeMiddleware';

class UserController {
  async viewUserProfileDetails(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

      const user: UserDocument | null = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { firstName, lastName, email } = user;
      res.status(200).json({
        firstName,
        lastName,
        email,
      });
    } catch (error) {
        next(error);
    }
  }
}

export default new UserController();
