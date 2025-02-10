
import { Brain, Puzzle, Calculator } from "lucide-react";

export const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="container px-4 mx-auto text-center z-10">
        <div className="animate-fade-up">
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-accent/10 text-accent">
            Welcome to the Future of Learning
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Learn. Play. Grow.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-2xl mx-auto">
            Master mathematics and cognitive skills through engaging puzzles and games
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {[
            {
              icon: Brain,
              title: "Cognitive Skills",
              description: "Enhance memory and problem-solving abilities",
            },
            {
              icon: Calculator,
              title: "Mathematics",
              description: "Learn complex concepts through interactive exercises",
            },
            {
              icon: Puzzle,
              title: "Puzzles",
              description: "Challenge yourself with engaging brain teasers",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 hover-card animate-fade-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <feature.icon className="w-12 h-12 mb-4 mx-auto text-accent" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>

        <button className="animate-fade-up bg-accent hover:bg-accent-light text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
          Start Learning Now
        </button>
      </div>
    </div>
  );
};
