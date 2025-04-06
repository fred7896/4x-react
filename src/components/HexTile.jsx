import React from 'react';
import classNames from 'classnames';
import '../styles/components/map.less';

const terrainColors = {
    plains: '#8bc34a',
    forest: '#388e3c',
    mountain: '#795548',
};

export default function HexTile({ tile, size, onTileClick }) {
    const width = size * 2;
    const height = Math.sqrt(3) * size;

    const x = size * 1.5 * tile.q;
    const y = height * (tile.r + 0.5 * (tile.q % 2));

    const style = {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: terrainColors[tile.terrain] || '#ccc',
    };

    return (
        <div
            className={classNames('hex-tile')}
            style={style}
            onClick={() => onTileClick(tile)}
            title={`(${tile.q}, ${tile.r}) - ${tile.terrain}`}
        >
            <div className='border-container'></div>
        </div>
    );
}
