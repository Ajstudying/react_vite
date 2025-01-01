import { useEffect, useState } from "react";
import getDate from "../components/getDate";
import { useItemData } from "../itemData";
import { OrderingContainer } from "./styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 기본 스타일 import
import Calendar from "../components/Calendar";

function Ordering() {
  const [date, setDate] = useState<string | "">("");

  useEffect(() => {
    const initialDate = getDate(null);
    setDate(initialDate);
  }, []);

  const { itemList, isItemListValidating } = useItemData(date);

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
              <Calendar />
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
                <th>품목코드</th>
                <th>품목사진</th>
                <th>품목명</th>
                <th>단위</th>
                <th>단가</th>
                <th>주문가능여부</th>
                <th>업장명</th>
              </tr>
            </thead>
            <tbody>
              {isItemListValidating ? (
                <tr>
                  <td>로딩중</td>
                </tr>
              ) : itemList ? ( // itemList가 비어 있지 않은 경우에만 map 실행
                itemList.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input type="checkbox" name="option1" value="value1" />
                    </td>
                    <td>{item.id}</td>
                    <td>
                      <img src={item.image} alt={item.title} />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.unit}</td>
                    <td>{item.price}</td>
                    <td>{item.orderAvailableData}</td>
                    <td>{item.company}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>데이터가 없습니다.</td>
                </tr> // 데이터가 없을 때 메시지 표시
              )}
            </tbody>
          </table>
          <button id="orderBtn">
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
