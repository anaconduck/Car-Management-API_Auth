import { raw } from "objection";
import { User, UserEntity } from "../models/entity/user";

class UsersRepository {
  //Create
  static async createUser(user: User): Promise<User> {
    const createdUser = await UserEntity.query().insert({
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
    });

    return createdUser;
  }

  //Read
  static async getUsersById(queryId: number): Promise<User[]> {
    const listUser = await UserEntity.query().where("id", queryId);
    return listUser;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserEntity.query()
      .where(raw('lower("email")'), "=", email)
      .first();

    if (user === undefined) {
      return null;
    }

    return user;
  }
}

export default UsersRepository;