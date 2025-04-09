import { create } from 'zustand';
import { generateHexMap } from '../utils/mapGenerator';
import { factions } from '../data/factions';
import { terrainImages, terrainVariantWeights } from '../data/terrainImages';

export const useGameStore = create((set, get) => ({
    map: generateHexMap(20, 12, (terrain) => {
        const list = terrainImages[terrain];
        return list ? Math.floor(Math.random() * list.length) : 0;
    }),

    players: [
        {
            id: 1,
            name: 'Joueur 1',
            type: 'human',
            faction: null,
        },
    ],

    selectedPlayerId: 1,

    phase: 'setup', // 'setup' | 'game'

    startGame: () => {
        set({ phase: 'game' });
    },

    setPlayerFaction: (factionOrId) => {
        const selectedPlayerId = get().selectedPlayerId;
        const isObject = typeof factionOrId === 'object';

        const faction = isObject
            ? factionOrId
            : factions.find((f) => f.id === factionOrId);

        if (!faction) return;

        set((state) => ({
            players: state.players.map((player) =>
                player.id === selectedPlayerId
                    ? { ...player, faction }
                    : player
            ),
            phase: 'game',
        }));
    },

    selectedTile: null,

    units: [
        { id: 1, q: 2, r: 2, selected: false, ownerId: 1 },
        { id: 2, q: 4, r: 3, selected: false, ownerId: 2 },
    ],

    selectUnit: (id) => {
        set((state) => ({
            units: state.units.map((u) => ({
                ...u,
                selected: u.id === id,
            })),
        }));
    },

    selectTile: (tile) => {
        set({ selectedTile: tile });
        get().moveSelectedUnitTo(tile);
    },

    moveSelectedUnitTo: (tile) => {
        const units = get().units;
        const selectedUnit = units.find((u) => u.selected);
        if (!selectedUnit) return;

        if (
            isNeighbor(selectedUnit, tile) &&
            tile.isPassable() &&
            !tile.hasUnit()
        ) {
            // mise à jour des coordonnées de l'unité
            const updatedUnits = units.map((u) =>
                u.id === selectedUnit.id
                    ? { ...u, q: tile.q, r: tile.r, selected: false }
                    : u
            );

            // mise à jour de la map avec unitId
            const updatedMap = get().map.map((col) =>
                col.map((t) => {
                    if (t.coordsMatch(tile.q, tile.r)) {
                        t.unitId = selectedUnit.id;
                    } else if (t.unitId === selectedUnit.id) {
                        t.unitId = null;
                    }
                    return t;
                })
            );

            set({
                units: updatedUnits,
                map: updatedMap,
                selectedTile: tile,
            });
        }
    },

    getVictoryControl: () => {
        const { units, map } = get();

        const victoryTiles = map.flat().filter(t => t.isVictoryPoint);
        const controlled = [];

        for (const tile of victoryTiles) {
            const unit = units.find(u => u.q === tile.q && u.r === tile.r);
            if (unit) {
                controlled.push({
                    tileId: tile.id,
                    ownerId: unit.ownerId,
                });
            }
        }

        return controlled;
    }

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
