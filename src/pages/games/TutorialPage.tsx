
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
      { 
        id: 1, 
        name: "Addition & Subtraction",
        content: `Let's start with the basics! 
        
        Addition (+) is combining numbers together to find their total. For example: 5 + 3 = 8
        
        Subtraction (-) is taking away one number from another. For example: 8 - 3 = 5
        
        Practice these operations with simple numbers first, then gradually increase difficulty.`,
        completed: false 
      },
      { 
        id: 2, 
        name: "Multiplication Tables", 
        content: `Multiplication is repeated addition. For example:
        
        3 × 4 means adding 3 four times: 3 + 3 + 3 + 3 = 12
        
        Quick tips for learning multiplication:
        - Start with 2, 5, and 10 times tables
        - Use patterns (5× always ends in 0 or 5)
        - Practice regularly with games and puzzles`,
        completed: false 
      },
      { 
        id: 3, 
        name: "Division Basics", 
        content: `Division is sharing into equal groups. For example:
        
        12 ÷ 3 = 4 means splitting 12 into 3 equal groups
        
        Remember:
        - Division is the opposite of multiplication
        - Can't divide by zero
        - Use multiplication to check your answer`,
        completed: false 
      },
    ],
  },
  {
    id: 2,
    title: "Trigonometry Basics",
    modules: [
      { 
        id: 4, 
        name: "Understanding Sin, Cos, Tan",
        content: `Let's make trigonometry simple!

        Picture a right triangle. SOH-CAH-TOA helps remember:
        
        Sin = Opposite/Hypotenuse
        Cos = Adjacent/Hypotenuse
        Tan = Opposite/Adjacent
        
        Common angles to remember:
        - Sin(30°) = 0.5
        - Cos(60°) = 0.5
        - Tan(45°) = 1`,
        completed: false 
      },
      { 
        id: 5, 
        name: "Right Triangle Basics",
        content: `Right triangles are special because:
        
        1. They have one 90° angle
        2. The other two angles add up to 90°
        3. We can use Pythagoras: a² + b² = c²
        
        Example:
        If a = 3 and b = 4, then
        c² = 3² + 4² = 9 + 16 = 25
        So c = 5`,
        completed: false 
      },
      { 
        id: 6, 
        name: "Real-world Applications",
        content: `Trigonometry is everywhere!
        
        Examples:
        1. Finding heights of buildings using shadows
        2. Navigation in games and maps
        3. Music (sound waves)
        4. Architecture
        
        Practice: Try measuring the height of a tree using its shadow and the angle of the sun!`,
        completed: false 
      },
    ],
  },
  {
    id: 3,
    title: "Advanced Concepts",
    modules: [
      { 
        id: 7, 
        name: "Fractions & Decimals",
        content: `Fractions are parts of a whole. Like slicing a pizza!
        
        Converting fractions to decimals:
        1/2 = 0.5
        1/4 = 0.25
        3/4 = 0.75
        
        Tips:
        - Multiply both top and bottom by same number
        - Use division to convert to decimal
        - Practice with real objects`,
        completed: false 
      },
      { 
        id: 8, 
        name: "Basic Algebra",
        content: `Algebra is like solving a puzzle where x is the missing piece!
        
        Example: x + 5 = 12
        
        To solve:
        1. Subtract 5 from both sides
        2. x = 7
        
        Remember:
        - What you do to one side, do to the other
        - Keep equations balanced`,
        completed: false 
      },
      { 
        id: 9, 
        name: "Geometry Basics",
        content: `Geometry is all about shapes and spaces!
        
        Key concepts:
        1. Area of square = side × side
        2. Area of circle = π × radius²
        3. Area of triangle = (base × height) ÷ 2
        
        Remember:
        - Angles in a triangle = 180°
        - Angles in a square = 360°`,
        completed: false 
      },
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
