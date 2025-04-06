import React, { useRef, useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import HexTile from './HexTile';
import Unit from './Unit';
import classNames from 'classnames';

export default function Map() {
    const map = useGameStore((state) => state.map);
    const selectedTile = useGameStore((state) => state.selectedTile);
    const size = 30;

    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const clickThreshold = 3;
    const [mouseDownPos, setMouseDownPos] = useState(null);
    const [clickEnabled, setClickEnabled] = useState(false);

    const velocityRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);
    const lastMousePos = useRef(null);

    const handleWheel = (e) => {
        e.preventDefault();

        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
        const newScale = Math.min(8, Math.max(0.5, scale * zoomFactor));
        const scaleRatio = newScale / scale;

        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const newOffsetX = mouseX - scaleRatio * (mouseX - offset.x);
        const newOffsetY = mouseY - scaleRatio * (mouseY - offset.y);

        setScale(newScale);
        setOffset({ x: newOffsetX, y: newOffsetY });
    };

    const isClick = (down, up) => {
        const dx = Math.abs(down.x - up.x);
        const dy = Math.abs(down.y - up.y);
        return dx < clickThreshold && dy < clickThreshold;
    };

    const handleMouseDown = (e) => {
        if (e.button !== 0) return;
        setIsDragging(true);
        setMouseDownPos({ x: e.clientX, y: e.clientY });
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
        document.body.style.userSelect = 'none';
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setOffset({ x: newX, y: newY });

        if (lastMousePos.current) {
            const dx = e.clientX - lastMousePos.current.x;
            const dy = e.clientY - lastMousePos.current.y;
            velocityRef.current = { x: dx, y: dy };
        }

        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const applyInertia = () => {
        const friction = 0.95;
        const minSpeed = 0.2;

        const vx = velocityRef.current.x * friction;
        const vy = velocityRef.current.y * friction;

        setOffset((prev) => ({
            x: prev.x + vx,
            y: prev.y + vy,
        }));

        velocityRef.current = { x: vx, y: vy };

        if (Math.abs(vx) > minSpeed || Math.abs(vy) > minSpeed) {
            requestAnimationFrame(applyInertia);
        } else {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.body.style.userSelect = '';
        lastMousePos.current = null;
        if (mouseDownPos && isClick(mouseDownPos, { x: event.clientX, y: event.clientY })) {
            setClickEnabled(true); // autoriser le clic sur une tuile
        } else {
            setClickEnabled(false); // empêcher le clic
        }
        setMouseDownPos(null);
        applyInertia();
    }

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('wheel', handleWheel, { passive: false });

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(animationRef.current);
        };
    }, [scale, offset, isDragging, dragStart]);

    return (
        <div
            className={classNames('map-container', { dragging: isDragging })}
            ref={containerRef}
            onMouseDown={handleMouseDown}
        >
            <div
                className="map-inner"
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    transformOrigin: '0 0',
                    position: 'absolute',
                }}
            >
                {map.map((col, q) =>
                    col.map((tile, r) => (
                        <HexTile
                            key={tile.id}
                            tile={tile}
                            size={size}
                            onTileClick={(tile) => {
                                if (clickEnabled) {
                                    useGameStore.getState().selectTile(tile);
                                }
                            }}
                        />

                    ))
                )}
                <Unit size={size} />
            </div>

            {selectedTile && (
                <div style={{ position: 'absolute', bottom: 10, left: 10, color: 'white' }}>
                    Tuile sélectionnée : ({selectedTile.q}, {selectedTile.r}) - {selectedTile.terrain}
                </div>
            )}
        </div>
    );
}
