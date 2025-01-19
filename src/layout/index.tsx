import { Suspense, useEffect, useState } from "react";
import ResetStyle from "../styles/reset";
import { LayoutContainer } from "./styles";
import { Link, Outlet } from "react-router-dom";
import Loading from "../components/Loading";

function Layout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 인위적으로 로딩 시간을 늘리기 위해서
    const timer = setTimeout(() => {
      setLoading(false); // 5초 후에 로딩 상태를 false로 변경
    }, 5000); // 5000ms = 5초

    return () => clearTimeout(timer); // 클린업 함수
  }, []);

  return (
    <LayoutContainer>
      <ResetStyle />
      <div id="main">
        {loading && <Loading />}
        <nav>
          <ul id="navigate">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ordering">Order management</Link>
            </li>
            <li>
              <Link to="">Inventory management</Link>
            </li>
            <li>
              <Link to="">Business management</Link>
            </li>
          </ul>
          <div>
            <button>login</button>
          </div>
        </nav>
        <main>
          {/* 세부경로의 컴포넌트들이 로딩위치 */}
          <Suspense fallback={loading && <Loading />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </LayoutContainer>
  );
}

export default Layout;
