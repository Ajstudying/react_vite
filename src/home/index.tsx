import { useEffect, useState } from "react";
import { HomeContainer } from "./styles";

function Home() {
  const [imgListFirst, setImgListFirst] = useState<string[]>([]);
  const [imgListSecond, setImgListSecond] = useState<string[]>([]);

  // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 설정
  useEffect(() => {
    setImgListFirst([
      "https://images.pexels.com/photos/19099383/pexels-photo-19099383.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/29870472/pexels-photo-29870472.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/64774/pexels-photo-64774.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1533512/pexels-photo-1533512.jpeg?auto=compress&cs=tinysrgb&w=600",
    ]);

    setImgListSecond([
      "https://images.pexels.com/photos/3066868/pexels-photo-3066868.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/754261/pexels-photo-754261.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/211073/pexels-photo-211073.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/29855812/pexels-photo-29855812.jpeg?auto=compress&cs=tinysrgb&w=600",
    ]);
  }, []);

  return (
    <HomeContainer>
      <section id="firstImageAreaMain">
        <article>
          {imgListFirst.map((element, index) => (
            <img key={index} src={element} alt="메인사진" className="mainImg" />
          ))}
        </article>
      </section>
      <section id="letterArea">
        <article>
          <p>Hi,</p>
          <p>My name is...</p>
        </article>
        <article>
          <p>This is my profile.</p>
          <p>I hope enjoy this</p>
        </article>
      </section>
      <section id="secondImageAreaMain">
        <article>
          {imgListSecond.map((element, index) => (
            <img key={index} src={element} alt="메인사진" className="mainImg" />
          ))}
        </article>
      </section>
    </HomeContainer>
  );
}

export default Home;
