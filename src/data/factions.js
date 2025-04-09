import { emblems } from './emblems.js';

const getEmblem = (id) => emblems.find((e) => e.id === id)?.src;


export const factions = [
    {
        id: 'romans',
        name: 'Romains',
        color: '#6B00CB',
        emblem: getEmblem('rome'),
    },
    {
        id: 'greeks',
        name: 'Grecs',
        color: '#3366cc',
        emblem: getEmblem('grece'),
    },
    {
        id: 'egyptians',
        name: 'Égyptiens',
        color: '#035053',
        emblem: getEmblem('egypte'),
    },
];
