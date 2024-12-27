import { OrderingContainer } from "./styles";

function Ordering() {
  return (
    <OrderingContainer>
      <section>
        <div id="orderSearch">
          <caption>발주가능 품목</caption>
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
          <caption>발주서</caption>
          <span id="toggleCalendar">
            <p>주문일자:</p>
            <input type="text" id="datepicker" />
          </span>
        </div>
      </section>
      <section>
        <table></table>
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
    </OrderingContainer>
  );
}

export default Ordering;
