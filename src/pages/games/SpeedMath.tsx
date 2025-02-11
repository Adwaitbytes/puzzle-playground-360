
import { Background } from "@/components/Background";
import { ArrowLeft, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const SpeedMath = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [problem, setProblem] = useState({ num1: 0, num2: 0, operation: '+' });
  const [answer, setAnswer] = useState("");
  const [isGameActive, setIsGameActive] = useState(false);
  const { toast } = useToast();

  const generateProblem = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    setProblem({ num1, num2, operation });
    setAnswer("");
  };

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isGameActive) {
      setIsGameActive(false);
      toast({
        title: "Time's up!",
        description: `Final score: ${score}`,
      });
    }
  }, [timeLeft, isGameActive, score]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsGameActive(true);
    generateProblem();
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
        description: "Keep going!",
      });
      generateProblem();
    } else {
      toast({
        title: "Wrong!",
        description: "Try again!",
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gradient">Speed Math</h1>
            <div className="flex items-center gap-4">
              <Timer className="w-6 h-6 text-accent" />
              <span className="text-xl font-bold">Time: {timeLeft}s</span>
              <span className="text-xl font-bold">Score: {score}</span>
            </div>
          </div>

          {!isGameActive ? (
            <div className="text-center">
              <p className="mb-4 text-lg">Solve as many math problems as you can in 60 seconds!</p>
              <Button onClick={startGame} className="bg-accent hover:bg-accent-light">
                Start Game
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-3xl text-center">
                {problem.num1} {problem.operation} {problem.num2} = ?
              </p>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="flex-1 p-2 text-center text-lg bg-white/10 rounded border border-white/20"
                  onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                />
                <Button onClick={checkAnswer} className="bg-accent hover:bg-accent-light">
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SpeedMath;
