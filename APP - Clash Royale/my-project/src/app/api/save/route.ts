// app/api/save/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/mongoose';
import { PlayerModel } from '@/models/User';
import { BattleModel } from '@/models/Battle';

export async function POST(req: NextRequest) {
  try {
    await connect();

    const data = await req.json();
    console.log('[DADOS RECEBIDOS]', data);

    const { player, battles } = data;

    if (!player || !battles) {
      return NextResponse.json({ error: 'Faltam dados!' }, { status: 400 });
    }

    // Salva ou atualiza o jogador
    await PlayerModel.findOneAndUpdate(
      { tag: player.tag },
      {
        tag: player.tag,
        name: player.name,
        trophies: player.trophies,
        expLevel: player.expLevel,
        totalDonations: player.totalDonations,
      },
      { upsert: true, new: true }
    );

    // Prepara as batalhas formatadas
    const formattedBattles = battles.map((battle: any) => ({
      playerTag: player.tag,
      battleTime: battle.battleTime,
      type: battle.type,
      isLadderTournament: battle.isLadderTournament,
      arenaId: battle.arena?.id,
      challengeTitle: battle.challengeTitle,
      challengeWinCountBefore: battle.challengeWinCountBefore,
      challengeWinCountAfter: battle.challengeWinCountAfter,
      teamCrowns: battle.team?.[0]?.crowns || 0,
      opponentCrowns: battle.opponent?.[0]?.crowns || 0,
      teamTrophies: battle.team?.[0]?.startingTrophies || 0,
      opponentTrophies: battle.opponent?.[0]?.startingTrophies || 0,
      teamDeck: battle.team?.[0]?.cards?.map((c: any) => c.name) || [],
      opponentDeck: battle.opponent?.[0]?.cards?.map((c: any) => c.name) || [],
      winner:
        battle.team?.[0]?.crowns > battle.opponent?.[0]?.crowns
          ? "team"
          : battle.team?.[0]?.crowns < battle.opponent?.[0]?.crowns
          ? "opponent"
          : "draw",
      team: battle.team || [],
      opponent: battle.opponent || [],
    }));

    // Insere ou atualiza batalhas sem duplicar
    await BattleModel.bulkWrite(
      formattedBattles.map((battle:any) => ({
        updateOne: {
          filter: { playerTag: battle.playerTag, battleTime: battle.battleTime },
          update: { $set: battle },
          upsert: true,
        },
      }))
    );

    return NextResponse.json({ message: 'Jogador e batalhas salvos com sucesso!' });
  } catch (error) {
    console.error('[ERRO AO SALVAR]', error);
    return NextResponse.json({ error: 'Erro ao salvar dados' }, { status: 500 });
  }
}
