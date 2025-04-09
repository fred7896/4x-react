import React from 'react';
import Map from './Map';
import PlayerInfo from './PlayerInfo';
import VictoryStatus from './VictoryStatus';

export default function GameUI() {
    return (
        <div className="game-ui" >
            <Map />

            <div
                className="wrapper-player-info"
            >
                <PlayerInfo />
                <VictoryStatus />
                {/* Plus tard : tabs, unité sélectionnée, ressources, etc. */}
            </div>
        </div>
    );
}
