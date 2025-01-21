import { useEffect, useState } from "react";
import getDate from "../components/getDate";
import { OrderingContainer } from "./styles";
import "react-datepicker/dist/react-datepicker.css"; // 기본 스타일 import
import Calendar from "../components/Calendar";
import ItemRow from "../components/ItemRow";
import { ItemList, useItemData } from "../itemData";
import { OrderList } from "../orderData";
import OrderRow from "../components/OrderRow";

interface CheckedData {
  [key: number]: boolean; // 체크박스 ID를 키로 하는 boolean 객체
}

function Ordering() {
  const [selectedDate, setSelectedDate] = useState<string | "">("");
  const [checkedData, setCheckedData] = useState<CheckedData>({});
  const { itemList, isItemListValidating } = useItemData(selectedDate);
  const [selectedItems, setSelectedItems] = useState<ItemList[]>([]); // 선택된 아이템 정보 상태
  const [orderData, setOrderData] = useState<OrderList[]>([]);

  // itemList의 타입 정의
  const safeItemList: ItemList[] = itemList || []; // itemList가 undefined일 경우 빈 배열로 설정

  const handleDateChange = (date: Date | null) => {
    if (date) {
      // 날짜를 "YYYY-MM-DD" 형식으로 변환
      // 로컬 시간대 기준으로 날짜 조정
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      const formattedDate = localDate.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식
      setSelectedDate(formattedDate);
      console.log(formattedDate);
    } else {
      setSelectedDate("");
    }
  };

  const handleCheckboxChange = (id: number) => {
    setCheckedData((prev) => {
      const newCheckedData = { ...prev, [id]: !prev[id] }; // 체크 상태 토글
      // 선택된 아이템 업데이트
      if (itemList) {
        const updatedSelectedItems = itemList.filter(
          (item) => item.id !== undefined && newCheckedData[item.id] // id가 undefined가 아닐 때만 체크
        );
        setSelectedItems(updatedSelectedItems); // 선택된 아이템 업데이트
        return newCheckedData;
      }
      return newCheckedData;
    });
  };

  const handleUpdateOrderList = async () => {
    // 체크된 아이템만 필터링 확인용
    // const checkedItems = Object.keys(checkedData)
    //   .filter((key) => checkedData[Number(key)]) // true인 값만 필터링
    //   .map((id) => Number(id)); // ID 배열로 변환

    // console.log(checkedItems);
    try {
      // 선택된 아이템을 날짜를 키로 하여 localStorage에 저장
      localStorage.setItem(selectedDate, JSON.stringify(selectedItems));
      // OrderData 객체 배열 생성
      const newOrders = selectedItems.map((item) => {
        return {
          id: item.id,
          title: item.title,
          quantity: 1,
          unit: item.unit,
          price: item.price,
          company: item.company,
        };
      });
      if (newOrders) {
        setOrderData(newOrders);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const initialDate = getDate(null);
    setSelectedDate(initialDate);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedDate !== null) {
        const cachedData = localStorage.getItem(selectedDate);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          console.log(parsedData);
          setOrderData(parsedData);
        } else {
          setOrderData([]);
        }
      }
    };

    fetchData(); // 비동기 함수 호출
  }, [selectedDate]);

  return (
    <OrderingContainer>
      <div id="ordering_main">
        <section>
          <div id="orderSearch">
            <span>발주가능 품목</span>
            <form action="">
              <select name="" id="">
                <option value="">사업장명</option>
                <option value="">상품명</option>
                <option value="">상품코드</option>
              </select>
              <input type="text" />
              <button>검색</button>
            </form>
          </div>
          <div id="orderList">
            <span>발주서</span>
            <span id="toggleCalendar">
              <p>주문일자:</p>
              <Calendar onDateChange={handleDateChange} />
            </span>
          </div>
        </section>
        <section>
          <table>
            <thead>
              <tr>
                <th style={{ pointerEvents: "none" }}>
                  <input type="checkbox" />
                </th>
                <th>code</th>
                <th>품목사진</th>
                <th>품목명</th>
                <th>단위</th>
                <th>단가</th>
                <th>주문가능여부</th>
                <th>업장명</th>
              </tr>
            </thead>
            <ItemRow
              checkedData={checkedData}
              validate={isItemListValidating}
              itemList={safeItemList}
              onChange={handleCheckboxChange}
            />
          </table>
          <button
            className="flex items-center justify-center border border-white h-12 rounded-full mt-12 bg-[rgba(180,154,130)] cursor-pointer transition duration-300 hover:bg-brown-700"
            onClick={handleUpdateOrderList}
          >
            <svg
              className="text-white text-lg w-9 h-full"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </button>
          <table>
            <thead>
              <tr>
                <th style={{ pointerEvents: "none" }}>
                  <input type="checkbox" />
                </th>
                <th>품목명</th>
                <th>수량</th>
                <th>단위</th>
                <th>가격</th>
                <th>업장명</th>
                <th>확정여부</th>
              </tr>
            </thead>
            <OrderRow orderData={orderData} />
          </table>
        </section>
      </div>
    </OrderingContainer>
  );
}

export default Ordering;
