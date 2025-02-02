import { create } from 'zustand';

// LFDModal(LargeFavoriteDrinkModal)
interface LargeFavoriteDrinkModalStore {
  isOpen: boolean; // 모달 상태
  openModal: () => void;
  closeModal: () => void;
}

const useLargeFavoriteDrinkModalStore = create<LargeFavoriteDrinkModalStore>((set) => ({
  isOpen: false, // 기본적으로 닫혀 있음
  openModal: () => set(() => ({ isOpen: true })), // 모달 열기
  closeModal: () => set(() => ({ isOpen: false })), // 모달 닫기
}));

export default useLargeFavoriteDrinkModalStore;