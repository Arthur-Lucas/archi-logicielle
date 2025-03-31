import { NextResponse } from "next/server";
import { getUserService } from "../../../../services/getUserService"; // Vérifie le chemin

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Vérification de l'existence de l'ID dans params
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Appel du service pour récupérer les données utilisateur
    const user = await getUserService(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
