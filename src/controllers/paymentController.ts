import { Request, Response } from 'express';
import paymentRepo from '../database/repositories/paymentRepository.js';

const createPayment = async (req: Request, res: Response) => {
  try {
    const { amount, currency, userId } = req.body;

    if (!amount || !currency) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const { clientSecret } = await paymentRepo.createPayment({
      amount,
      currency,
      userId,
    });

    res.status(201).json({ clientSecret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { createPayment };
