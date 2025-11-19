import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { planetData } from '../data/planets';
import CelestialBody from './CelestialBody';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const Scene = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 50, 150]} fov={60} />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={20} maxDistance={500} />

                {/* Lighting */}
                <ambientLight intensity={0.1} />
                <pointLight position={[0, 0, 0]} intensity={2} decay={0} distance={1000} color="#fff" />

                {/* Background */}
                <Stars radius={300} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

                {/* Solar System */}
                {planetData.map((planet) => (
                    <CelestialBody
                        key={planet.id}
                        data={planet}
                        isSun={planet.id === 'sun'}
                    />
                ))}

                {/* Post Processing - Disabled for stability */}
                {/* <EffectComposer>
          <Bloom luminanceThreshold={0.9} intensity={1.5} levels={9} mipmapBlur />
        </EffectComposer> */}
            </Canvas>
        </div>
    );
};

export default Scene;
