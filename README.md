# Food Ordering Online System (Work in Progress)

## Overview

This is a **Food Ordering System** that enables users to order food from registered restaurants, track order statuses in real-time, and make payments. Restaurants can manage their menus and orders, while couriers can update delivery statuses. The app aims to streamline the food delivery experience using real-time updates via WebSockets.

This repository focuses on the **backend implementation** of the system, including the API development, business logic, and WebSocket integration.

---

## Features

### User
- **Registration & Login**: Users can create accounts and log in using email and password.
- **Profile Management**: Users can update profile details such as address and phone number.
- **Order History**: Users can view their past orders along with detailed status updates.
- **Notifications**: Real-time notifications for order status updates via WebSockets.

### Restaurant
- **Restaurant Registration**: Restaurants can register with required business details.
- **Profile Management**: Restaurants can manage opening hours, delivery radius, and contact information.
- **Menu Management**: Restaurants can add, update, and delete menu items.
- **Order Management**: Restaurants can manage incoming orders and communicate with couriers in real-time.

### Courier
- **Courier Registration**: Couriers can register and update their availability for delivery assignments.
- **Real-Time Delivery Updates**: Couriers can provide real-time status updates for ongoing deliveries using WebSockets.

### Order and Payment
- **Order Creation & Management**: Users can place and modify orders. Restaurants manage the order status.
- **Payment Processing**: Optional feature to handle payments and store payment history.

---

## Technologies Used

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with TypeORM
- **WebSockets**: Socket.IO
- **Deployment**: Docker, AWS

This repository contains only the **server-side** code.

---

## Table Structure

The project uses a relational database. Below are the key tables:

- **Users**: Stores user information (name, email, password, profile details).
- **Restaurants**: Stores restaurant details (name, contact, location, menu, etc.).
- **MenuItems**: Represents the food items that belong to restaurants.
- **Orders**: Contains information about orders placed by users.
- **OrderItems**: Stores individual items in each order.
- **Carts**: Temporarily holds items before an order is placed.
- **Couriers**: Stores courier information and status updates.
- **Payments**: Handles payment information for orders.
- **Reviews**: Stores user-submitted reviews for menu items.
- **Notifications**: Logs notifications related to order updates and status changes.

---

## API Endpoints

[Endpoints visualized](https://miro.com/app/board/uXjVLPdpN10=/)

### User
- **POST** `/users/register`: Register a new user.
- **POST** `/users/login`: User login.
- **GET** `/users/profile`: Get user profile details.
- **PUT** `/users/profile`: Update user profile.
- **GET** `/users/orders`: Get user's order history.

### Restaurant
- **POST** `/restaurants/register`: Register a new restaurant.
- **PUT** `/restaurants/profile`: Update restaurant profile.
- **POST** `/restaurants/menu`: Add a new menu item.
- **PUT** `/restaurants/menu/:menuItemId`: Update a menu item.
- **DELETE** `/restaurants/menu/:menuItemId`: Delete a menu item.
- **GET** `/restaurants/orders`: Get all orders for the restaurant.

### Menu Item
- **GET** `/restaurants/:restaurantId/menu`: Get all menu items for a restaurant.
- **GET** `/restaurants/:restaurantId/menu/:menuItemId`: Get details of a specific menu item.

### Order
- **POST** `/users/:userId/orders`: Create a new order.
- **PUT** `/users/:userId/orders/:orderId`: Update an existing order.
- **DELETE** `/users/:userId/orders/:orderId`: Cancel an order.
- **GET** `/users/:userId/orders/:orderId`: Get details of a specific order.
- **PUT** `/restaurants/orders/:orderId/status`: Update the status of an order (restaurant view).

### Courier
- **POST** `/couriers/register`: Register a new courier.
- **PUT** `/couriers/status`: Update courier availability.
- **GET** `/couriers/orders`: Get all assigned orders.

---

## WebSockets Implementation

### Real-Time Updates

WebSockets (using Socket.IO) are used to provide real-time communication between the server, couriers, and users. Key features include:

- **Order Status Updates**: When a restaurant changes the order status, users receive immediate updates.
- **Courier Updates**: Couriers notify users when the order is picked up or on the way.
- **User Notifications**: Users are notified in real-time about changes in their orders, such as when food is ready for pickup or out for delivery.

---

## Business Logic Overview

### User

1. **Registration**: Users provide a name, email, and password (hashed) to create an account.
2. **Login**: Users log in using email and password.
3. **Profile Management**: Users can update their details, such as address and phone number.
4. **Order History**: Users can view their past orders and current order statuses.
5. **Notifications**: Real-time notifications for order confirmations and delivery statuses.

### Restaurant

1. **Registration**: Restaurants can register with basic business details like name, email, address, etc.
2. **Profile Management**: Restaurants can manage delivery zones, contact information, and hours of operation.
3. **Menu Management**: Restaurants manage their food items, adding or removing them as needed.
4. **Order Management**: Restaurants handle incoming orders, updating statuses (e.g., preparing, ready for delivery) via the dashboard.

### Menu Item

1. **Menu Management**: Each menu item must belong to a restaurant. Fields include name, description, price, and availability.
2. **Review Management**: Users can leave reviews with ratings, and restaurants can view this feedback.

### Courier

1. **Registration**: Couriers can sign up using their name, email, and phone number.
2. **Availability Management**: Couriers update their availability to accept delivery tasks.
3. **Order Assignment**: Couriers are assigned orders by restaurants and receive notifications for new deliveries.
4. **Real-Time Updates**: Couriers notify users about the current status of the delivery via WebSockets.

### Order

1. **Order Creation**: Users select items and place orders, linking them to a restaurant.
2. **Order Management**: Users can update or cancel their orders. Restaurants can track and update order statuses.
3. **Order Status**: Changes in order status trigger real-time notifications to the users, handled via WebSockets.

### Payment

1. **Payment Processing**: Users can finalize orders with integrated payment options.
2. **Payment Status**: Payments are tracked and stored in the system, including transaction history.
3. **Failure Handling**: If a payment fails, users are notified and given the option to retry.

### Review

1. **Review Submission**: Users can review menu items they've ordered.
2. **Review Management**: Restaurants can view feedback to improve menu offerings and service quality.

---

## Future Improvements

- Implement full payment gateway integration.
- Extend WebSocket functionality for live chat between users and couriers.
- Improve admin dashboard features for better restaurant management.
- Add automated testing for all endpoints and logic.
