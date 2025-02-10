
import { Background } from "@/components/Background";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const MathGame = () => {
  const [score, setScore] = useState(0);
  const [problem, setProblem] = useState({ num1: 0, num2: 0, operation: '+' });
  const [answer, setAnswer] = useState('');
  const { toast } = useToast();

  const generateProblem = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    setProblem({ num1, num2, operation });
    setAnswer('');
  };

  const checkAnswer = () => {
    let correctAnswer;
    switch (problem.operation) {
      case '+':
        correctAnswer = problem.num1 + problem.num2;
        break;
      case '-':
        correctAnswer = problem.num1 - problem.num2;
        break;
      case '*':
        correctAnswer = problem.num1 * problem.num2;
        break;
      default:
        correctAnswer = 0;
    }

    if (Number(answer) === correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Well done! Here's your next problem.",
      });
      generateProblem();
    } else {
      toast({
        title: "Try Again",
        description: "That's not quite right. Keep trying!",
        variant: "destructive",
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
        
        <div className="glass-card p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gradient">Math Challenge</h1>
          <div className="text-center mb-8">
            <p className="text-2xl mb-4">Score: {score}</p>
            {problem.num1 === 0 ? (
              <Button onClick={generateProblem} className="bg-accent hover:bg-accent-light">
                Start Game
              </Button>
            ) : (
              <div className="space-y-4">
                <p className="text-3xl">
                  {problem.num1} {problem.operation} {problem.num2} = ?
                </p>
                <input
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-24 p-2 text-center text-lg bg-white/10 rounded border border-white/20"
                />
                <div>
                  <Button onClick={checkAnswer} className="bg-accent hover:bg-accent-light">
                    Check Answer
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MathGame;
