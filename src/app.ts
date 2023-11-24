import express, { Application } from 'express';
import CarsHandler from './handlers/cars';
import fileUploadsCloudinary from "./utils/fileUploadsCloudinary";
import UsersHandler from "./handlers/users";
import AuthHandler from "./handlers/auth";
import AuthMiddleware from "./middlewares/auth";
import { Context } from "vm";

const app: Application = express();
const PORT: number = 8081;

// Add middleware to get the body from the request
app.use(express.json());
declare global {
  namespace Express {
    interface Request {
      context: Context;
    }
  }
}

// Init handlers
const usersHandler = new UsersHandler();
const authHandler = new AuthHandler();
const carsHandler = new CarsHandler();

//Define routers
//cars
app.get("/api/cars", AuthMiddleware.authenticateAdmin, carsHandler.getCars);
app.get(
  "/api/cars/:id",
  AuthMiddleware.authenticateAdmin,
  carsHandler.getCarsById
);
app.post(
  "/api/cars",
  AuthMiddleware.authenticateAdmin,
  fileUploadsCloudinary.single("profile_picture_url"),
  carsHandler.createCar
);
app.patch(
  "/api/cars/:id",
  AuthMiddleware.authenticateAdmin,
  fileUploadsCloudinary.single("profile_picture_url"),
  carsHandler.updateCarById
);
app.delete(
  "/api/cars/:id",
  AuthMiddleware.authenticateAdmin,
  carsHandler.deleteCarById
);

// Users
app.get(
  "/api/users",
  AuthMiddleware.authenticateSuperAdmin,
  usersHandler.getUsersByName
);
app.get(
  "/api/users/:id",
  AuthMiddleware.authenticateSuperAdmin,
  usersHandler.getUsersById
);
app.post(
  "/api/users",
  AuthMiddleware.authenticateSuperAdmin,
  usersHandler.createUser
);
app.patch(
  "/api/users/:id",
  AuthMiddleware.authenticateSuperAdmin,
  usersHandler.updateUserById
);
app.delete(
  "/api/users/:id",
  AuthMiddleware.authenticateSuperAdmin,
  usersHandler.deleteUserById
);

// Auth
// superadmin
app.post(
  "/api/auth/register-admin",
  AuthMiddleware.authenticateSuperAdmin,
  authHandler.registerAdmin
);
//regis only member role
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