Project Overview
This project is a RESTful API for managing personal financial records. Users can record their income and expenses, retrieve past transactions, and get summaries by category or time period.

Setup Instructions
Prerequisites:
Node.js
MongoDB installed locally or cloud service like MongoDB Atlas
Installation:
Clone the repository:


bash
cd expense-tracker
Install dependencies:

bash
npm install
Set up environment variables in a .env file:

Start the application:

npm start
Running the Application
The server will be running at http://localhost:8080.

API Documentation
POST /transactions
Create a new transaction.

Request Body:
json
Copy code
{
  "type": "income/expense",
  "category": "CategoryObjectId",
  "amount": 500,
  "description": "Freelance project"
}
Response:
json
{
  "_id": "TransactionId",
  "type": "income",
  "category": "CategoryObjectId",
  "amount": 500,
  "description": "Freelance project"
}
GET /transactions
Retrieve all transactions.

Response:
json
[
  {
    "_id": "TransactionId",
    "type": "income",
    "category": "CategoryObjectId",
    "amount": 500,
    "description": "Freelance project"
  }
]
GET /transactions/:id
Retrieve a transaction by ID.

PUT /transactions/:id
Update a transaction by ID.

DELETE /transactions/:id
Delete a transaction by ID.

GET /summary
Retrieve a summary of transactions, showing total income, total expenses, and balance.

Response:
json
{
  "totalIncome": 5000,
  "totalExpenses": 2000,
  "balance": 3000
}
Postman API Documentation
Make sure to provide screenshots of your API calls using Postman for each endpoint.

POST /transactions

GET /transactions

PUT /transactions/:id

DELETE /transactions/:id