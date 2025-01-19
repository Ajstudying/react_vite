import Lottie from "lottie-react";
import animationData from "../lottie/Animation - 1737290833634.json";

const Loading = () => {
  return (
    <div id="loading">
      <Lottie
        animationData={animationData}
        style={{ width: "200px", height: "200px" }}
      />
    </div>
  );
};

export default Loading;
