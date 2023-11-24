import express, { Application } from 'express';
import CarsHandler from './handlers/cars';
import fileUploadsCloudinary from "./utils/fileUploadsCloudinary";
import UsersHandler from "./handlers/users";
import AuthHandler from "./handlers/auth";
import AuthMiddleware from "./middlewares/auth";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const PORT=process.env.APP_PORT;;

// Add middleware to get the body from the request
app.use(express.json());

// Init handlers
const usersHandler = new UsersHandler();
const authHandler = new AuthHandler();
const carsHandler = new CarsHandler();

//Define routers

//cars
//Create
app.post(
  "/api/cars",
  AuthMiddleware.authenticateAdmin,
  fileUploadsCloudinary.single("car_img"),
  carsHandler.createCar
);

//Read
app.get("/api/cars", AuthMiddleware.authenticateAdmin, carsHandler.getCars);
app.get(
  "/api/cars/:id",
  AuthMiddleware.authenticateAdmin,
  carsHandler.getCarsById
);

//Update
app.patch(
  "/api/cars/:id",
  AuthMiddleware.authenticateAdmin,
  fileUploadsCloudinary.single("car_img"),
  carsHandler.updateCarById
);

//Delete
app.delete(
  "/api/cars/:id",
  AuthMiddleware.authenticateAdmin,
  carsHandler.deleteCarById
);

// Users
//Read
app.get(
  "/api/users/:id",
  AuthMiddleware.authenticateSuperAdmin,
  usersHandler.getUsersById
);

// Auth
// superadmin
app.post(
  "/api/auth/register-admin",
  AuthMiddleware.authenticateSuperAdmin,
  authHandler.registerAdmin
);
//member
app.post("/api/auth/register", authHandler.register);
app.post("/api/auth/login", authHandler.login);
app.get(
  "/api/auth/me",
  AuthMiddleware.authenticate,
  authHandler.getLoggedInUser
);


app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);  
});