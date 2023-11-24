import { Model, ModelObject } from "objection";
import knexInstance from "../../../config/postgreesql";

export class UserEntity extends Model {
  id?: number;
  email!: string;
  name!: string;
  password!: string;
  role?: string;

  static get tableName() {
    return "users";
  }
}

Model.knex(knexInstance);

export type User = ModelObject<UserEntity>;