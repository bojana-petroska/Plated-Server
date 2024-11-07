import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
  // Extract Bearer token
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    res
      .status(500)
      .json({ message: 'Internal Server Error: Secret not found' });
    return;
  }

  try {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res
            .status(401)
            .json({ message: 'Token has expired. Please log in again.' });
          return;
        }
        res.status(400).json({ message: 'Invalid token.' });
        return;
      }

      // Store the decoded user information
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: (error as Error).message,
    });
    return;
  }
};

export default auth;
