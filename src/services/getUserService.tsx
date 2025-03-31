import { z } from "zod";
import { faker } from "@faker-js/faker";
import { createClient } from "@/utils/supabase.utils";

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
export const getUserService = async (id: string): Promise<User | null> => {
  const supabase = await createClient();
  // Simulate an API call
  const { data, error } = await supabase.from("users").select("*").single();
  console.log("Data Supabase :", data);
  console.log("ID Supabase :", id);
  if (error) {
    console.error("Erreur Supabase :", error);
  } else {
    console.log("Données retournées :", data);
  }
  if (!data) {
    // Si aucune donnée n'est trouvée, générer un utilisateur aléatoire
    return null;
  }
  // Valider la réponse avec Zod
  const user = UserSchema.parse(data);

  return user;
};
