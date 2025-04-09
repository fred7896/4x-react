import React from 'react';
import { useGameStore } from '../store/gameStore';
import classNames from 'classnames';

export default function Unit({ unit, size }) {
    const selectUnit = useGameStore((state) => state.selectUnit);

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
        cursor: unit.ownerId === currentPlayer.id ? 'pointer' : 'not-allowed',
    };

    const handleClick = (e) => {
        e.stopPropagation();
        if (unit.ownerId !== currentPlayer.id) return;
        selectUnit(unit.id);
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

