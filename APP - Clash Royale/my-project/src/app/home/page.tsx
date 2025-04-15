'use client';

import { useState } from 'react';

interface PlayerData {
  name: string;
  expLevel: number;
  trophies: number;
  totalDonations: number;
}

interface BattleData {
  id?: string; // Se tiver um ID único, substitui o uso do index
  winner: 'team' | 'opponent' | 'draw';
  teamCrowns: number;
  opponentCrowns: number;
  teamTrophies?: number;
  opponentTrophies?: number;
  teamDeck?: string[];
  opponentDeck?: string[];
}

export default function Home() {
  const [tag, setTag] = useState('');
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [battleData, setBattleData] = useState<BattleData[]>([]);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!tag.trim()) {
      setStatus('⚠️ Por favor, digite uma tag válida.');
      return;
    }

    const cleanTag = tag.replace('#', '').toUpperCase();
    const validTag = /^[0289PYLQGRJCUV]+$/;

    if (!validTag.test(cleanTag)) {
      setStatus('⚠️ Tag inválida. Verifique os caracteres.');
      return;
    }

    setStatus('🔎 Buscando dados...');
    setIsLoading(true);

    try {
      const playerRes = await fetch(`/api/player?tag=${cleanTag}`);
      if (!playerRes.ok) throw new Error('Erro ao buscar jogador');

      const playerJson = await playerRes.json();
      setPlayerData(playerJson);

      const battleRes = await fetch(`/api/battles?tag=${cleanTag}`);
      if (!battleRes.ok) throw new Error('Erro ao buscar batalhas');

      const battleJson = await battleRes.json();
      setBattleData(Array.isArray(battleJson) ? battleJson : []);

      setStatus('✅ Dados carregados!');
    } catch (error) {
      setStatus('❌ Erro ao buscar os dados.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!playerData || battleData.length === 0) {
      setStatus('⚠️ Nenhum dado para salvar.');
      return;
    }

    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player: playerData, battles: battleData }),
      });

      if (response.ok) {
        setStatus('💾 Dados salvos com sucesso!');
      } else {
        setStatus('❌ Erro ao salvar os dados.');
      }
    } catch (error) {
      setStatus('❌ Erro ao salvar os dados.');
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#0D0F1A] py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
          👑 Buscar Jogador Clash Royale
        </h1>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Digite a tag do jogador (sem #)"
            className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            disabled={isLoading}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? '🔄 Buscando...' : '📥 Buscar Dados'}
          </button>
        </div>

        {status && <p className="mb-4 text-sm text-gray-700">{status}</p>}

        {playerData && (
          <div className="mb-8 border-t border-gray-300 pt-4">
            <h2 className="text-xl font-semibold mb-2 text-blue-600">📊 Dados do Jogador</h2>
            <ul className="space-y-1 text-gray-800">
              <li><strong>🧑 Nome:</strong> {playerData.name}</li>
              <li><strong>🔢 Nível de Experiência:</strong> {playerData.expLevel}</li>
              <li><strong>🏆 Troféus:</strong> {playerData.trophies}</li>
              <li><strong>🎁 Doações Totais:</strong> {playerData.totalDonations}</li>
            </ul>
          </div>
        )}

        {battleData.length > 0 && (
          <div className="mb-8 border-t border-gray-300 pt-4">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 flex items-center gap-2">
              🛡️ Histórico de Batalhas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {battleData.map((battle, index) => (
                <div key={battle.id ?? index} className="bg-[#2557E0] border border-gray-200 rounded-2xl shadow-md p-5 transition hover:scale-105">
                  <p className="mb-1">
                    🏆 <strong className="text-black-700">Resultado:</strong>{' '}
                    <span className={
                      battle.winner === 'team' ? 'text-green-600 font-semibold' :
                      battle.winner === 'opponent' ? 'text-red-600 font-semibold' :
                      'text-yellow-600 font-semibold'
                    }>
                      {battle.winner === 'team' ? 'Vitória' : battle.winner === 'opponent' ? 'Derrota' : 'Empate'}
                    </span>
                  </p>
                  <p className="mb-1">👑 <strong>Coroas:</strong> {battle.teamCrowns} x {battle.opponentCrowns}</p>
                  <p className="mb-1">📈 <strong>Troféus do Jogador:</strong> {battle.teamTrophies ?? 'Desconhecido'}</p>
                  <p className="mb-1">📉 <strong>Troféus do Oponente:</strong> {battle.opponentTrophies ?? 'Desconhecido'}</p>
                  <p className="mb-1">🃏 <strong>Deck do Jogador:</strong> {Array.isArray(battle.teamDeck) ? battle.teamDeck.join(', ') : 'Desconhecido'}</p>
                  <p className="mb-1">🧙 <strong>Deck do Oponente:</strong> {Array.isArray(battle.opponentDeck) ? battle.opponentDeck.join(', ') : 'Desconhecido'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {playerData && battleData.length > 0 && (
          <button
            onClick={handleSave}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            💾 Salvar Dados no MongoDB
          </button>
        )}
      </div>
    </main>
  );
}
