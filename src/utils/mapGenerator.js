class HexTile {
    constructor(q, r, terrain) {
        this.q = q; // colonne
        this.r = r; // ligne
        this.terrain = terrain;
        this.id = `${q},${r}`;
    }
}

export function generateHexMap(cols, rows) {
    const terrainTypes = ['plains', 'forest', 'mountain'];
    const map = [];

    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let q = 0; q < cols; q++) {
            const terrain = terrainTypes[Math.floor(Math.random() * terrainTypes.length)];
            row.push(new HexTile(q, r, terrain));
        }
        map.push(row);
    }
    return map;
}