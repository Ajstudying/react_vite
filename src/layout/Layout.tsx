import { Suspense } from "react";
import ResetStyle from "../styles/reset";
import { LayoutContainer } from "./styles";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <LayoutContainer>
      <ResetStyle />
      <div id="main">
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
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </LayoutContainer>
  );
}

export default Layout;
