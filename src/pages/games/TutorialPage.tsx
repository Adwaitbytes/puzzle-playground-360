
import { Background } from "@/components/Background";
import { ArrowLeft, BookOpen, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const tutorials = [
  {
    id: 1,
    title: "Basic Mathematics",
    modules: [
      { id: 1, name: "Addition & Subtraction", content: "Learn the basics of adding and subtracting numbers", completed: false },
      { id: 2, name: "Multiplication Tables", content: "Master multiplication tables from 1 to 12", completed: false },
      { id: 3, name: "Division Basics", content: "Understanding division and its applications", completed: false },
    ],
  },
  {
    id: 2,
    title: "Trigonometry Basics",
    modules: [
      { id: 4, name: "Understanding Sin, Cos, Tan", content: "Learn about sine, cosine, and tangent in a simple way", completed: false },
      { id: 5, name: "Right Triangle Basics", content: "How to use trigonometry in right triangles", completed: false },
      { id: 6, name: "Real-world Applications", content: "Practical uses of trigonometry in daily life", completed: false },
    ],
  },
  {
    id: 3,
    title: "Advanced Concepts",
    modules: [
      { id: 7, name: "Fractions & Decimals", content: "Working with fractions and decimal numbers", completed: false },
      { id: 8, name: "Basic Algebra", content: "Introduction to algebraic expressions", completed: false },
      { id: 9, name: "Geometry Basics", content: "Understanding shapes and measurements", completed: false },
    ],
  },
];

const TutorialPage = () => {
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [selectedModule, setSelectedModule] = useState<{ id: number; content: string } | null>(null);
  const { toast } = useToast();

  const toggleModule = (moduleId: number, content: string) => {
    setSelectedModule({ id: moduleId, content });
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
      toast({
        title: "Module Started",
        description: "Keep going! You're doing great!",
      });
    }
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

          <div className="grid md:grid-cols-2 gap-8">
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
                        onClick={() => toggleModule(module.id, module.content)}
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

            <div className="glass-card p-6 h-fit sticky top-24">
              {selectedModule ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Module Content</h3>
                  <p>{selectedModule.content}</p>
                  <Button 
                    className="w-full bg-accent hover:bg-accent-light"
                    onClick={() => {
                      toast({
                        title: "Module Completed",
                        description: "Great job! Move on to the next module.",
                      });
                    }}
                  >
                    Mark as Complete
                  </Button>
                </div>
              ) : (
                <p className="text-center text-white/60">Select a module to start learning</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TutorialPage;
