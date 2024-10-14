## Part 1: API Requirements for E-Commerce Food Ordering and Delivery System

### **User Management**

#### **1. Create User**
- **POST** `/api/users/`
  - **Description**: Register a new user.
  - **Body**:
    ```json
    {
      "userName": "string",
      "email": "string",
      "password": "string",
      "address": "string",
      "phoneNumber": "string"
    }
    ```
  - **Response**: Newly created user details.

#### **2. Get Users**
- **GET** `/api/users/`
  - **Description**: Retrieve all users with pagination.
  - **Query Params**:
    - `page`: Number, optional, for pagination (default: 1).
    - `limit`: Number, optional, for pagination (default: 10).
  - **Response**: List of users with pagination details.

#### **3. Get User by ID**
- **GET** `/api/users/:user_id`
  - **Description**: Retrieve a specific user by their ID.
  - **Response**: User details.

#### **4. Update User**
- **PATCH** `/api/users/:user_id`
  - **Description**: Update user profile information.
  - **Body**:
    ```json
    {
      "userName": "string",
      "address": "string",
      "phoneNumber": "string"
    }
    ```
  - **Response**: Updated user details.

#### **5. Delete User**
- **DELETE** `/api/users/:user_id`
  - **Description**: Remove a user account.
  - **Response**: Status message indicating successful deletion.

---

### **Restaurant Management**

#### **1. Create Restaurant**
- **POST** `/api/restaurants/`
  - **Description**: Register a new restaurant.
  - **Body**:
    ```json
    {
      "name": "string",
      "password": "string",
      "address": "string",
      "phoneNumber": "string",
      "email": "string",
      "openingHours": "string",
      "deliveryRadius": "integer"
    }
    ```
  - **Response**: Newly created restaurant details.

#### **2. Get Restaurants**
- **GET** `/api/restaurants/`
  - **Description**: Retrieve all restaurants with filtering and pagination.
  - **Query Params**:
    - `page`: Number, optional, for pagination (default: 1).
    - `limit`: Number, optional, for pagination (default: 10).
    - `category`: (optional) Filter by menu item category.
    - `search`: (optional) Search by keyword (restaurant name or menu item name).
  - **Response**: List of restaurants with pagination and any applied filters.

#### **3. Get Restaurant by ID**
- **GET** `/api/restaurants/:restaurant_id`
  - **Description**: Retrieve a specific restaurant by its ID.
  - **Response**: Restaurant details, including menu items.

#### **4. Update Restaurant**
- **PATCH** `/api/restaurants/:restaurant_id`
  - **Description**: Update restaurant information.
  - **Body**:
    ```json
    {
      "name": "string",
      "address": "string",
      "phoneNumber": "string",
      "openingHours": "string",
      "isOpen": "boolean"
    }
    ```
  - **Response**: Updated restaurant details.

#### **5. Delete Restaurant**
- **DELETE** `/api/restaurants/:restaurant_id`
  - **Description**: Remove a restaurant.
  - **Response**: Status message indicating successful deletion.

---

### **Menu Item Management**

#### **1. Create Menu Item**
- **POST** `/api/restaurants/:restaurant_id/menu/`
  - **Description**: Add a new menu item to a specific restaurant.
  - **Body**:
    ```json
    {
      "name": "string",
      "description": "string",
      "price": "float",
      "imageUrl": "string",
      "availability": "boolean",
      "category": "string"
    }
    ```
  - **Response**: Newly created menu item details.

#### **2. Get Menu Items**
- **GET** `/api/restaurants/:restaurant_id/menu/`
  - **Description**: Retrieve all menu items for a restaurant, with filtering and pagination.
  - **Query Params**:
    - `page`: Number, optional, for pagination (default: 1).
    - `limit`: Number, optional, for pagination (default: 10).
    - `category`: (optional) Filter menu items by category.
    - `availability`: (optional) Filter by availability status.
  - **Response**: List of menu items matching any applied filter(s) and pagination details.

#### **3. Update Menu Item**
- **PATCH** `/api/restaurants/:restaurant_id/menu/:menuItem_id`
  - **Description**: Update a specific menu item for a restaurant.
  - **Body**:
    ```json
    {
      "name": "string",
      "description": "string",
      "price": "float",
      "availability": "boolean"
    }
    ```
  - **Response**: Updated menu item details.

#### **4. Delete Menu Item**
- **DELETE** `/api/restaurants/:restaurant_id/menu/:menuItem_id`
  - **Description**: Remove a menu item from a restaurant.
  - **Response**: Status message indicating successful deletion.

---

### **Order Management**

#### **1. Create Order**
- **POST** `/api/orders/`
  - **Description**: Place an order for items in the cart.
  - **Body**:
    ```json
    {
      "user_id": "integer",
      "restaurant_id": "integer",
      "items": [
        {
          "menuItem_id": "integer",
          "quantity": "integer"
        }
      ],
      "deliveryAddress": "string"
    }
    ```
  - **Response**: Details of the created order with status.

#### **2. Get Orders by User**
- **GET** `/api/users/:user_id/orders/`
  - **Description**: Retrieve all orders placed by a specific user with pagination.
  - **Query Params**:
    - `page`: Number, optional, for pagination (default: 1).
    - `limit`: Number, optional, for pagination (default: 10).
    - `status`: (optional) Filter by order status.
  - **Response**: List of orders for the user, with pagination.

#### **3. Update Order Status**
- **PATCH** `/api/orders/:order_id/status`
  - **Description**: Update the status of an order (e.g., “Preparing”, “On the Way”, “Delivered”).
  - **Body**:
    ```json
    {
      "status": "string" // Possible values: "Preparing", "On the Way", "Delivered", etc.
    }
    ```
  - **Response**: Updated order status details.

#### **4. Get Order by ID**
- **GET** `/api/orders/:order_id`
  - **Description**: Retrieve details of a specific order by its ID.
  - **Response**: Order details including items, status, and delivery details.

---

### **Order Statistics**

#### **1. Get Order Statistics**
- **GET** `/api/orders/statistics`
  - **Description**: Retrieve statistics on orders, such as total orders, orders by status, and total revenue.
  - **Response**:
    ```json
    {
      "totalOrders": 150,
      "totalRevenue": 1230.50,
      "statusBreakdown": {
        "Preparing": 30,
        "On the Way": 20,
        "Delivered": 100
      }
    }
    ```
