import styled from "@emotion/styled";

export const HomeContainer = styled.div`
  #firstImageAreaMain > article {
    display: flex;
  }
  #secondImageAreaMain > article {
    display: flex;
  }
  .mainImg {
    width: 28rem;
    height: 20rem;
  }
  #letterArea {
    display: flex;
    padding: 0, 10rem;
    justify-content: space-evenly;
    margin: 2rem;
  }
  #letterArea > article:nth-of-type(1) {
    font-size: 40px;
    font-weight: bolder;
  }
  #letterArea > article:nth-of-type(2) {
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }
  #letterArea > article:nth-of-type(2) {
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }
`;
