import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user?: {
    role: string;
  };
}

const roleValidationMiddleware = (allowedRoles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role;
      if (!userRole || !allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: 'you have the permission to perform this operation' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export { roleValidationMiddleware };
