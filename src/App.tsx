
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Games from "./pages/Games";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import MathGame from "./pages/games/MathGame";
import DailyChallenge from "./pages/games/DailyChallenge";
import TutorialPage from "./pages/games/TutorialPage";
import SpeedMath from "./pages/games/SpeedMath";
import MemoryMaster from "./pages/games/MemoryMaster";
import LogicPuzzle from "./pages/games/LogicPuzzle";
import WordProblems from "./pages/games/WordProblems";
import GraphMaster from "./pages/games/GraphMaster";
import PatternQuest from "./pages/games/PatternQuest";
import MathOlympics from "./pages/games/MathOlympics";
import NumberNinja from "./pages/games/NumberNinja";
import GeometryExplorer from "./pages/games/GeometryExplorer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/math" element={<MathGame />} />
          <Route path="/games/speed-math" element={<SpeedMath />} />
          <Route path="/games/memory" element={<MemoryMaster />} />
          <Route path="/games/logic" element={<LogicPuzzle />} />
          <Route path="/games/daily" element={<DailyChallenge />} />
          <Route path="/games/tutorials" element={<TutorialPage />} />
          <Route path="/games/word-problems" element={<WordProblems />} />
          <Route path="/games/graph-master" element={<GraphMaster />} />
          <Route path="/games/patterns" element={<PatternQuest />} />
          <Route path="/games/olympics" element={<MathOlympics />} />
          <Route path="/games/number-ninja" element={<NumberNinja />} />
          <Route path="/games/geometry" element={<GeometryExplorer />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
