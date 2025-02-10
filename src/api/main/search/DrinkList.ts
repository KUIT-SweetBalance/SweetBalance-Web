import ApiManager from '../../ApiManager';

interface DrinkList {
  beverageId: number;
  name: string;
  brand: string;
  imgUrl: string;
  sugarPer100ml: number;
  favorite: boolean;
}

export interface DrinkListResponse {
  status: number;
  code: number;
  message: string;
  data: DrinkList[];
}

export const fetchDrinkList = async ({
  page,
  size,
  brandName,
  category,
  keyword,
  sort,
}: {
  page?: number;
  size?: number;
  brandName?: string;
  category?: string;
  keyword?: string;
  sort?: string;
}): Promise<DrinkListResponse> => {
  const params = {
    // brand: brandName,
    category: category,
    // keyword: keyword,
    sort: sort,
    page: page,
    size: size,
  };

  try {
    const response = await ApiManager.get<DrinkListResponse>(
      '/api/beverages/list',
      {
        params,
      },
    );
    console.log('fetchDrinkItem request succeeded');
    return response.data;
  } catch (error) {
    console.error('fetchDrinkItem request failed: ', error);
    throw error;
  }
};
