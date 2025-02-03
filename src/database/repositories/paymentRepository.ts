import { AppDataSource } from '../../config/ormconfig.js';
// import { Cart } from '../entities/Cart.js';
import { Payment } from '../entities/Payment.js';
import { User } from '../entities/User.js';
import { IPayment } from '../../types/types.js';

import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27' as any,
});

const paymentRepository = AppDataSource.getRepository(Payment);
const userRepository = AppDataSource.getRepository(User);
// const cartRepository = AppDataSource.getRepository(Cart);

const createPayment = async ({
  amount,
  currency,
  userId,
}: IPayment) => {
  const user = await userRepository.findOne({ where: { user_id: userId } });
//   const cart = await cartRepository.findOne({ where: { cart_id: cartId } });

  if (!user) {
    throw new Error('User not found');
  }

  const payment = await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ['card'],
  });

  const newPayment = paymentRepository.create({
    amount,
    currency,
    user,
  });

  await paymentRepository.save(newPayment);

  return {
    payment: newPayment,
    clientSecret: payment.client_secret,
  };
};

export default { createPayment };
