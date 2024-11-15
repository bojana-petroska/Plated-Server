import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET =
  'a5c0effbf8a398bface402709bd41970e057b217b5b52c1d580851198f92767898e0a32088cb05a032a683e6ad2f64c6172325df6f4e43d3d0768ccc61298273';

const auth = (req: Request, res: Response, next: NextFunction) => {
  // Extract Bearer token
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

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
      // req.user = decoded;
      // req.user_id = (decoded as any).id;
      next();
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: (error as Error).message,
    });
  }
};

export default auth;

// import { Request, Response, NextFunction } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret';

// interface AuthRequest extends Request {
//   user?: JwtPayload | string;
// }

// const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   if (!JWT_SECRET) {
//     return res.status(500).json({ message: 'Internal Server Error: Secret not found' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
//     req.user = decoded; // Attach user info to request object
//     next();
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token has expired. Please log in again.' });
//     }
//     return res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// export default auth;
