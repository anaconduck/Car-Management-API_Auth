import { Knex } from "knex";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
  
    // Hash password using bcrypt
    const passwordSeed = process.env.PASSWORD_SEED;
  
    // Check if rawPassword is defined before hashing
    if (passwordSeed) {
      const hashedPassword = await bcrypt.hash(passwordSeed, 10);
  
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