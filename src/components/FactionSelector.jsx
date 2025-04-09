import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { factions as baseFactions } from '../data/factions';
import { emblems } from '../data/emblems';

export default function FactionSelector() {
    const setPlayerFaction = useGameStore((state) => state.setPlayerFaction);
    const players = useGameStore((state) => state.players);
    const player = players[0];

    const [customName, setCustomName] = useState('');
    const [customColor, setCustomColor] = useState('#cccccc');
    const [customEmblem, setCustomEmblem] = useState('🎯');

    const handleCustomFaction = () => {
        if (!customName.trim()) return;

        const customFaction = {
            id: `custom-${Date.now()}`,
            name: customName,
            color: customColor,
            emblem: customEmblem,
        };

        setPlayerFaction(customFaction); // passe directement l’objet
    };

    return (
        <div style={{ padding: 20, backgroundColor: '#111', color: 'white' }}>
            <h2>Choisissez votre faction</h2>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {baseFactions.map((faction) => (
                    <button
                        key={faction.id}
                        onClick={() => setPlayerFaction(faction.id)}
                        style={{
                            padding: 10,
                            backgroundColor: faction.color,
                            border: player.faction?.id === faction.id ? '2px solid white' : 'none',
                            borderRadius: 4,
                            color: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            src={faction.emblem}
                            alt={faction.name}
                            style={{
                                width: 24,
                                height: 24,
                                verticalAlign: 'middle',
                                marginRight: 8,
                            }} /> {faction.name}
                    </button>
                ))}
            </div>

            <hr style={{ margin: '20px 0', borderColor: '#444' }} />

            <h3>Créer votre propre faction</h3>
            <input
                type="text"
                placeholder="Nom de la faction"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                style={{ marginRight: 10 }}
            />
            <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                style={{ marginRight: 10 }}
            />
            <div style={{ margin: '10px 0' }}>
                <p style={{ marginBottom: 4 }}>Choisissez un emblème :</p>
                <div style={{ display: 'flex', gap: 10 }}>
                    {emblems.map((emblem) => (
                        <img
                            key={emblem.id}
                            src={emblem.src}
                            alt={emblem.id}
                            style={{
                                width: 32,
                                height: 32,
                                border: customEmblem === emblem.src ? '2px solid white' : '2px solid transparent',
                                borderRadius: 4,
                                cursor: 'pointer',
                            }}
                            onClick={() => setCustomEmblem(emblem.src)}
                        />
                    ))}
                </div>
            </div>
            <button onClick={handleCustomFaction} style={{ marginLeft: 10 }}>
                Créer
            </button>

            {player.faction && (
                <div style={{ marginTop: 20 }}>
                    Faction sélectionnée : <strong>
                        <img
                            src={player.faction.emblem}
                            alt="emblème"
                            style={{
                                width: 24,
                                height: 24,
                                verticalAlign: 'middle',
                                marginRight: 8,
                            }}
                        />
                        {player.faction.name}
                    </strong>

                </div>
            )}
        </div>
    );
}
