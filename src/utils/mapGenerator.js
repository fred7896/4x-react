import { terrainVariantWeights } from '../data/terrainImages';

export class HexTileData {
    constructor(q, r, terrain, variant = 0) {
        this.q = q;
        this.r = r;
        this.terrain = terrain;
        this.id = `${q},${r}`;
        this.variant = variant;
        this.unitId = null; // optionnel : id d’une unité présente sur la tuile
    }

    isPassable() {
        return !['mountain', 'water'].includes(this.terrain);
    }

    hasUnit() {
        return this.unitId !== null;
    }

    coordsMatch(q, r) {
        return this.q === q && this.r === r;
    }
}

export function generateHexMap(cols, rows, getVariant = () => 0) {
    const map = [];

    const terrainWeights = {
        plains: 5,
        forest: 4,
        desert: 2,
        mountain: 1,
        water: 1,
    };

    function weightedRandom(weights) {
        const entries = Object.entries(weights);
        const total = entries.reduce((sum, [, w]) => sum + w, 0);
        let rnd = Math.random() * total;
        for (const [key, weight] of entries) {
            rnd -= weight;
            if (rnd <= 0) return key;
        }
        return 'plains';
    }

    function weightedRandomIndex(weights) {
        const total = weights.reduce((sum, w) => sum + w, 0);
        let rnd = Math.random() * total;
        for (let i = 0; i < weights.length; i++) {
            rnd -= weights[i];
            if (rnd <= 0) return i;
        }
        return 0;
    }

    function getNeighborTerrains(map, q, r) {
        const offsetsEven = [
            [0, -1], [+1, -1], [+1, 0],
            [0, +1], [-1, 0], [-1, -1],
        ];
        const offsetsOdd = [
            [0, -1], [+1, 0], [+1, +1],
            [0, +1], [-1, +1], [-1, 0],
        ];

        const offsets = q % 2 === 0 ? offsetsEven : offsetsOdd;
        const neighbors = [];

        for (const [dq, dr] of offsets) {
            const nq = q + dq;
            const nr = r + dr;
            if (map[nq] && map[nq][nr]) {
                neighbors.push(map[nq][nr].terrain);
            }
        }
        return neighbors;
    }

    for (let q = 0; q < cols; q++) {
        const col = [];
        for (let r = 0; r < rows; r++) {
            const neighbors = getNeighborTerrains(map, q, r);
            const localWeights = { ...terrainWeights };

            for (const neighbor of neighbors) {
                if (neighbor in localWeights) {
                    localWeights[neighbor] += 1.5;
                }
            }

            const latitude = r / rows;
            if (latitude < 0.2) localWeights.snow += 4;
            if (latitude > 0.8) localWeights.desert += 4;
            if (q === 0 || r === 0 || q === cols - 1 || r === rows - 1) {
                localWeights.water += 2;
            }

            const terrain = weightedRandom(localWeights);

            const variantWeights = terrainVariantWeights[terrain];
            const variant = variantWeights
                ? weightedRandomIndex(variantWeights)
                : 0;

            col.push(new HexTileData(q, r, terrain, variant));
        }
        map.push(col);
    }

    const passableTiles = map.flat().filter(t => t.isPassable?.());
    const randomTile = passableTiles[Math.floor(Math.random() * passableTiles.length)];

    if (randomTile) {
        randomTile.isVictoryPoint = true;
    }



    return map;
}
