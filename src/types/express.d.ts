// src/types/express.d.ts
declare namespace Express {
    export interface Request {
      user?: any;  // Define the type of 'user' based on your use case (e.g., the decoded JWT object)
    }
  }
  