import { create } from 'zustand';

interface AlarmInfoState {
  isOpen: boolean;
  date: string;
  time: string;
  image: string;
  cafeName: string;
  drinkName: string;
  sugar: number;
  syrupType?: string;
  syrup?: number;
  size: string;
  openAlarmInfoModal: (drinkData: {
    date: string;
    time: string;
    cafeName: string;
    drinkName: string;
    sugar: number;
    syrupType?: string;
    syrup?: number;
    size: string;
  }) => void;
  closeModal: () => void;
}

const useAlarmInfoModalStore = create<AlarmInfoState>((set) => ({
  isOpen: false,
  date: '',
  time: '',
  image: '',
  cafeName: '',
  drinkName: '',
  sugar: 0,
  syrupType: '',
  syrup: 0,
  size: '',
  openAlarmInfoModal: (drinkData) => {
    set({ isOpen: true, ...drinkData });
  },
  closeModal: () => set({ isOpen: false }),
}));

export default useAlarmInfoModalStore;