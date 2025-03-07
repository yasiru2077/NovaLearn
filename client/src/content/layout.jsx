import React from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "./main-navbar/main-navbar";

function Layout({setIsAuthenticated,userDetails,isAuthenticated}) {
  
  
  return (
    <main>
      <section>
        <div>
          <MainNavbar isAuthenticated={isAuthenticated} userDetails={userDetails} setIsAuthenticated={setIsAuthenticated}/>
        </div>
        <Outlet />
      </section>
    </main>
  );
}

export default Layout;
