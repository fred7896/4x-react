
import { useGameStore } from '../store/gameStore';

export default function NextTurnButton() {

    const nextTurn = useGameStore(state => state.nextTurn);
    const playAITurn = useGameStore(state => state.playAITurn);
    const players = useGameStore(state => state.players);
    const turnIndex = useGameStore(state => state.turnIndex);

    const handleNextTurn = () => {
        nextTurn();
        const nextPlayer = players[(turnIndex + 1) % players.length];
        if (nextPlayer.isAI) {
            playAITurn();
        }
    };

    return (
        <button onClick={handleNextTurn} disabled={players[turnIndex].isAI}>
            Fin de tour
        </button>
    );
}