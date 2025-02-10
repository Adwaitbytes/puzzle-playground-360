
import { Background } from "@/components/Background";
import { ArrowLeft, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const DailyChallenge = () => {
  const [challenge, setChallenge] = useState<{
    question: string;
    options: string[];
    correct: number;
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would fetch from an API
    const dailyChallenge = {
      question: "If a train travels 120 kilometers in 2 hours, what is its average speed?",
      options: ["30 km/h", "60 km/h", "90 km/h", "120 km/h"],
      correct: 1,
    };
    setChallenge(dailyChallenge);
  }, []);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === challenge?.correct) {
      toast({
        title: "Congratulations!",
        description: "You've completed today's challenge successfully!",
      });
      setCompleted(true);
    } else {
      toast({
        title: "Incorrect",
        description: "Try again tomorrow for a new challenge!",
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
            <h1 className="text-3xl font-bold text-gradient">Daily Challenge</h1>
            <Trophy className="w-6 h-6 text-accent" />
          </div>

          {challenge && !completed ? (
            <div className="space-y-6">
              <p className="text-xl">{challenge.question}</p>
              <div className="space-y-3">
                {challenge.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full p-4 rounded ${
                      selectedAnswer === index
                        ? 'bg-accent text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full bg-accent hover:bg-accent-light"
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            </div>
          ) : completed ? (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-accent">Challenge Completed!</h2>
              <p>Come back tomorrow for a new challenge.</p>
              <Trophy className="w-12 h-12 text-accent mx-auto" />
            </div>
          ) : (
            <p>Loading challenge...</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default DailyChallenge;
