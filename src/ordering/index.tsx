import { useEffect, useState } from "react";
import getDate from "../components/getDate";
import { OrderingContainer } from "./styles";
import "react-datepicker/dist/react-datepicker.css"; // 기본 스타일 import
import Calendar from "../components/Calendar";
import ItemRow from "../components/ItemRow";
import { ItemList, useItemData } from "../itemData";
import { OrderList } from "../orderData";
import OrderRow from "../components/OrderRow";
import SearchBar from "../components/SearchBar";

interface CheckedData {
  [key: number]: boolean; // 체크박스 ID를 키로 하는 boolean 객체
}

function Ordering() {
  const [selectedDate, setSelectedDate] = useState<string | "">("");
  const [itemCheckedData, setItemCheckedData] = useState<CheckedData>({});
  const [orderCheckedData, setOrderCheckedData] = useState<CheckedData>({});
  // const [itemCheckedData, dispatch] = useReducer(itemCheckedDataReducer, {});
  const [selectedItems, setSelectedItems] = useState<ItemList[]>([]); // 선택된 아이템 정보 상태
  const [selectedOrders, setSelectedOrders] = useState<OrderList[]>([]);
  const { itemList, isItemListValidating } = useItemData(selectedDate);
  const [orderData, setOrderData] = useState<OrderList[]>([]);
  const [selectionList, setSelectionList] = useState({
    company: "사업장명",
    title: "상품명",
    id: "상품코드",
  });

  // itemList의 타입 정의
  const safeItemList: ItemList[] = itemList || []; // itemList가 undefined일 경우 빈 배열로 설정

  //날짜를 입력하면 그 날짜를 기준으로 로컬스토리지에 저장하기 때문에 날짜 핸들링 제어
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

  //아이템 리스트에서 체크 토글 핸들링 및 체크 데이터 업데이트
  const handleAddCheckboxChange = (id: number) => {
    setItemCheckedData((prev) => {
      const newItemCheckedData = { ...prev, [id]: !prev[id] }; // 체크 상태 토글
      // 선택된 아이템 업데이트
      if (itemList) {
        const updatedSelectedItems = itemList.filter(
          (item) => item.id !== undefined && newItemCheckedData[item.id] // id가 undefined가 아닐 때만 체크
        );
        setSelectedItems(updatedSelectedItems); // 선택된 아이템 업데이트
        return newItemCheckedData;
      }
      return newItemCheckedData;
    });
  };

  //발주서에서 체크박스 토글 핸들링 및 발주서의 체크 데이터 업데이트
  const handleDeleteCheckboxChange = (id: number) => {
    setOrderCheckedData((prev) => {
      const newOrderCheckedData = { ...prev, [id]: !prev[id] }; // 체크 상태 토글
      // 선택되지 않은 아이템들만 업데이트
      if (orderData) {
        const updatedSelectedItems = orderData.filter(
          (item) => item.id !== undefined && newOrderCheckedData[item.id]
        );
        setSelectedOrders(updatedSelectedItems);
        return newOrderCheckedData;
      }
      return newOrderCheckedData;
    });
  };

  //아이템리스트에서 선택된 애들을 해당 날짜 키로 저장된 로컬스토리지에 저장하기
  const handleUpdateOrderList = async () => {
    // 체크된 아이템만 필터링 확인용
    // const checkedItems = Object.keys(itemCheckedData)
    //   .filter((key) => itemCheckedData[Number(key)]) // true인 값만 필터링
    //   .map((id) => Number(id)); // ID 배열로 변환

    // console.log(checkedItems);
    try {
      const cachedData = localStorage.getItem(selectedDate);
      //먼저 저장된 데이터가 있을 경우 추가하기 위해
      let finalData: ItemList[]; // 블록 스코프 내에서만 유효
      if (cachedData) {
        const parseData = JSON.parse(cachedData);
        finalData = parseData.concat(selectedItems);
        localStorage.setItem(selectedDate, JSON.stringify(finalData));
      } else {
        // 선택된 아이템을 날짜를 키로 하여 localStorage에 저장
        finalData = selectedItems;
        localStorage.setItem(selectedDate, JSON.stringify(selectedItems));
      }

      // OrderData 객체 배열 생성
      const newOrders = finalData.map((item) => {
        return {
          id: item.id,
          title: item.title,
          quantity: 1,
          unit: item.unit,
          price: item.price,
          company: item.company,
          baseQuantity: item.baseQuantity,
        };
      });
      if (newOrders) {
        setOrderData(newOrders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      //itemCheckedData를 모두 false로 초기화
      setItemCheckedData(
        Object.keys(itemCheckedData).reduce<CheckedData>((acc, key) => {
          acc[Number(key)] = false; // 모든 아이템의 체크 상태를 false로 설정
          return acc;
        }, {})
      );
    }
  };

  //로컬스토리지에서 저장된 해당 날짜 데이터에서 선택된 데이터를 제외하고 새로운 데이터로 업데이트 <삭제>
  const handleDeleteOrderList = async () => {
    // 날짜를 키로 사용하는 로컬 스토리지에서 배열 가져오기
    const storedData = localStorage.getItem(selectedDate);

    if (storedData) {
      // JSON 문자열을 배열로 변환
      const orderList = JSON.parse(storedData);
      // selectedOrders가 ID 배열이라고 가정
      const updatedList = orderList.filter(
        (item: { id: number | undefined }) => {
          // item.id가 selectedOrders에 포함되지 않으면 true
          return !selectedOrders.some((order) => order.id === item.id);
        }
      );
      setOrderData(updatedList);
      // 수정된 배열을 다시 로컬 스토리지에 저장
      localStorage.setItem(selectedDate, JSON.stringify(updatedList));
    }
  };

  function searchList(selectedOption: string, inputData: string) {
    const filteredItems = itemList?.filter((item) => {
      // selectedOption에 해당하는 item의 속성 값과 inputData를 비교
      const optionValue = item[selectedOption as keyof ItemList];
      return optionValue && optionValue.toString().includes(inputData); // 포함 여부로 필터링
    });

    // console.log(JSON.stringify(filteredItems) + "필터링"); // 필터링된 결과 확인
    return filteredItems; // 필요에 따라 반환
  }

  const handleSearch = (selectedOption: string, inputData: string) => {
    const results = searchList(selectedOption, inputData); // searchList 호출
    // console.log(JSON.stringify(results, null, 2) + "결과"); // 결과 확인
  };

  //서버 저장
  const handleAddServer = async () => {};

  //날짜에 변경에 맞춰 로컬 스토리지 새로 조회
  useEffect(() => {
    const fetchData = async () => {
      if (selectedDate !== null) {
        const cachedData = localStorage.getItem(selectedDate);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setOrderData(parsedData);
        } else {
          setOrderData([]);
        }
      }
    };

    fetchData(); // 비동기 함수 호출
  }, [selectedDate]);

  //초기 렌더링
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
            <SearchBar selectionList={selectionList} onSubmit={handleSearch} />
            {/* <form action="">
              <select name="" id="">
                <option value="">사업장명</option>
                <option value="">상품명</option>
                <option value="">상품코드</option>
              </select>
              <input type="text" />
              <button className="bg-black text-white font-semibold py-1 px-4 rounded hover:bg-gray-800">
                검색
              </button>
            </form> */}
          </div>
          <div id="orderList">
            <span>발주서</span>
            <span id="toggleCalendar">
              <p>주문일자:</p>
              <Calendar
                onDateChange={handleDateChange}
                selectedDate={selectedDate}
              />
            </span>
            <span>
              <button onSubmit={handleAddServer} className="btn-primary">
                저장
              </button>
            </span>
          </div>
        </section>
        <div id="sectionDiv">
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
                itemCheckedData={itemCheckedData}
                validate={isItemListValidating}
                itemList={safeItemList}
                onChange={handleAddCheckboxChange}
              />
            </table>
          </section>
          <div>
            <button
              id="orderBtn"
              className="border border-white h-12 w-12 rounded-full mt-12 bg-[rgba(180,154,130)] flex justify-center items-center shadow-md hover:shadow-lg active:shadow-inner cursor-pointer transition-all duration-200"
              onClick={handleUpdateOrderList}
            >
              <svg
                className="text-white w-9 h-12 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </button>
            <button
              id="orderBtn"
              className="border border-white h-12 w-12 rounded-full mt-12 bg-[rgba(180,154,130)] flex justify-center items-center shadow-md hover:shadow-lg active:shadow-inner cursor-pointer transition-all duration-200"
              onClick={handleDeleteOrderList}
            >
              <svg
                className="text-white w-9 h-12 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M16 5v14l-11-7z" fill="currentColor" />
              </svg>
            </button>
          </div>
          <section>
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
              <OrderRow
                orderData={orderData}
                orderCheckedData={orderCheckedData}
                onChange={handleDeleteCheckboxChange}
              />
            </table>
          </section>
        </div>
      </div>
    </OrderingContainer>
  );
}

export default Ordering;
