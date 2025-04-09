import React from 'react';
import Map from './Map';
import PlayerInfo from './PlayerInfo';
import VictoryStatus from './VictoryStatus';
import TurnInfo from './TurnInfo';
import NextTurnButton from './NextTurnButton';
import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export default function GameUI() {
    const initializeGame = useGameStore(state => state.initializeGame);

    useEffect(() => {
        initializeGame();
    }, []);
    return (
        <div className="game-ui" >
            <Map />

            <div
                className="wrapper-player-info"
            >
                <PlayerInfo />
                <VictoryStatus />
                <TurnInfo />
                <NextTurnButton />
                {/* Plus tard : tabs, unité sélectionnée, ressources, etc. */}
            </div>
        </div>
    );
}
