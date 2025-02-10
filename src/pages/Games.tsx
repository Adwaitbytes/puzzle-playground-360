
import { Background } from "@/components/Background";
import { Puzzle, Calculator, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Games = () => {
  const games = [
    {
      title: "Math Challenge",
      description: "Test your mathematical skills with fun puzzles",
      icon: Calculator,
      level: "Beginner",
      path: "/games/math",
    },
    {
      title: "Memory Master",
      description: "Enhance your memory with pattern recognition",
      icon: Brain,
      level: "Intermediate",
      path: "/games/memory",
    },
    {
      title: "Logic Puzzles",
      description: "Solve challenging logic puzzles and brain teasers",
      icon: Puzzle,
      level: "Advanced",
      path: "/games/logic",
    },
  ];

  return (
    <main className="min-h-screen relative pt-20">
      <Background />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Available Games</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <Link
              key={index}
              to={game.path}
              className="glass-card p-6 hover-card group"
            >
              <game.icon className="w-12 h-12 mb-4 text-accent group-hover:text-accent-light transition-colors" />
              <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
              <p className="text-white/60 mb-4">{game.description}</p>
              <span className="inline-block px-3 py-1 text-sm rounded-full bg-accent/10 text-accent">
                {game.level}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Games;
