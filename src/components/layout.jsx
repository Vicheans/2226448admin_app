import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../support/Header";
import Sidebar from "../support/Sidebar";

export default function Layout() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      
        <Outlet />


      

    </div>
  );
};
