import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main>
      <section>
        <div>
          <p>nav</p>
        </div>
        <Outlet />
      </section>
    </main>
  );
}

export default Layout;
