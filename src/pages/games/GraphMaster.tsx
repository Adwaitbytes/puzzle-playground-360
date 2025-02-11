
import { Background } from "@/components/Background";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const data = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 2, y: 4 },
  { x: 3, y: 6 },
  { x: 4, y: 8 },
  { x: 5, y: 10 }
];

const questions = [
  {
    id: 1,
    question: "What is the slope of this line?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    explanation: "The slope is the change in y divided by the change in x. For each unit increase in x, y increases by 2."
  },
  {
    id: 2,
    question: "What is the y-intercept of this line?",
    options: ["-2", "0", "2", "4"],
    answer: "0",
    explanation: "The y-intercept is where the line crosses the y-axis (x = 0). At x = 0, y = 0."
  }
];

const GraphMaster = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (selected: string) => {
    const correct = selected === questions[currentQuestion].answer;
    
    if (correct) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job understanding the graph!",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Take another look at the graph and try again!",
        variant: "destructive",
      });
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    } else {
      toast({
        title: "Activity Complete! 📊",
        description: `You scored ${score} out of ${questions.length}!`,
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
        
        <h1 className="text-2xl sm:text-4xl font-bold text-gradient mb-6">Graph Master</h1>
        
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 glass-card mb-6">
            <div className="mb-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="y" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    variant="outline"
                    className="w-full text-lg py-6 hover:bg-accent/20"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {showExplanation && (
              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <h3 className="font-semibold mb-2">Explanation:</h3>
                <p>{questions[currentQuestion].explanation}</p>
                <Button 
                  className="mt-4 w-full bg-accent hover:bg-accent-light"
                  onClick={nextQuestion}
                >
                  Next Question
                </Button>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-accent font-semibold">Score: {score}/{questions.length}</p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default GraphMaster;
