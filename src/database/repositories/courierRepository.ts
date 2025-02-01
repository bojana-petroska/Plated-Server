import { ICourier, CourierInput, Availability } from '../../types/types.js';
import { Courier } from '../entities/Courier.js';
import { AppDataSource } from '../../config/ormconfig.js';
import bcrypt from 'bcrypt';

const courierRepository = AppDataSource.getRepository(Courier);

const getCourier = async (courier_id: number): Promise<ICourier> => {
  const courier = await courierRepository.findOneBy({ courier_id });
  if (!courier) {
    throw new Error(`Courier with id: ${courier_id} not found.`);
  }
  return courier;
};

const createCourier = async ({
  name,
  email,
  password,
}: CourierInput): Promise<ICourier> => {
  const existingCourier = await courierRepository.findOne({
    where: [{ name }, { email }],
  });

  if (existingCourier) {
    throw new Error('Name or email already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hashed password!:', hashedPassword);

  const newCourier = courierRepository.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber: '',
    availability: Availability.available,
    createdAt: new Date(),
  });

  console.log(newCourier);
  await courierRepository.save(newCourier);
  return newCourier;
};

const updateCourier = async (
  courier_id: number,
  updatedCourierData: Partial<ICourier>
): Promise<ICourier> => {
  const courier = await courierRepository.findOneBy({ courier_id });
  if (!courier) {
    throw new Error(`User with id: ${courier_id} not found.`);
  }
  courierRepository.merge(courier, updatedCourierData);
  await courierRepository.save(courier);
  return courier;
};

export default {
  getCourier,
  createCourier,
  updateCourier,
};
