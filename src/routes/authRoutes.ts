import { Router } from 'express';
import authController from '../controllers/authController.js';
import auth from '../middlewares/auth.js';
import { User } from '../database/entities/User.js';
import { AppDataSource } from '../database/ormconfig.js';

const userRepository = AppDataSource.getRepository(User);

const router = Router();

router.get('/verify', auth, async (req, res) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await userRepository.findOneBy({ userName });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).send({
      message: 'User authenticated',
      data: { user },
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/refreshtoken', authController.handleRefreshTokenGeneration);

export default router;
