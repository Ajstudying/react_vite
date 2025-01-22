import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Home from "./home";
import Ordering from "./ordering";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Home />} index />
          <Route path="ordering" element={<Ordering />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
