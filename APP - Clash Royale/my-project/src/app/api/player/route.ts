import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const rawTag = request.nextUrl.searchParams.get("tag");
  const tag = rawTag?.replace("#", "");

  if (!tag) {
    return NextResponse.json({ error: "Tag do jogador é obrigatória." }, { status: 400 });
  }

  const response = await fetch(`https://api.clashroyale.com/v1/players/%23${tag}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLASHE_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Erro ao buscar dados do jogador." }, { status: response.status });
  }

  const playerData = await response.json();

  // Devolve com os nomes que o frontend espera
  return NextResponse.json({
    name: playerData.name,
    expLevel: playerData.expLevel,
    trophies: playerData.trophies,
    totalDonations: playerData.totalDonations, // já se prepara para o campo "Doações"
  });
}
