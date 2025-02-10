
import { Background } from "@/components/Background";
import { Puzzle, Calculator, Brain, Gamepad2, BookOpen, Lightbulb, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Games = () => {
  const games = [
    {
      title: "Math Challenge",
      description: "Test your mathematical skills with fun puzzles. Practice addition, subtraction, multiplication, and division with increasing difficulty levels.",
      icon: Calculator,
      level: "Beginner",
      path: "/games/math",
      category: "Mathematics",
    },
    {
      title: "Memory Master",
      description: "Enhance your memory with pattern recognition. Remember sequences, match pairs, and train your short-term memory.",
      icon: Brain,
      level: "Intermediate",
      path: "/games/memory",
      category: "Cognitive",
    },
    {
      title: "Logic Puzzles",
      description: "Solve challenging logic puzzles and brain teasers. Develop critical thinking and problem-solving skills.",
      icon: Puzzle,
      level: "Advanced",
      path: "/games/logic",
      category: "Logic",
    },
    {
      title: "Speed Math",
      description: "Race against time to solve math problems. Improve your mental calculation speed and accuracy.",
      icon: Gamepad2,
      level: "Intermediate",
      path: "/games/speed-math",
      category: "Mathematics",
    },
    {
      title: "Learn & Practice",
      description: "Interactive lessons and tutorials covering fundamental math concepts and problem-solving strategies.",
      icon: BookOpen,
      level: "All Levels",
      path: "/games/tutorials",
      category: "Learning",
    },
    {
      title: "Daily Challenge",
      description: "New puzzles every day! Complete daily challenges to earn points and climb the leaderboard.",
      icon: Lightbulb,
      level: "Mixed",
      path: "/games/daily",
      category: "Challenge",
    }
  ];

  const categories = Array.from(new Set(games.map(game => game.category)));

  return (
    <main className="min-h-screen relative pt-20">
      <Background />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gradient">Available Games</h1>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-accent" />
            <span className="text-white/80">Daily Rewards Available!</span>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-white/90">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games
                .filter(game => game.category === category)
                .map((game, index) => (
                  <Link
                    key={index}
                    to={game.path}
                    className="glass-card p-6 hover-card group transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <game.icon className="w-12 h-12 text-accent group-hover:text-accent-light transition-colors" />
                      <div>
                        <h3 className="text-xl font-semibold">{game.title}</h3>
                        <span className="inline-block px-3 py-1 text-sm rounded-full bg-accent/10 text-accent">
                          {game.level}
                        </span>
                      </div>
                    </div>
                    <p className="text-white/60 mb-4">{game.description}</p>
                    <div className="flex justify-end">
                      <span className="text-accent group-hover:text-accent-light transition-colors">
                        Play Now →
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Games;
