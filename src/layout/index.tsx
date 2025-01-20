import { Suspense, useEffect, useState } from "react";
import ResetStyle from "../styles/reset";
import { LayoutContainer } from "./styles";
import { Link, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import Footer from "../footer/Footer";

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
          <ul id="navigate" className="flex space-x-4 p-4">
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:bg-brown-700 hover:text-black p-2 rounded transition-all duration-300 text-lg hover:text-xl"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/ordering"
                className="text-gray-700 hover:bg-brown-700 hover:text-black p-2 rounded transition-all duration-300 text-lg hover:text-xl"
              >
                Order management
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="text-gray-700 hover:bg-brown-700 hover:text-black p-2 rounded transition-all duration-300 text-lg hover:text-xl"
              >
                Inventory management
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="text-gray-700 hover:bg-brown-700 hover:text-black p-2 rounded transition-all duration-300 text-lg hover:text-xl"
              >
                Business management
              </Link>
            </li>
          </ul>
          <div>
            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
              login
            </button>
          </div>
        </nav>
        <main>
          {/* 세부경로의 컴포넌트들이 로딩위치 */}
          <Suspense fallback={loading && <Loading />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </LayoutContainer>
  );
}

export default Layout;
