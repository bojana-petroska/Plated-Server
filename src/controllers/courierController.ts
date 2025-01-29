import { Request, Response } from 'express';
import courierRepo from '../database/repositories/courierRepository.js';

const getCourier = async (req: Request, res: Response) => {
  const courierId = parseInt(req.params.id);
  try {
    const courier = await courierRepo.getCourier(courierId);
    console.log(courier);
    res.status(200).json(courier);
  } catch (err) {
    res
      .status(404)
      .send(`The courier with id: ${courierId} is not found. Error: ${err}`);
  }
};

const createCourier = async (req: Request, res: Response) => {
  try {
    const newCourier = await courierRepo.createCourier(req.body);
    res.status(201).json(newCourier);
  } catch (err) {
    res.status(400).send(`Courier was not successfully created. Error: ${err}`);
  }
};

const updateCourier = async (req: Request, res: Response) => {
  const courierId = parseInt(req.params.id);
  try {
    const updatedCourier = await courierRepo.updateCourier(courierId, req.body);
    res.status(200).json(updatedCourier);
  } catch (err) {
    res
      .status(404)
      .send(`The courier with id: ${courierId} is not found. Error: ${err}`);
  }
};

export default {
  getCourier,
  createCourier,
  updateCourier,
};
