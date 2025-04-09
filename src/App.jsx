import { useGameStore } from './store/gameStore';
import FactionSelector from './components/FactionSelector';
import GameUI from './components/GameUI';

function App() {
  const phase = useGameStore((state) => state.phase);

  return (
    <>
      {phase === 'setup' ? <FactionSelector /> : <GameUI />}
    </>
  );
}

export default App;
