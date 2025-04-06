import { create } from 'zustand';
import { generateHexMap } from '../utils/mapGenerator';

export const useGameStore = create((set, get) => ({
    map: generateHexMap(10, 10),
    selectedTile: null,
    selectTile: (tile) => {
        console.log('Tuile sélectionnée :', tile);
        set({ selectedTile: tile });

        const unit = get().unit;
        if (unit.selected && isNeighbor(unit, tile)) {
            set({ unit: { ...unit, q: tile.q, r: tile.r, selected: false } });
        }
    },
    unit: {
        q: 2,
        r: 2,
        selected: false,
    },
    selectUnit: () => {
        console.log('Unité sélectionnée :', get().unit);
        const unit = get().unit;
        set({ unit: { ...unit, selected: true } });
    },
}));

// Vérifie si une tuile est voisine (6 directions en hexagone flat-top)
function isNeighbor(unit, tile) {
    const evenQDirections = [
        [0, -1], [+1, -1], [+1, 0],
        [0, +1], [-1, 0], [-1, -1],
    ];

    const oddQDirections = [
        [0, -1], [+1, 0], [+1, +1],
        [0, +1], [-1, +1], [-1, 0],
    ];

    const directions = unit.q % 2 === 0 ? evenQDirections : oddQDirections;

    return directions.some(([dq, dr]) =>
        unit.q + dq === tile.q && unit.r + dr === tile.r
    );
}
