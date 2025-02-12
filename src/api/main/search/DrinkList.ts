import ApiManager from '../../ApiManager';
import { InfiniteData } from '@tanstack/react-query';

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

export type InfiniteDrinkListResponse = InfiniteData<DrinkListResponse>;

export const fetchDrinkList = async ({
  page,
  brandName,
  category,
  keyword,
  sort,
}: {
  page: number;
  brandName?: string;
  category?: string;
  keyword?: string;
  sort?: string;
}): Promise<DrinkListResponse> => {
  const params = {
    page: page,
    size: 50,
    brand: brandName,
    category: category,
    keyword: keyword,
    sort: sort,
  };

  try {
    const response = await ApiManager.get<DrinkListResponse>(
      '/api/beverages/list',
      {
        params,
      },
    );
    console.log('fetchDrinkList request succeeded');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('fetchDrinkList request failed: ', error);
    throw error;
  }
};
