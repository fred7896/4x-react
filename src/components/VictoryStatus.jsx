import React from 'react';
import { useGameStore } from '../store/gameStore';

export default function VictoryStatus() {
    const getVictoryControl = useGameStore(state => state.getVictoryControl);
    const players = useGameStore(state => state.players);
    const control = getVictoryControl();

    return (
        <div style={{ color: 'white', padding: '10px' }}>
            <h4>Contrôle des objectifs</h4>
            <ul>
                {control.map((entry) => {
                    const player = players.find(p => p.id === entry.ownerId);
                    return (
                        <li key={entry.tileId}>
                            <span style={{ color: player?.faction?.color || 'white' }}>
                                {player?.name || 'Inconnu'}
                            </span> contrôle la tuile {entry.tileId}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
