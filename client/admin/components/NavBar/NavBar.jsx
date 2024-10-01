/* eslint-disable no-unused-vars */
import "./NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { handleLogOut } from "../../utils/Apis.js";
import { useState, useContext, useRef, useEffect, useCallback } from "react";
import { toastContext } from "../../../src/Index.jsx";

function NavBar() {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useContext(toastContext);
  const navRef = useRef(null);
  const openRef = useRef(null);

  const navigate = useNavigate();

  async function setLogOut() {
    setLoading(true);
    let { success, message } = await handleLogOut();
    setLoading(false);

    if (success) {
      toast.success(message);
      return navigate("/");
    }
    toast.error(message);
  }

  function handleOpenNav() {
    navRef.current.classList.toggle("navBar--open");
    openRef.current.classList.toggle("rotated");
  }

  const handleResize = useCallback(() => {
    if (window.innerWidth > 740) {
      navRef.current.classList.add("navBar--open");
      openRef.current.classList.add("rotated");
    } else {
      navRef.current.classList.remove("navBar--open");
      openRef.current.classList.remove("rotated");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <div className="navBar" ref={navRef}>
      <div className="dragToOpen" onClick={handleOpenNav}>
        <img ref={openRef} src="/Images/icons8-move-right-48.png" alt="" />
      </div>
      <div className="linkContainers">
        <NavLink
          to={"/admin"}
          end
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          <img src="/Images/icons8-home-48.png" alt="" />
          {/* profilePreview */}
        </NavLink>
        <NavLink
          to={"/admin/project/create"}
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          <img src="/Images/icons8-add-folder-50.png" alt="" />
          {/* projectCreate */}
        </NavLink>
        <NavLink
          to={"/admin/skill/create"}
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          <img src="/Images/icons8-design-100.png" alt="" />
          {/* SKillCreate */}
        </NavLink>
        <NavLink
          to={"/admin/timeline/create"}
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          <img src="/Images/icons8-time-machine-48.png" alt="" />
          {/* TimelineCreate */}
        </NavLink>
        <NavLink
          to={"/admin/message"}
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          <img src="/Images/icons8-message-50 (1).png" alt="" />
          {/* Message */}
        </NavLink>
        <NavLink
          to={"/admin/edit"}
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          <img src="/Images/icons8-user-100.png" alt="" />
          {/* ProfileEdit */}
        </NavLink>
        <button className="logout" onClick={setLogOut}>
          <img src="/Images/icons8-log-out-100.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
