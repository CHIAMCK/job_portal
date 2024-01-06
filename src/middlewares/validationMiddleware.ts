import { validationResult, body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validateUserCreation = [
  body('firstName').notEmpty().withMessage('Username is required'),
  body('lastName').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateUserCreation };
