// import plains from '../assets/tiles/plains_fusain.png';
// import forest from '../assets/tiles/forest_fusain.png';
// import mountain from '../assets/tiles/mountain_fusain.png';
// import desert from '../assets/tiles/desert_fusain.png';
// import snow from '../assets/tiles/snow_fusain.png';
// import water from '../assets/tiles/water_fusain.png';
import plains_1 from '../assets/tiles/plains-1.png';
import plains_2 from '../assets/tiles/plains-2.png';
import plains_3 from '../assets/tiles/plains-3.png';
import plains_4 from '../assets/tiles/plains-4.png';
import plains_5 from '../assets/tiles/plains-5.png';
import forest_1 from '../assets/tiles/forest-1.png';
import forest_2 from '../assets/tiles/forest-2.png';
import mountain_1 from '../assets/tiles/mountain-1.png';
import mountain_2 from '../assets/tiles/mountain-2.png';
import mountain_3 from '../assets/tiles/mountain-3.png';
import mountain_4 from '../assets/tiles/mountain-4.png';
import desert_1 from '../assets/tiles/desert-1.png';
import desert_2 from '../assets/tiles/desert-2.png';
import desert_3 from '../assets/tiles/desert-3.png';
import water_1 from '../assets/tiles/water-1.png';
import water_2 from '../assets/tiles/water-2.png';
import water_3 from '../assets/tiles/water-3.png';
import water_4 from '../assets/tiles/water-4.png';
import water_5 from '../assets/tiles/water-5.png';




export const terrainImages = {
    plains: [plains_1, plains_2, plains_3, plains_4, plains_5],
    forest: [forest_1, forest_2],
    mountain: [mountain_1, mountain_2, mountain_3, mountain_4],
    desert: [desert_1, desert_2, desert_3],
    water: [water_1, water_2, water_3, water_4, water_5],
};


export const terrainVariantWeights = {
    plains: [7, 5, 2, 1, 1], // plains-1 à plains-5
    forest: [3, 1],
    mountain: [1, 1, 1, 1],
    water: [1, 1, 3, 3, 1],
    desert: [1, 2, 1],
};