import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, RingGeometry, DoubleSide } from 'three';
import { Html } from '@react-three/drei';
import { useStore } from '../store';

const CelestialBody = ({ data, isSun = false }) => {
    const meshRef = useRef();
    const orbitRef = useRef();
    const [hovered, setHovered] = useState(false);
    const { setSelectedPlanet, simulationSpeed, isPlaying } = useStore();

    // Load texture
    const texture = useLoader(TextureLoader, data.texture);
    const ringTexture = data.ringTexture ? useLoader(TextureLoader, data.ringTexture) : null;

    // Random starting angle
    const [angle] = useState(Math.random() * Math.PI * 2);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Self-rotation
        meshRef.current.rotation.y += data.rotationSpeed * (isPlaying ? simulationSpeed : 0);

        if (!isSun) {
            // Orbital motion
            const time = state.clock.getElapsedTime() * (isPlaying ? simulationSpeed : 0) * 0.1; // Scale down time
            const orbitalSpeed = 1 / data.period;
            const currentAngle = angle + time * orbitalSpeed;

            const x = Math.cos(currentAngle) * data.distance;
            const z = Math.sin(currentAngle) * data.distance;

            meshRef.current.position.x = x;
            meshRef.current.position.z = z;
        }
    });

    const handleClick = (e) => {
        e.stopPropagation();
        setSelectedPlanet(data);
    };

    return (
        <group>
            {/* Orbit Line */}
            {!isSun && (
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[data.distance - 0.1, data.distance + 0.1, 64]} />
                    <meshBasicMaterial color="#333" opacity={0.3} transparent side={DoubleSide} />
                </mesh>
            )}

            {/* Planet Mesh */}
            <mesh
                ref={meshRef}
                onClick={handleClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[data.radius, 32, 32]} />
                <meshStandardMaterial
                    map={texture}
                    emissive={isSun ? data.color : '#000'}
                    emissiveIntensity={isSun ? 2 : 0}
                />

                {/* Rings (Saturn) */}
                {data.ringTexture && (
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[data.radius * 1.4, data.radius * 2.5, 64]} />
                        <meshStandardMaterial map={ringTexture} side={DoubleSide} transparent opacity={0.8} />
                    </mesh>
                )}

                {/* Label on Hover */}
                {hovered && !isSun && (
                    <Html distanceFactor={15}>
                        <div style={{
                            color: 'white',
                            background: 'rgba(0,0,0,0.8)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none'
                        }}>
                            {data.name}
                        </div>
                    </Html>
                )}
            </mesh>
        </group>
    );
};

export default CelestialBody;
