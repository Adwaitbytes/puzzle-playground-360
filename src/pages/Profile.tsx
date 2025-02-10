
import { Background } from "@/components/Background";
import { Badge, Brain, Star, Trophy } from "lucide-react";

const Profile = () => {
  const userStats = {
    name: "Player123",
    level: 15,
    xp: 2500,
    achievements: [
      { name: "First Win", icon: Trophy, description: "Win your first game" },
      { name: "Brain Master", icon: Brain, description: "Complete 10 puzzles" },
      { name: "Rising Star", icon: Star, description: "Reach level 10" },
    ],
  };

  return (
    <main className="min-h-screen relative pt-20">
      <Background />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                <Badge className="w-10 h-10 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{userStats.name}</h1>
                <p className="text-white/60">Level {userStats.level}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-full h-4 mb-2">
              <div
                className="bg-accent h-full rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <p className="text-sm text-white/60">
              {userStats.xp} / 5000 XP to next level
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userStats.achievements.map((achievement, index) => (
              <div key={index} className="glass-card p-4 hover-card">
                <achievement.icon className="w-8 h-8 text-accent mb-2" />
                <h3 className="font-semibold mb-1">{achievement.name}</h3>
                <p className="text-sm text-white/60">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
