import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface UserData {
    userId: string;
    role: string;
}
  
interface AuthenticatedRequest extends Request {
    user?: UserData;
}


function authorize(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  try {
    const decodedToken = verify(token, process.env.JWT_SECRET as string);

    if (typeof decodedToken === 'string') {
      return res.status(403).json({ error: 'Forbidden - Invalid token' });
    }

    req.user = decodedToken as UserData;

    next();
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden - Invalid token' });
  }
}

export { authorize, AuthenticatedRequest };
