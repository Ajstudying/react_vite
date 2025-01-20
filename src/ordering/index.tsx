import { useEffect, useState } from "react";
import getDate from "../components/getDate";
import { OrderingContainer } from "./styles";
import "react-datepicker/dist/react-datepicker.css"; // 기본 스타일 import
import Calendar from "../components/Calendar";
import ItemRow from "../components/ItemRow";
import { ItemList, useItemData } from "../itemData";

interface CheckedData {
  [key: number]: boolean; // 체크박스 ID를 키로 하는 boolean 객체
}

function Ordering() {
  const [selectedDate, setSelectedDate] = useState<string | "">("");
  const [checkedData, setCheckedData] = useState<CheckedData>({});
  const { itemList, isItemListValidating } = useItemData(selectedDate);

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
    setCheckedData((prevChecked) => ({
      ...prevChecked,
      [id]: !prevChecked[id],
    }));
  };

  const handleUpdateOrderList = async () => {
    try {
      // 체크된 아이템만 필터링
      const checkedItems = Object.keys(checkedData)
        .filter((key) => checkedData[Number(key)]) // true인 값만 필터링
        .map((id) => Number(id)); // ID 배열로 변환

      console.log(checkedItems);

      //       localStorage.setItem('key', JSON.stringify(data));
      // const cachedData = JSON.parse(localStorage.getItem('key'));
      // // 서버로 데이터 전송
      // const response = await fetch("/api/updateOrderList", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ selectedDate, checkedItems }), // 원하는 데이터 구조에 맞춰 조정
      // });

      // if (!response.ok) {
      //   throw new Error("서버에서 응답이 없습니다.");
      // }

      // const result = await response.json();
      // console.log(result); // 서버 응답 처리
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    const initialDate = getDate(null);
    setSelectedDate(initialDate);
  }, []);
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
          <button id="orderBtn" onClick={handleUpdateOrderList}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </button>
          <table></table>
        </section>
      </div>
    </OrderingContainer>
  );
}

export default Ordering;
