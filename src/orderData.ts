import useSWR from "swr";
import { revalidateEvents } from "swr/_internal";

const orderDataApi = fetch("assets/orderData.json").then((res) => res.json());

export interface OrderList {
  id?: number;
  product: string;
  unit: string;
  price: number;
  orderAvailableData: string;
  company: string;
}

const INIT_DATA: OrderList[] = [];

const orderFetcher = async () => {
  try {
    const data = await orderDataApi;
    return data;
  } catch (e: any) {
    return INIT_DATA;
  }
};

// export const useOrderData = () => {
//   const { data: OrderList, isValidating: isOrderListValidating } = useSWR<OrderList[]> (orderFetcher, {
//     fallbackData: INIT_DATA,
//     revalidateOnFocus
//   });
// };
