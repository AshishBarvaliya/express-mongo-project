# README for Node.js Express and Mongoose API

This README document provides instructions on how to set up and use a Node.js Express API connected to a MongoDB database using Mongoose for managing products. The API allows for operations such as fetching, adding, updating, and deleting product records.

## Requirements

- Node.js
- MongoDB
- Express
- Mongoose
- CORS

## Setup

1.  **Install Node.js**: Ensure Node.js is installed on your system. You can download it from [Node.js official website](https://nodejs.org/).
2.  **Install MongoDB**: Follow the instructions on [MongoDB's official documentation](https://docs.mongodb.com/manual/installation/) to install MongoDB on your system.
3.  **Clone/Download the Project**: Clone or download the project to your local machine.
4.  **Install Dependencies**: Navigate to your project directory in the terminal and run the following command to install the necessary Node modules:

    ```javascript
    npm install express mongoose cors
    ```

6.  **Start MongoDB**: Ensure your MongoDB server is running.
7.  **Start the Application**: Run the following command in the terminal:

    ```javascript
    node <your-script-name>.js
    ```

## API Endpoints

### General Structure

- All responses are in JSON format.
- Error handling is included for database connection issues and invalid requests.

### Endpoints

1.  **GET `/`**: Returns a simple "Hello world!" message.
2.  **GET `/products`**: Fetches all products.
3.  **GET `/products/:id`**: Fetches a single product by its ID.
4.  **PUT `/products/:id`**: Updates a product by its ID with provided data.
5.  **DELETE `/products/:id`**: Deletes a product by its ID.
6.  **GET `/products/:id/:field`**: Fetches a specific field of a product by its ID.
7.  **PATCH `/products/:id/:field`**: Updates a specific field of a product by its ID.
8.  **GET `/products/page/:skip/:limit`**: Fetches products with pagination.

### Example Usage

### 1\. GET `/` (Root Endpoint)

Fetches a simple greeting message.

```javascript
    fetch('/').then(response => response.text())
        .then(data => console.log(data)); // Logs "Hello world!"
```

### 2\. GET `/products` (Fetch All Products)

Fetches all products from the database.

```javascript
    fetch('/products').then(response => response.json()).
        then(products => console.log(products)); // Logs all products
```

### 3\. GET `/products/:id` (Fetch Product by ID)

Fetches a single product by its ID.

`fetch('/products/1') // Replace 1 with the desired product ID   .then(response => response.json())   .then(product => console.log(product)); // Logs the product with ID 1`

### 4\. PUT `/products/:id` (Update Product by ID)

Updates a product's information by its ID.

```javascript 
    fetch('/products/1', { // Replace 1 with the product ID
        method: 'PUT',
        headers: {     'Content-Type': 'application/json',   },
        body: JSON.stringify({
                    name: 'Updated Product Name',
                    price: 200,
                    // Other fields to update
                    }),
        }).then(response => response.json())
        .then(updatedProduct => console.log(updatedProduct)); // Logs the updated product
```

### 5\. DELETE `/products/:id` (Delete Product by ID)

Deletes a product by its ID.

```javascript 
    fetch('/products/1', { // Replace 1 with the product ID to delete
     method: 'DELETE', }) .then(response => response.text())
    .then(result => console.log(result)); // Logs confirmation of deletion
```

### 6\. GET `/products/:id/:field` (Fetch Specific Field of a Product)

Fetches a specific field of a product by its ID.

```javascript
    fetch('/products/1/name') // Replace 1 with product ID, and 'name' with the desired field
    .then(response => response.json())
    .then(fieldData => console.log(fieldData)); // Logs the specific field data
```

### 7\. PATCH `/products/:id/:field` (Update Specific Field of a Product)

Updates a specific field of a product by its ID.

```javascript 
    fetch('/products/1/price', { // Replace 1 with product ID, and 'price' with the field to update
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: 300 }), // Set the new value for the field
    }).then(response => response.json()) 
    .then(updatedProduct => console.log(updatedProduct)); // Logs the updated product
```

### 8\. GET `/products/page/:skip/:limit` (Paginated Fetch of Products)

Fetches products with pagination, based on skip and limit parameters.

```javascript 
    fetch('/products/page/0/10') // Fetches the first 10 products
    .then(response => response.json())
    .then(products => console.log(products)); // Logs the fetched products
```

## Notes

- Ensure MongoDB is running and the connection string in the script matches your MongoDB setup.
- Customize the schema and routes as per your requirements.
- This API does not handle authentication. Implement security measures as needed.

## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
