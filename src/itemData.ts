import useSWR, { mutate } from "swr";

export interface ItemList {
  id?: number;
  image: string;
  title: string;
  unit: string;
  price: number;
  orderAvailableData: string;
  company: string;
}

const INIT_DATA: ItemList[] = [];

const itemListApi = async (date: string): Promise<ItemList[]> => {
  console.log(date);
  try {
    const res = await fetch(`http://localhost:8080/items/list`);
    // console.log(res);
    // console.log(res.status);
    if (res.status !== 200) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    // const initData = data.items; // 날짜를 키로 사용하여 아이템 가져오기
    const initData = data;

    if (initData) {
      return initData;
    } else {
      console.log("해당 날짜의 데이터가 없습니다.");
      return INIT_DATA; // 데이터가 없을 경우 초기 데이터 반환
    }
  } catch (e: any) {
    console.error("Error fetching data:", e);
    return INIT_DATA; // 오류 발생 시 초기 데이터 반환
  }
};

export const useItemData = (date: string) => {
  const {
    data: itemList,
    mutate,
    isValidating: isItemListValidating,
  } = useSWR<ItemList[]>(date ? date : null, itemListApi, {
    fallbackData: INIT_DATA,
    revalidateOnFocus: false,
  });
  console.log(itemList);
  return { itemList, isItemListValidating };
};
