
import { Background } from "@/components/Background";
import { ArrowLeft, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, name: "Alex", points: 2500, badge: "🏆", dailyChallenges: 95 },
    { rank: 2, name: "Sarah", points: 2350, badge: "🥈", dailyChallenges: 88 },
    { rank: 3, name: "Michael", points: 2200, badge: "🥉", dailyChallenges: 85 },
    { rank: 4, name: "Emma", points: 2100, badge: "", dailyChallenges: 82 },
    { rank: 5, name: "James", points: 2000, badge: "", dailyChallenges: 78 },
  ];

  return (
    <main className="min-h-screen relative pt-20">
      <Background />
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="flex items-center gap-2 text-accent hover:text-accent-light mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <div className="flex items-center justify-center mb-8">
          <Trophy className="w-8 h-8 text-accent mr-2" />
          <h1 className="text-4xl font-bold text-gradient">Leaderboard</h1>
        </div>
        
        <div className="glass-card p-6 max-w-2xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 text-left">Rank</th>
                  <th className="py-4 text-left">Player</th>
                  <th className="py-4 text-right">Daily Challenges</th>
                  <th className="py-4 text-right">Total Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((player) => (
                  <tr
                    key={player.rank}
                    className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4">
                      <span className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-accent">
                          #{player.rank}
                        </span>
                        <span className="text-2xl">{player.badge}</span>
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-xl">{player.name}</span>
                    </td>
                    <td className="py-4 text-right">
                      <span className="text-accent">{player.dailyChallenges}%</span>
                    </td>
                    <td className="py-4 text-right">
                      <span className="text-xl font-semibold text-accent">
                        {player.points} pts
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Leaderboard;
