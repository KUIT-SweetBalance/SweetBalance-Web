import { create } from 'zustand';

interface BottomNaviIndex {
  index: number;
  setBottomNaviIndex: (newIndex: number) => void;
}

const useBottomNaviIndex = create<BottomNaviIndex>((set) => ({
  index: 0,
  setBottomNaviIndex: (newIndex) => set({ index: newIndex }),
}));

export default useBottomNaviIndex;
