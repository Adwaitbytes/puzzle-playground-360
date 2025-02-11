
import { Background } from "@/components/Background";
import { ArrowLeft, Puzzle, Calculator, Brain, Gamepad2, BookOpen, Lightbulb, Trophy } from "lucide-react";
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
      title: "Speed Math",
      description: "Race against time to solve math problems. Improve your mental calculation speed and accuracy.",
      icon: Gamepad2,
      level: "Intermediate",
      path: "/games/speed-math",
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
    <main className="min-h-screen relative pt-16 sm:pt-20">
      <Background />
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <Link to="/" className="flex items-center gap-2 text-accent hover:text-accent-light mb-4 sm:mb-8">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Back to Home</span>
        </Link>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gradient mb-2 sm:mb-0">Available Games</h1>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            <span className="text-sm sm:text-base text-white/80">Daily Rewards Available!</span>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white/90">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {games
                .filter(game => game.category === category)
                .map((game, index) => (
                  <Link
                    key={index}
                    to={game.path}
                    className="glass-card p-4 sm:p-6 hover-card group transition-all duration-300"
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <game.icon className="w-8 h-8 sm:w-12 sm:h-12 text-accent group-hover:text-accent-light transition-colors shrink-0" />
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{game.title}</h3>
                        <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm rounded-full bg-accent/10 text-accent">
                          {game.level}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-white/60 mb-3 sm:mb-4">{game.description}</p>
                    <div className="flex justify-end">
                      <span className="text-sm sm:text-base text-accent group-hover:text-accent-light transition-colors">
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
