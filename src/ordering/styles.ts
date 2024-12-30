import styled from "@emotion/styled";

export const OrderingContainer = styled.div`
  #ordering_main {
    background-color: floralwhite;
  }
  #ordering_main > section:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
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
  table {
    border-collapse: collapse;
    width: 100%;
  }
  #orderBtn {
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
    width: 38px; /* 아이콘 크기 조정 */
    height: 50px;
    cursor: pointer;
  }

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
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  /* 홀수 행의 배경색 */
  tr:nth-child(odd) {
    background-color: white;
  }

  caption {
    font-size: 1.5em;
    margin: 10px;
    text-align: start;
  }
  tbody > tr > td:nth-of-type(1) {
    width: 3rem;
  }

  tbody > tr > td:nth-of-type(3) {
    width: 11rem;
  }
  tbody > tr > td:nth-of-type(3) > img {
    width: 100%;
    height: 7rem;
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
