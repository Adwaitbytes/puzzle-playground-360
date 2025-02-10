
import { Background } from "@/components/Background";
import { ArrowLeft, BookOpen, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const tutorials = [
  {
    id: 1,
    title: "Basic Mathematics",
    modules: [
      { id: 1, name: "Addition & Subtraction", completed: false },
      { id: 2, name: "Multiplication Tables", completed: false },
      { id: 3, name: "Division Basics", completed: false },
    ],
  },
  {
    id: 2,
    title: "Problem Solving",
    modules: [
      { id: 4, name: "Word Problems", completed: false },
      { id: 5, name: "Pattern Recognition", completed: false },
      { id: 6, name: "Logic Puzzles", completed: false },
    ],
  },
  {
    id: 3,
    title: "Advanced Concepts",
    modules: [
      { id: 7, name: "Fractions", completed: false },
      { id: 8, name: "Decimals", completed: false },
      { id: 9, name: "Basic Algebra", completed: false },
    ],
  },
];

const TutorialPage = () => {
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const toggleModule = (moduleId: number) => {
    setCompletedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <main className="min-h-screen relative pt-20">
      <Background />
      <div className="container mx-auto px-4 py-8">
        <Link to="/games" className="flex items-center gap-2 text-accent hover:text-accent-light mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Games
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-bold text-gradient">Learn & Practice</h1>
          </div>

          <div className="space-y-8">
            {tutorials.map((section) => (
              <div key={section.id} className="glass-card p-6">
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <div className="space-y-3">
                  {section.modules.map((module) => (
                    <Button
                      key={module.id}
                      variant="outline"
                      className={`w-full justify-between ${
                        completedModules.includes(module.id)
                          ? 'bg-accent/20 hover:bg-accent/30'
                          : 'hover:bg-white/10'
                      }`}
                      onClick={() => toggleModule(module.id)}
                    >
                      <span>{module.name}</span>
                      {completedModules.includes(module.id) && (
                        <Check className="w-5 h-5 text-accent" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default TutorialPage;
