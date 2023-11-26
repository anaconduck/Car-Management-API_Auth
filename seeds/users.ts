import { Knex } from "knex";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

const hashedPassword = bcrypt.hashSync("12345678", 10);

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
  
  
      // Inserts seed entries
      await knex("users").insert([
        {
          username: "SuperAlex",
          email: "superalex@gmail.com",
          password: hashedPassword,
          role: "superadmin",
        },
      ]);
    } 
  }
