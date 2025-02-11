
import { Brain, Home, Trophy, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Brain, label: "Games", path: "/games" },
    { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/50 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
            <span className="text-lg sm:text-xl font-bold">BrainQuest</span>
          </Link>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="sm:hidden p-2 text-white hover:text-accent transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop menu */}
          <div className="hidden sm:flex space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-1 hover:text-accent transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-2 py-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
