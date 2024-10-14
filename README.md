# Dashboard Application
This project is a simple dashboard application built using React and Mantine UI for the user interface, with JSON Server to mock API endpoints for data management. The project also includes Jest for unit testing to ensure code quality.

## Features
- React for building the UI
- Mantine UI component library for a modern, responsive design
- JSON Server to mock RESTful APIs for orders and users data
- Jest and React Testing Library for unit testing components and functionality

## Project Structure
<img width="589" alt="Screenshot 2024-10-14 at 10 26 51 AM" src="https://github.com/user-attachments/assets/63abeab1-316c-49e7-92c9-c385081843ba">

## Installation & Setup
### Prerequisites
Make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

### Install Dependencies
Clone the repository and install all dependencies using npm or yarn:
    git clone https://github.com/Salsabeal-Azzam/Octane-Dashboard-Project.git
    cd octane-dashboard
    npm install

### Run the Application
To run the project locally, start both the JSON Server and the React development server.

1- Start JSON Server (it runs on port 3001):
   npm run server
This will serve data from the db.json file located at the root of the project. You can access it at http://localhost:3001.

2- Start the React App (runs on port 3000):
   npm start

## Available Scripts
In the project directory, you can run:

### npm start
Runs the React app in development mode.
Open http://localhost:3000 to view it in the browser.

### npm run server
Starts the JSON Server to mock backend endpoints at http://localhost:3001.

### npm test
Launches the test runner in interactive watch mode. This will run all Jest unit tests.


## Testing
This project uses Jest and React Testing Library for unit tests. The tests ensure that the components render correctly and that interactions work as expected.

To run tests, use:
  npm test
Example unit tests can be found in the tests/ directory.

## API Routes (JSON Server)
The JSON Server simulates RESTful API calls. Below are some example routes you can interact with:

- GET /orders: Fetches a list of orders.
- GET /orders/:id: Fetches a specific order by ID.
- PATCH /orders/:id: Updates an order's status.
- DELETE /orders/:id: Deletes an order.
- GET /users: Fetches a list of users.
- PATCH /users/:id: Updates a user's status.
