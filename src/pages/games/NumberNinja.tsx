
import { Background } from "@/components/Background";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const generateQuestion = (level: number) => {
  const operations = ['+', '-', '×'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let num1, num2;

  switch (level) {
    case 1:
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      break;
    case 2:
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      break;
    default:
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
  }

  let answer;
  switch (operation) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '×':
      answer = num1 * num2;
      break;
    default:
      answer = num1 + num2;
  }

  const options = [
    answer,
    answer + Math.floor(Math.random() * 5) + 1,
    answer - Math.floor(Math.random() * 5) - 1,
    answer + Math.floor(Math.random() * 10) - 5
  ].sort(() => Math.random() - 0.5);

  return {
    question: `${num1} ${operation} ${num2} = ?`,
    options,
    answer: answer.toString()
  };
};

const NumberNinja = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion(1));
  const [gameActive, setGameActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let timer: number;
    if (gameActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      toast({
        title: "Time's up! 🎬",
        description: `Final Score: ${score}`,
      });
      setGameActive(false);
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameActive, score, toast]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setLevel(1);
    setCurrentQuestion(generateQuestion(1));
    setGameActive(true);
  };

  const handleAnswer = (selected: string) => {
    if (!gameActive) return;

    if (selected === currentQuestion.answer) {
      setScore(s => s + level);
      toast({
        title: "Correct! ⚔️",
        description: "+1 point!",
      });
      
      if (score > 0 && score % 5 === 0) {
        setLevel(l => l + 1);
        toast({
          title: "Level Up! 🥋",
          description: "The challenges will get harder!",
        });
      }
    } else {
      toast({
        title: "Not quite!",
        description: "Keep practicing!",
        variant: "destructive",
      });
    }
    
    setCurrentQuestion(generateQuestion(level));
  };

  return (
    <main className="min-h-screen relative pt-16 sm:pt-20">
      <Background />
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <Link to="/games" className="flex items-center gap-2 text-accent hover:text-accent-light mb-4 sm:mb-8">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Back to Games</span>
        </Link>
        
        <h1 className="text-2xl sm:text-4xl font-bold text-gradient mb-6">Number Ninja</h1>
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 glass-card mb-6">
            <div className="flex justify-between items-center mb-6">
              <div className="text-accent">Level: {level}</div>
              <div className="text-accent">Time: {timeLeft}s</div>
              <div className="text-accent">Score: {score}</div>
            </div>

            {!gameActive ? (
              <div className="text-center">
                <h2 className="text-xl mb-4">Ready to test your math skills?</h2>
                <Button 
                  onClick={startGame}
                  className="bg-accent hover:bg-accent-light"
                >
                  Start Game
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-center mb-8">{currentQuestion.question}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(option.toString())}
                      variant="outline"
                      className="w-full py-8 text-xl hover:bg-accent/20"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
};

export default NumberNinja;
