export interface BaseDrinkInfoProps {
  cafeName?: string;
  drinkName?: string;
  sugar?: number; // 당 포함량
  syrupType?: string; // 시럽 종류
  syrup?: number; //시럽량
  size?: string; // 음료 사이즈
}

export interface LargeFavoriteDrinkModalProps extends BaseDrinkInfoProps {
  onClose?: () => void;
}

export interface DrinkCardProps extends BaseDrinkInfoProps {
  image?: string;
  isAdded?: boolean; // 즐겨찾기 추가 여부
}

export interface DrinkInfoProps extends BaseDrinkInfoProps {
    dateAndTime?: string;
    cafeNameTop?: string;
    cafeNameMiddle?: string;
    cafeNameBottom?: string;
    isEditDeleteBtnExist?: boolean;
    isFavoriteBtnExist?: boolean;
}