
import { Background } from "@/components/Background";
import { ArrowLeft, Puzzle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface PuzzleQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const LogicPuzzle = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  const puzzles: PuzzleQuestion[] = [
    {
      question: "If all roses are flowers, and some flowers fade quickly, which statement must be true?",
      options: [
        "All roses fade quickly",
        "Some roses fade quickly",
        "No roses fade quickly",
        "All flowers are roses"
      ],
      correct: 1,
      explanation: "Since some flowers fade quickly and all roses are flowers, it's possible that some roses fade quickly. We can't say all roses fade quickly, but we know some might."
    },
    {
      question: "In a room of 30 people, if everyone shakes hands with everyone else exactly once, how many handshakes occur?",
      options: [
        "435",
        "900",
        "450",
        "465"
      ],
      correct: 0,
      explanation: "The formula is (n * (n-1)) / 2, where n is the number of people. So, (30 * 29) / 2 = 435 handshakes."
    },
    {
      question: "If you have a cube painted red on all sides and cut it into 27 smaller equal cubes (3x3x3), how many small cubes have exactly one face painted red?",
      options: [
        "6",
        "12",
        "18",
        "24"
      ],
      correct: 1,
      explanation: "The center pieces of each face of the original cube will have exactly one face painted red. There are 6 faces, and each face has 4 edge center pieces, making 24 total pieces with exactly one painted face."
    }
  ];

  const handleAnswer = (selectedOption: number) => {
    setSelectedAnswer(selectedOption);
    
    if (selectedOption === puzzles[currentQuestion].correct) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Well done! Let's see the explanation.",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Let's learn from this. Check the explanation.",
        variant: "destructive",
      });
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < puzzles.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameOver(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
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
            <h1 className="text-3xl font-bold text-gradient">Logic Puzzles</h1>
            <div className="flex items-center gap-4">
              <Puzzle className="w-6 h-6 text-accent" />
              <span className="text-xl">Score: {score}/{puzzles.length}</span>
            </div>
          </div>

          {!gameOver ? (
            <div className="space-y-6">
              <p className="text-xl mb-4">{puzzles[currentQuestion].question}</p>
              <div className="space-y-3">
                {puzzles[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 rounded text-left ${
                      selectedAnswer === index
                        ? index === puzzles[currentQuestion].correct
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showExplanation && (
                <div className="mt-6 p-4 bg-accent/10 rounded">
                  <h3 className="font-semibold mb-2">Explanation:</h3>
                  <p>{puzzles[currentQuestion].explanation}</p>
                  <Button
                    onClick={nextQuestion}
                    className="mt-4 bg-accent hover:bg-accent-light"
                  >
                    Next Question
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Game Over!</h2>
              <p>Final Score: {score}/{puzzles.length}</p>
              <Button onClick={restartGame} className="bg-accent hover:bg-accent-light">
                Play Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default LogicPuzzle;
