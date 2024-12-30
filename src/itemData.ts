import { useEffect, useState } from "react";
import useSWR from "swr";

export interface ItemList {
  id?: number;
  img: string;
  product: string;
  unit: string;
  price: number;
  orderAvailableData: string;
  company: string;
}

const INIT_DATA: ItemList[] = [];

const itemListApi = async (date: string) => {
  try {
    const res = await fetch("assets/itemData.json");
    const data = await res.json();
    const booleanStatus = data[date].status;
    const initData = data[date].items; // 날짜를 키로 사용하여 아이템 가져오기

    if (initData) {
      return { booleanStatus, initData };
    } else {
      console.log("해당 날짜의 데이터가 없습니다.");
      return { booleanStatus: false, initData: INIT_DATA }; // 데이터가 없을 경우 초기 데이터 반환
    }
  } catch (e: any) {
    console.error("Error fetching data:", e);
    return { booleanStatus: false, initData: INIT_DATA }; // 오류 발생 시 초기 데이터 반환
  }
};

export const useItemData = (date: string) => {
  const [itemListData, setItemListData] = useState<{
    booleanStatus: boolean;
    initData: ItemList[];
  }>({ booleanStatus: false, initData: INIT_DATA });
  const { booleanStatus, initData } = itemListData;
  const [shouldRender, setShouldRender] = useState<boolean>(false); // 렌더링 제어 상태

  useEffect(() => {
    const fetchData = async () => {
      const result = await itemListApi(date);

      // 서버에서 가져온 booleanStatus를 사용하여 렌더링 결정
      if (
        booleanStatus &&
        JSON.stringify(result.initData) !== JSON.stringify(INIT_DATA)
      ) {
        setItemListData(result);
        setShouldRender(true); // 데이터가 변경된 경우만 렌더링 허용
      } else {
        setShouldRender(false); // 데이터가 동일할 경우 렌더링 방지
      }
    };

    fetchData();
  }, [date, shouldRender]);

  const { data: ItemList, isValidating: isItemListValidating } = useSWR<
    ItemList[]
  >(shouldRender ? initData : null, {
    fallbackData: INIT_DATA,
    revalidateOnFocus: booleanStatus, // 포커스 시 재검증 여부 설정
  });

  return { ItemList, isItemListValidating };
};
