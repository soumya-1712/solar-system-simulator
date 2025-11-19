import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../store';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  color: white;
  font-family: 'Inter', sans-serif;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(20, 20, 30, 0.8);
  backdrop-filter: blur(10px);
  padding: 15px 25px;
  border-radius: 30px;
  display: flex;
  gap: 20px;
  align-items: center;
  pointer-events: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const Slider = styled.input`
  width: 150px;
  accent-color: #4B70DD;
`;

const InfoPanel = styled(motion.div)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  padding: 25px;
  pointer-events: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 90vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin: 0 0 10px 0;
  font-size: 2rem;
  background: linear-gradient(to right, #fff, #aaa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Stat = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #ccc;
  
  span:first-child {
    font-weight: 600;
    color: #888;
  }
`;

const Description = styled.p`
  line-height: 1.6;
  font-size: 0.95rem;
  color: #ddd;
  margin-top: 20px;
`;

const Interface = () => {
  const { selectedPlanet, setSelectedPlanet, isPlaying, togglePlay, simulationSpeed, setSimulationSpeed } = useStore();

  return (
    <Container>
      <Controls>
        <Button onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Speed</span>
          <Slider
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={simulationSpeed}
            onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
          />
        </div>
      </Controls>

      <AnimatePresence>
        {selectedPlanet && (
          <InfoPanel
            initial={{ x: 350, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 350, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <Button
              style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '1rem' }}
              onClick={() => setSelectedPlanet(null)}
            >
              ✕
            </Button>
            <Title>{selectedPlanet.name}</Title>
            <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '15px 0' }} />

            {selectedPlanet.details && Object.entries(selectedPlanet.details).map(([key, value]) => (
              <Stat key={key}>
                <span style={{ textTransform: 'capitalize' }}>{key}</span>
                <span>{value}</span>
              </Stat>
            ))}

            <Description>{selectedPlanet.description}</Description>
          </InfoPanel>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Interface;
