// app/api/battles/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const rawTag = request.nextUrl.searchParams.get("tag");
  const tag = rawTag?.replace("#", "");

  if (!tag) {
    return NextResponse.json({ error: "Tag do jogador é obrigatória." }, { status: 400 });
  }

  const response = await fetch(`https://api.clashroyale.com/v1/players/%23${tag}/battlelog`, {
    headers: {
      Authorization: `Bearer ${process.env.CLASHE_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Erro ao buscar batalhas." }, { status: response.status });
  }

  const rawData = await response.json();

  return NextResponse.json(rawData);
}
