import React from 'react';
import { useGameStore } from '../store/gameStore';

export default function TurnInfo() {
    const turnIndex = useGameStore(state => state.turnIndex);
    const players = useGameStore(state => state.players);
    const player = players[turnIndex];

    return (
        <div style={{
            color: player.faction?.color || 'white',
            fontWeight: 'bold',
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        }}>
            <span>
                Tour de {player.name} {player.isAI ? '(IA)' : '(Vous)'} — {player.faction?.name}
            </span>

            {player.faction?.emblem && (
                <img
                    src={player.faction.emblem}
                    alt={player.faction.name}
                    style={{ height: '24px', verticalAlign: 'middle' }}
                />
            )}
        </div>
    );
}
