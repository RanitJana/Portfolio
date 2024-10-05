/* eslint-disable react-refresh/only-export-components */
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastContext = createContext();
export { toastContext };

function Index() {
  return (
    <toastContext.Provider value={{ toast }}>
      <ToastContainer
        theme="dark"
        autoClose={1000}
        closeOnClick
        transition:Zoom
      />
      <Outlet />
    </toastContext.Provider>
  );
}

export default Index;
