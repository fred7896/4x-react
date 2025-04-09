import React from 'react';
import { useGameStore } from '../store/gameStore';

export default function PlayerInfo() {
    const player = useGameStore((state) =>
        state.players.find((p) => p.id === state.selectedPlayerId)
    );

    if (!player || !player.faction) return null;

    return (
        <div className="player-info" >
            <img
                src={player.faction.emblem}
                alt="emblème"
                style={{ width: 24, height: 24 }}
            />
            <span>
                {player.name} <span style={{ color: player.faction.color }}>({player.faction.name})</span>
            </span>
        </div>
    );
}
