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
`;
