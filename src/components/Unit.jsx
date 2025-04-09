import React from 'react';
import { useGameStore } from '../store/gameStore';
import { isNeighbor } from '../store/gameStore';
import classNames from 'classnames';

export default function Unit({ unit, size }) {

    const width = size * 2;
    const height = Math.sqrt(3) * size;

    const x = size * 1.5 * unit.q;
    const y = height * (unit.r + 0.5 * (unit.q % 2));

    const turnIndex = useGameStore((state) => state.turnIndex);
    const players = useGameStore((state) => state.players);
    const currentPlayer = players[turnIndex];
    const player = players.find((p) => p.id === unit.ownerId);
    const unitColor = player?.faction?.color || 'white';
    const emblemSrc = player?.faction?.emblem;

    const style = {
        left: `${x + width / 2 - 12}px`,
        top: `${y + height / 2 - 12}px`,
        //backgroundColor: unitColor,
        borderColor: unitColor,
        cursor: 'pointer',
    };

    const handleClick = (e) => {
        e.stopPropagation();

        const units = useGameStore.getState().units;
        const selectUnit = useGameStore.getState().selectUnit;
        const updateUnitPosition = useGameStore.getState().updateUnitPosition;

        const selectedUnit = units.find((u) => u.selected);
        const isOwnedByPlayer = unit.ownerId === currentPlayer.id;

        // 🎯 Cas 1 : attaque d'une unité ennemie
        if (
            selectedUnit &&
            selectedUnit.ownerId === currentPlayer.id &&
            !isOwnedByPlayer &&
            isNeighbor(selectedUnit, unit)
        ) {
            updateUnitPosition(selectedUnit.id, unit.q, unit.r);
            return;
        }

        // ✅ Cas 2 : sélection d'une unité du joueur
        if (isOwnedByPlayer) {
            selectUnit(unit.id);
            return;
        }

        // ❌ Cas 3 : clic hors permission
    };



    return (
        <div
            className={classNames('unit', { selected: unit.selected })}
            style={style}
            onClick={handleClick}
            title={`Unité ${unit.id}`}
        >
            {emblemSrc && (
                <img
                    src={emblemSrc}
                    alt="emblem"
                    style={{
                        height: '12px',
                        width: '12px',
                        position: 'absolute',
                        left: '50%',
                        top: '-50%',
                        objectFit: 'contain',
                        borderRadius: '50%',
                        border: `2px solid ${unitColor}`,
                        backgroundColor: unitColor,
                        padding: '2px',
                    }}
                />
            )}
        </div>
    );
}

