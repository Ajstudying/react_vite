import styled from "@emotion/styled";

export const OrderingContainer = styled.div`
  #ordering_main {
  }
  #ordering_main > section:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  #ordering_main > section:nth-of-type(2) {
    display: flex;
    gap: 3rem;
  }
  #orderSearch {
    display: flex;
    width: 45%;
    justify-content: space-between;
  }
  #orderList {
    display: flex;
    width: 42%;
    justify-content: space-between;
  }
  #toggleCalendar {
    display: flex;
    gap: 1rem;
  }
  #toggleCalendar > div > button.selected {
    background: none; /* 배경 제거 */
    border: none; /* 테두리 제거 */
    padding: 0; /* 패딩 제거 */
    margin: 0; /* 마진 제거 */
    color: inherit; /* 텍스트 색상 상속 */
    font: inherit; /* 폰트 스타일 상속 */
    cursor: pointer; /* 포인터 커서 유지 */
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  /* #orderBtn {
    border: 1px solid white;
    height: 50px;
    border-radius: 50px;
    margin-top: 50px;
    background-color: rgba(180, 154, 130);
    cursor: pointer;
  }
  svg {
    font-size: 16px;
    color: white;
    width: 38px;
    height: 50px;
    cursor: pointer;
  } */

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }
  /* 짝수수 행의 배경색 */
  /* tr:nth-child(even) {
    background-color: #f9f9f9;
  } */
  /* 홀수 행의 배경색 */
  /* tr:nth-child(odd) {
    background-color: white;
  } */

  caption {
    font-size: 1.5em;
    margin: 10px;
    text-align: start;
  }
  tbody > tr > td:nth-of-type(1) {
    width: 1rem;
  }

  tbody > tr > td:nth-of-type(2) {
    width: 2rem;
  }

  tbody > tr > td:nth-of-type(3) {
    width: 11rem;
  }
  tbody > tr > td:nth-of-type(3) > img {
    width: 100%;
    height: 7rem;
  }

  .calendar-container {
    position: absolute; /* 절대 위치로 설정 */
    z-index: 1000; /* 다른 요소 위에 표시되도록 설정 */
    background: white; /* 배경색 설정 */
    border: 1px solid #ccc; /* 테두리 설정 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    left: -10.5rem;
  }

  .amount {
    display: flex;
    gap: 10px;
    font-size: 15px;
    line-height: 2;
  }
  .amount > input {
    vertical-align: middle;
    height: 38px;
    padding-left: 8px;
  }
  .amount > div {
    /* margin-left: -9px; */
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .amount > div > img {
    cursor: pointer;
  }
`;
