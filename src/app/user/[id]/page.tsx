"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Importe useParams
import { z } from "zod";
import { User } from "../../../services/getUserService"; // Assure-toi que ce chemin est correct

// Définir le schéma Zod pour valider les données utilisateur
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
});

const UserPage = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL dynamique
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/user/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();

          // Valider les données avec Zod
          const validatedData = userSchema.parse(data);
          setUserData(validatedData);
        } catch (err) {
          if (err instanceof z.ZodError) {
            setError("Invalid user data format");
          } else if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>User Details</h1>
      {userData ? (
        <div>
          <p>{JSON.stringify(userData)}</p>
          <p>ID: {userData.id}</p>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default UserPage;
