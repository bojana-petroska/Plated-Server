import { Request, Response, NextFunction } from 'express';
import { expressjwt as jwtMiddleware } from 'express-jwt';

const JWT_SECRET =
  'a5c0effbf8a398bface402709bd41970e057b217b5b52c1d580851198f92767898e0a32088cb05a032a683e6ad2f64c6172325df6f4e43d3d0768ccc61298273';

// Middleware using express-jwt
const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Promise<void> => {
  // Wrap the jwtMiddleware to handle the return type correctly
  return new Promise<void>((resolve, reject) => {
    jwtMiddleware({
      secret: JWT_SECRET,
      algorithms: ['HS256'],
      requestProperty: 'payload', // Attach decoded token payload to req.payload
      getToken: getTokenFromHeaders, // Custom function to extract token from headers
    })(req, res, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  }).then(() => {
    next();
  }).catch((error) => {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  });
};

function getTokenFromHeaders(req: Request): string | undefined {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return undefined;
}

export default isAuthenticated;
