import { create } from 'zustand';

export const useStore = create((set) => ({
    selectedPlanet: null,
    setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),
    simulationSpeed: 1,
    setSimulationSpeed: (speed) => set({ simulationSpeed: speed }),
    isPlaying: true,
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
