import { create } from 'zustand';
import useLargeFavoriteDrinkModalStore from './LargeFavoriteModalStore';

interface EditDrinkModalState {
  isOpen: boolean;
  cafeName: string;
  drinkName: string;
  beverageId: number;
  content: string; // 본문 내용(추가하시겠어요? 삭제하시겠어요? 이런거)
  button1: string; // 왼쪽 버튼 내용(아니오)
  button2: string; // 오른쪽 버튼 내용(추가할래요, 삭제할래요)
  editCompleted?: string;
  openEditModal: (modalData: {
    cafeName: string;
    drinkName: string;
    content: string;
    button1: string;
    button2: string;
    editCompleted?: string;
  }) => void;
  closeModal: () => void;
}

const useEditDrinkModalStore = create<EditDrinkModalState>((set) => ({
  isOpen: false,
  cafeName: '',
  drinkName: '',
  beverageId: 0,
  content: '',
  button1: '',
  button2: '',
  editCompleted: '',
  openEditModal: (modalData) => {
    set({ isOpen: true, ...modalData });
  },
  closeModal: () => set({ isOpen: false }),
}));

export default useEditDrinkModalStore;
