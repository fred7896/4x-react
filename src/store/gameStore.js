import { create } from 'zustand';
import { generateHexMap } from '../utils/mapGenerator';

export const useGameStore = create((set) => ({
    map: generateHexMap(10, 10),
    selectedTile: null,
    selectTile: (tile) => {
        console.log('Tuile sélectionnée :', tile);
        set({ selectedTile: tile });
    },
}));