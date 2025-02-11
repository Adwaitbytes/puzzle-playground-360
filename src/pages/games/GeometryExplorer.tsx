
import { Background } from "@/components/Background";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const shapes = [
  {
    name: "Rectangle",
    properties: ["4 sides", "4 right angles", "Opposite sides parallel"],
    question: "What is the area of a rectangle with length 8 units and width 5 units?",
    options: ["13 sq units", "40 sq units", "26 sq units", "45 sq units"],
    answer: "40 sq units",
    explanation: "Area of rectangle = length × width = 8 × 5 = 40 square units"
  },
  {
    name: "Triangle",
    properties: ["3 sides", "3 angles", "Sum of angles = 180°"],
    question: "In a right triangle, if one angle is 30°, what is another angle?",
    options: ["60°", "45°", "90°", "120°"],
    answer: "60°",
    explanation: "In a right triangle, one angle is 90°. If another is 30°, the third must be 60° (as 90° + 30° + 60° = 180°)"
  },
  {
    name: "Circle",
    properties: ["Infinite symmetry", "All points equidistant from center"],
    question: "What is the area of a circle with radius 4 units? (Use π = 3.14)",
    options: ["25.12 sq units", "50.24 sq units", "12.56 sq units", "16.08 sq units"],
    answer: "50.24 sq units",
    explanation: "Area of circle = πr² = 3.14 × 4² = 3.14 × 16 = 50.24 square units"
  }
];

const GeometryExplorer = () => {
  const [currentShape, setCurrentShape] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (selected: string) => {
    const correct = selected === shapes[currentShape].answer;
    
    if (correct) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great understanding of geometry!",
        variant: "default",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Check the explanation to understand better!",
        variant: "destructive",
      });
    }
    setShowExplanation(true);
  };

  const nextShape = () => {
    if (currentShape < shapes.length - 1) {
      setCurrentShape(prev => prev + 1);
      setShowExplanation(false);
    } else {
      toast({
        title: "Exploration Complete! 🏆",
        description: `You scored ${score} out of ${shapes.length}!`,
      });
    }
  };

  return (
    <main className="min-h-screen relative pt-16 sm:pt-20">
      <Background />
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <Link to="/games" className="flex items-center gap-2 text-accent hover:text-accent-light mb-4 sm:mb-8">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Back to Games</span>
        </Link>
        
        <h1 className="text-2xl sm:text-4xl font-bold text-gradient mb-6">Geometry Explorer</h1>
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 glass-card mb-6 bg-secondary/30">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">{shapes[currentShape].name}</h2>
              <div className="bg-primary/20 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">Key Properties:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {shapes[currentShape].properties.map((prop, index) => (
                    <li key={index} className="text-white/90">{prop}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">{shapes[currentShape].question}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {shapes[currentShape].options.map((option) => (
                    <Button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="w-full py-6 text-lg bg-accent hover:bg-accent-light text-white"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {showExplanation && (
              <div className="mt-6 p-4 bg-primary/20 rounded-lg">
                <h3 className="font-semibold mb-2">Explanation:</h3>
                <p className="text-white/90">{shapes[currentShape].explanation}</p>
                <Button 
                  className="mt-4 w-full bg-accent hover:bg-accent-light"
                  onClick={nextShape}
                >
                  Next Shape
                </Button>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-accent font-semibold">Score: {score}/{shapes.length}</p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default GeometryExplorer;
