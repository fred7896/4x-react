import React from 'react';
import classNames from 'classnames';
import '../styles/components/map.less';
import { terrainImages } from '../data/terrainImages';
import { useGameStore } from '../store/gameStore';
import { isNeighbor } from '../store/gameStore';

const terrainColors = {
    plains: '#8ED081',
    forest: '#157145',
    mountain: '#856753',
    desert: '#ECC8AE',
    water: '#3DA5D9',
    snow: '#FFFCFF',
};

export default function HexTile({ tile, size, onTileClick }) {
    const width = size * 2;
    const height = Math.sqrt(3) * size;

    const x = size * 1.5 * tile.q;
    const y = height * (tile.r + 0.5 * (tile.q % 2));
    const backgroundImage = terrainImages[tile.terrain]?.[tile.variant];

    // console.log(tile.terrain);
    document.documentElement.style.setProperty(
        '--color-primary',
        terrainColors[tile.terrain] || terrainColors.plains
    );

    const style = {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };


    const handleClick = () => {
        const units = useGameStore.getState().units;
        const selectedUnit = units.find(u => u.selected);
        const updateUnitPosition = useGameStore.getState().updateUnitPosition;

        if (!selectedUnit) return;

        const targetUnit = units.find(u => u.q === tile.q && u.r === tile.r);

        // ✅ Déplacement ou attaque SEULEMENT si la tuile est voisine
        if (isNeighbor(selectedUnit, tile)) {
            updateUnitPosition(selectedUnit.id, tile.q, tile.r);
            return;
        }

        onTileClick(tile); // fallback si juste survol
    };


    return (
        <div
            className={classNames('hex-tile', {
                impassable: ['mountain', 'water'].includes(tile.terrain),
                occupied: tile.hasUnit?.() === true,
                victory: tile.isVictoryPoint === true,
            })}
            style={style}
            onClick={handleClick}
            title={`(${tile.q}, ${tile.r}) - ${tile.terrain}${tile.isVictoryPoint ? ' (Objectif)' : ''}`}

        >
            <div className={classNames('border-container', tile.terrain)}></div>
        </div>
    );
}
