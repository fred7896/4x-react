import React from 'react';
import { useGameStore } from '../store/gameStore';

export default function Unit({ size }) {
    const unit = useGameStore((state) => state.unit);
    const selectUnit = useGameStore((state) => state.selectUnit);

    const width = size * 2;
    const height = Math.sqrt(3) * size;

    const x = size * 1.5 * unit.q;
    const y = height * (unit.r + 0.5 * (unit.q % 2));

    const style = {
        left: `${x + width / 2 - 8}px`,
        top: `${y + height / 2 - 8}px`,
    };

    return (
        <div
            className="unit"
            style={style}
            onClick={(e) => {
                e.stopPropagation(); // empêche de cliquer sur la tuile en-dessous
                selectUnit();
            }}
            title="Unité"
        />
    );
}
