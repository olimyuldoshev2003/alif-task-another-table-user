import React from "react";
import { Link, Outlet } from "react-router-dom";

// Images

const Layout = () => {
  return (
    <>
      <div className="layout_component">
        <header className="header">
          <div className="header_block max-w-[1440px] m-[0_auto] px-[60px] flex  justify-between items-center py-[20px]">
            <div className="block_1_header">
              <Link to={`/`}>
                <img className="w-[60px]" src="" alt="" />
              </Link>
            </div>
            <nav className="navbar">
              <ul className="flex items-center gap-2">
                <li>
                  <Link className="" to={`/`}>
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
            {/* <div className="block_3_header">
             
            </div> */}
          </div>
        </header>
        <Outlet />
        {/* <footer className="footer"></footer> */}
      </div>
    </>
  );
};

export default Layout;
