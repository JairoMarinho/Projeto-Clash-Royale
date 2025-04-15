# 📊 Projeto Clash Royale - Análise de Dados com MongoDB, Next.js e TypeScript

## 🎯 Objetivo

Construir uma aplicação full-stack para análise de dados do jogo **Clash Royale**, com o intuito de fornecer suporte ao **balanceamento do jogo** por meio de estatísticas extraídas de partidas reais. A ferramenta permite identificar cartas e combinações desbalanceadas com base em vitórias e derrotas.

---

## 🛠️ Tecnologias Utilizadas

- **Next.js** – Framework React full-stack
- **TypeScript** – Superset de JavaScript com tipagem estática
- **Tailwind CSS** – Estilização rápida com classes utilitárias
- **MongoDB Atlas** – Banco de dados NoSQL em nuvem
- **Mongoose** – ODM para MongoDB
- **Chart.js** – Visualização de dados com gráficos
- **Axios** – Cliente HTTP para comunicação com APIs
- **Clash Royale API** – Fonte oficial de dados do jogo

---

## 🧱 Arquitetura

- **Frontend:** Next.js + TypeScript + Tailwind (SSR + SPA)
- **Backend:** API Routes do próprio Next.js
- **Banco de Dados:** MongoDB Atlas (armazenamento de dados de jogadores e batalhas)

---

## 🗃️ Modelagem do Banco de Dados

### 🔹 Coleção: `jogadores`
| Campo        | Tipo     | Descrição                     |
|--------------|----------|-------------------------------|
| `nickname`   | string   | Nome do jogador               |
| `tempo_jogo` | int      | Tempo total jogado (minutos)  |
| `trofeus`    | int      | Total de troféus              |
| `nivel`      | int      | Nível do jogador              |

### 🔹 Coleção: `batalhas`
| Campo              | Tipo         | Descrição                                 |
|--------------------|--------------|-------------------------------------------|
| `data`             | timestamp    | Data da partida                           |
| `jogador1`/`2`     | string       | Nicknames dos jogadores                   |
| `vencedor`         | string       | Vencedor da partida                       |
| `torres1`/`2`      | int          | Torres destruídas por cada jogador        |
| `deck1`/`2`        | array[string]| Cartas utilizadas                         |
| `trofeus1`/`2`     | int          | Troféus antes da partida                  |
| `tempo_batalha`    | int          | Duração da partida em segundos            |
| `torres_perdedor`  | int          | Torres restantes do perdedor              |
| `diferenca_trofeu` | int          | Diferença percentual de troféus           |

---

## 📈 Consultas Analíticas Disponíveis

1. **Porcentagem de vitórias/derrotas com a carta X** em intervalo definido.
2. **Decks com mais de X% de vitórias** em partidas registradas.
3. **Número de derrotas com combinações específicas** de cartas.
4. **Vitórias com a carta X**, com filtros de troféus, duração e destruição de torres.
5. **Combinações de N cartas com performance acima de Y%** em um período específico.

---

## 🔌 Integração com a API do Clash Royale

- A API oficial é utilizada para extrair **dados reais** do jogo, como:
  - Histórico de batalhas
  - Perfis de jogadores
  - Estatísticas de cartas
- Autenticação via **chave de API + IP autorizado**
- Dados recebidos em JSON são persistidos diretamente no MongoDB

---

## 💻 Interface Gráfica

Interface moderna e responsiva com **Next.js + Tailwind**:

- ⚙️ Formulários dinâmicos para filtros e parâmetros de análise
- 📊 Gráficos de pizza, barras e linhas com Chart.js
- 📋 Tabelas interativas com listagem de decks e jogadores
- 🔍 Filtros por troféus, tempo de batalha e cartas utilizadas

---

## ☁️ MongoDB Atlas

Banco de dados hospedado na nuvem com:

- Escalabilidade horizontal e alta disponibilidade
- Painel de gerenciamento com backups automáticos
- Conexão segura via string URI

---

## ✅ Conclusão

Este projeto demonstra como combinar tecnologias modernas para criar uma aplicação robusta de **análise de dados para jogos competitivos**. Utilizando **Next.js como full-stack framework**, com **MongoDB Atlas para armazenamento** e uma **interface rápida e moderna**, a solução é escalável, responsiva e altamente personalizável.



