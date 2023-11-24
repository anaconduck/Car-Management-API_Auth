import cloudinary from "../../config/cloudinary";
import { UserRequest } from "../models/dto/user";
import { User } from "../models/entity/user";
import UsersRepository from "../repositories/users";
import bcrypt from "bcrypt";

class UsersServices {
  //Create
  static async createUser(user: UserRequest): Promise<User> {
    try {
      const fileBase64 = user.profile_picture_file?.buffer.toString("base64");
      const file = `data:${user.profile_picture_file?.mimetype};base64,${fileBase64}`;

      // Async await
      const uploadedFile = await cloudinary.uploader.upload(file); // async

      // Encrypt password
      const encryptedPassword = bcrypt.hashSync(user.password, 10);
      const userToCreate: User = {
        email: user.email,
        name: user.name,
        password: encryptedPassword,
        role: user.role,
      };

      const createdUser = await UsersRepository.createUser(userToCreate);

      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  //Read
  static async getUsersById(queryId: number): Promise<User[]> {
    const listUser = await UsersRepository.getUsersById(queryId);

    return listUser;
  }
}

export default UsersServices;