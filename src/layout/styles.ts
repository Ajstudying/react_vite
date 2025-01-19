import styled from "@emotion/styled";

export const LayoutContainer = styled.div`
  #main {
    width: 100%;
    margin: 0;
    padding: 4rem;
    padding-top: 1.5rem;
    padding-bottom: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 600;
    /* overflow: auto; */
  }
  nav {
    display: flex;
    justify-content: space-between;
  }
  #navigate {
    display: flex;
    margin-bottom: 3rem;
    margin-left: 10rem;
    list-style: none;
    gap: 5rem;
  }
  #navigate > li > a {
    text-decoration: none;
    color: black;
  }
  #loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0; /* 실제 그레이스케일 색상 값으로 변경 */
  }
`;
