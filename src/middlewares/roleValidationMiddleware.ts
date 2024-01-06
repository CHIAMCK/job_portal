import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authorizeMiddleware'

const roleValidationMiddleware = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role;
      if (!userRole || !allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: `you don't have the permission to perform this operation` });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export { roleValidationMiddleware };
