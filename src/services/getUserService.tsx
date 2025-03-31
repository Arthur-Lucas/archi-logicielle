import { z } from "zod";
import { faker } from "@faker-js/faker";

// Define the User schema using Zod
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
});

// Define the User type based on the schema
export type User = z.infer<typeof UserSchema>;

// Function to generate a random user
const generateRandomUser = (id: string): User => {
  return {
    id: id,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 99 }),
  };
};

// Mock service to fetch a user
export const getUserService = async (id: string): Promise<User> => {
  // Simulate an API call
  const data = generateRandomUser(id); // Simulate the response data

  // Validate the response data with Zod
  const user = UserSchema.parse(data);

  return user;
};
