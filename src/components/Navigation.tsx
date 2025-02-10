
import { Brain, Home, Trophy, User } from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/50 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold">BrainQuest</span>
          </Link>
          <div className="flex space-x-6">
            <Link to="/" className="flex items-center space-x-1 hover:text-accent transition-colors">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link to="/games" className="flex items-center space-x-1 hover:text-accent transition-colors">
              <Brain className="w-5 h-5" />
              <span>Games</span>
            </Link>
            <Link to="/leaderboard" className="flex items-center space-x-1 hover:text-accent transition-colors">
              <Trophy className="w-5 h-5" />
              <span>Leaderboard</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-1 hover:text-accent transition-colors">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
