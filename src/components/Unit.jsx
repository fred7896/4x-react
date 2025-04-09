import React from 'react';
import { useGameStore } from '../store/gameStore';
import classNames from 'classnames';

export default function Unit({ unit, size }) {
    const selectUnit = useGameStore((state) => state.selectUnit);

    const width = size * 2;
    const height = Math.sqrt(3) * size;

    const x = size * 1.5 * unit.q;
    const y = height * (unit.r + 0.5 * (unit.q % 2));

    const players = useGameStore((state) => state.players);
    const player = players.find((p) => p.id === 1); // ou associer via unit.ownerId
    const unitColor = player?.faction?.color || 'white';

    const style = {
        left: `${x + width / 2 - 8}px`,
        top: `${y + height / 2 - 8}px`,
        backgroundColor: unitColor,
    };

    return (
        <div
            className={classNames('unit', { selected: unit.selected })}
            style={style}
            onClick={(e) => {
                e.stopPropagation();
                selectUnit(unit.id);
            }}
            title={`Unité ${unit.id}`}
        />
    );
}

