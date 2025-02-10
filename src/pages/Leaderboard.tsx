
import { Background } from "@/components/Background";
import { Trophy } from "lucide-react";

const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, name: "Alex", points: 2500, badge: "🏆" },
    { rank: 2, name: "Sarah", points: 2350, badge: "🥈" },
    { rank: 3, name: "Michael", points: 2200, badge: "🥉" },
    { rank: 4, name: "Emma", points: 2100, badge: "" },
    { rank: 5, name: "James", points: 2000, badge: "" },
  ];

  return (
    <main className="min-h-screen relative pt-20">
      <Background />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Trophy className="w-8 h-8 text-accent mr-2" />
          <h1 className="text-4xl font-bold text-gradient">Leaderboard</h1>
        </div>
        <div className="glass-card p-6 max-w-2xl mx-auto">
          {leaderboardData.map((player) => (
            <div
              key={player.rank}
              className="flex items-center justify-between py-4 border-b border-white/10 last:border-0"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-accent">
                  #{player.rank}
                </span>
                <span className="text-xl">{player.name}</span>
                <span className="text-2xl">{player.badge}</span>
              </div>
              <span className="text-xl font-semibold text-accent">
                {player.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Leaderboard;
