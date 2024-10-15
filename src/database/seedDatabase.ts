import { AppDataSource } from './ormconfig.js';
import { MenuItem } from './entities/MenuItem.js';
import { Restaurant } from './entities/Restaurant.js';
import { User } from './entities/User.js';
import { faker } from '@faker-js/faker';

const seeding = async () => {
  const connectToDB = await AppDataSource.initialize();

  const userRepository = connectToDB.getRepository(User);
  const restaurantRepository = connectToDB.getRepository(Restaurant);
  const menuItemRepository = connectToDB.getRepository(MenuItem);

  const users = Array.from({ length: 5 }, () => {
    const user = new User();
    user.userName = faker.person.firstName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.address = faker.location.streetAddress();
    user.phoneNumber = faker.phone.number();
    user.role = 'user';
    return user;
  });

  await userRepository.save(users);

  const restaurants = await restaurantRepository.save(
    Array.from({ length: 20 }, () => {
      const restaurant = new Restaurant();
      restaurant.name = faker.company.name();
      restaurant.password = faker.internet.password();
      restaurant.address = faker.location.streetAddress();
      restaurant.phoneNumber = faker.phone.number();
      restaurant.email = faker.internet.email();
      restaurant.openingHours = '9 AM - 10 PM';
      restaurant.deliveryRadius = 5;
      restaurant.role = 'restaurant';
      return restaurant;
    })
  );

  for (const restaurant of restaurants) {
    const menuItems = Array.from({ length: 30 }, () => {
      const menuItem = new MenuItem();
      menuItem.name = faker.commerce.productName();
      menuItem.description = faker.commerce.productDescription();
      menuItem.price = Number(faker.commerce.price());
      menuItem.imageUrl = faker.image.url();
      menuItem.availability = true;
      menuItem.restaurant = restaurant;
      return menuItem;
    });

    await menuItemRepository.save(menuItems);
  }

  console.log(`seeding successful!`);
  await connectToDB.destroy();
};

seeding();
