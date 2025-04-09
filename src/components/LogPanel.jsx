import React from 'react';
import { useGameStore } from '../store/gameStore';

export default function LogPanel() {
    const logs = useGameStore((state) => state.logs);

    return (
        <div className="log-panel">
            {logs.slice(-5).map((log) => (
                <div
                    key={log.id}
                    style={{
                        color: log.message.startsWith('⚔️') ? '#ff6464' : '#7cd17c',
                    }}
                >
                    {log.message}
                </div>
            ))}
        </div>
    );
}
