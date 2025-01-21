import useSWR from "swr";

export interface OrderList {
  id?: number;
  title: string;
  unit: string;
  price: number;
  quantity: number;
  orderAvailableData?: string;
  company: string;
}

const INIT_DATA: OrderList[] = [];

//로컬 스토리지 사용
export const orderFetcher = async (date: string) => {
  try {
    const value = localStorage.getItem(date);
    console.log(value);
    return value;
  } catch (e: any) {
    return INIT_DATA;
  }
};

//swr
const orderListApi = async (date: string): Promise<OrderList[]> => {
  try {
    const res = await fetch(`http://localhost:5173/order/${date}/data.json`);
    if (res.status !== 200) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    const initData = data.items; // 날짜를 키로 사용하여 아이템 가져오기

    if (initData) {
      return initData;
    } else {
      console.log("주문 데이터가 없습니다.");
      return INIT_DATA; // 데이터가 없을 경우 초기 데이터 반환
    }
  } catch (e: any) {
    console.error("Error fetching data:", e);
    return INIT_DATA; // 오류 발생 시 초기 데이터 반환
  }
};

export const useOrderData = (date: string) => {
  const {
    data: orderList,
    mutate,
    isValidating: isOrderListValidating,
  } = useSWR<OrderList[]>(date ? date : null, orderListApi, {
    fallbackData: INIT_DATA,
    revalidateOnFocus: false,
  });

  const createOrderData = async (date: string, newOrder: OrderList) => {
    // mutate를 호출하여 이전 데이터를 업데이트합니다.
    mutate(async (prevData: OrderList[] = [...INIT_DATA]) => {
      // 새로운 주문을 추가하는 로직
      const nextData = [...prevData, newOrder]; // 새로운 주문 추가

      try {
        const res = await fetch(`/order/${date}/data.json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // JSON 형식으로 데이터 전송
          },
          body: JSON.stringify(newOrder),
        });

        if (res.status !== 200) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        return nextData; // 업데이트된 데이터 반환
      } catch (e: any) {
        console.error("Error fetching data:", e);
        return prevData; // 오류 발생 시 이전 데이터 반환
      }
    }, false);
  };

  return { orderList, createOrderData, isOrderListValidating };
};
