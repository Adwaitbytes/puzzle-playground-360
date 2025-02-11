
import { Background } from "@/components/Background";
import { ArrowLeft, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMaster = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { toast } = useToast();

  const symbols = ['🌟', '🎈', '🎮', '🎲', '🎸', '🎨', '🚀', '🌈'];

  const initializeCards = () => {
    const duplicatedSymbols = [...symbols, ...symbols];
    const shuffledSymbols = duplicatedSymbols.sort(() => Math.random() - 0.5);
    const newCards = shuffledSymbols.map((symbol, index) => ({
      id: index,
      value: symbol,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setIsGameStarted(true);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || cards[cardId].isMatched || cards[cardId].isFlipped) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, cardId]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = flippedCards;

      if (cards[firstCard].value === cards[secondCard].value) {
        const newCards = [...cards];
        newCards[firstCard].isMatched = true;
        newCards[secondCard].isMatched = true;
        setCards(newCards);
        setMatchedPairs(matchedPairs + 1);
        setFlippedCards([]);
        
        toast({
          title: "Match found!",
          description: "Keep going!",
        });
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstCard].isFlipped = false;
          newCards[secondCard].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedPairs === symbols.length && isGameStarted) {
      toast({
        title: "Congratulations!",
        description: `You won in ${moves} moves!`,
      });
    }
  }, [matchedPairs]);

  return (
    <main className="min-h-screen relative pt-20">
      <Background />
      <div className="container mx-auto px-4 py-8">
        <Link to="/games" className="flex items-center gap-2 text-accent hover:text-accent-light mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Games
        </Link>
        
        <div className="glass-card p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gradient">Memory Master</h1>
            {isGameStarted && (
              <div className="flex items-center gap-4">
                <Brain className="w-6 h-6 text-accent" />
                <span className="text-xl">Moves: {moves}</span>
                <span className="text-xl">Matches: {matchedPairs}/{symbols.length}</span>
              </div>
            )}
          </div>

          {!isGameStarted ? (
            <div className="text-center">
              <p className="mb-4 text-lg">Match pairs of cards to win! Test your memory skills.</p>
              <Button onClick={initializeCards} className="bg-accent hover:bg-accent-light">
                Start Game
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`aspect-square text-4xl flex items-center justify-center rounded-lg transition-all duration-300 ${
                    card.isFlipped || card.isMatched
                      ? "bg-accent"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  disabled={card.isMatched}
                >
                  {(card.isFlipped || card.isMatched) && card.value}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MemoryMaster;
