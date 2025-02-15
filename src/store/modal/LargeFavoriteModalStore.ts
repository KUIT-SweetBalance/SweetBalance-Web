import { create } from 'zustand';

interface LargeFavoriteDrinkModalState {
  isOpen: boolean;
  cafeName?: string;
  drinkName?: string;
  imgUrl?: string;
  sugar?: number;
  syrupType?: string;
  syrup?: number;
  size?: string;
  openFavoriteModal: (drinkData: {
    cafeName: string;
    drinkName: string;
    imgUrl?: string;
    sugar?: number;
    syrupType?: string;
    syrup?: number;
    size?: string;
  }) => void;
  closeModal: () => void;
}

const useLargeFavoriteDrinkModalStore = create<LargeFavoriteDrinkModalState>((set) => ({
  isOpen: false,
  cafeName: '',
  drinkName: '',
  imgUrl: '',
  sugar: undefined,
  syrupType: '',
  syrup: undefined,
  size: '',
  openFavoriteModal: (drinkData) => {
    set({ isOpen: true, ...drinkData });
  },
  closeModal: () => set({ isOpen: false }),
}));

export default useLargeFavoriteDrinkModalStore;