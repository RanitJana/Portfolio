/* eslint-disable no-unused-vars */
import "./NavBar.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { handleLogOut } from "../../utils/Apis.js";
import { useState, useContext, useRef, useEffect, useCallback } from "react";
import { toastContext } from "../../../src/Index.jsx";

function NavBar() {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useContext(toastContext);
  const navRef = useRef(null);
  const openRef = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();

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
          to={`/admin/${id}`}
          end
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          <img src="/Images/icons8-home-48.png" alt="" />
          {/* profilePreview */}
        </NavLink>
        <NavLink
          to={`/admin/${id}/project/manage`}
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          <img src="/Images/icons8-add-folder-50.png" alt="" />
          {/* projectCreate */}
        </NavLink>
        <NavLink
          to={`/admin/${id}/skill/manage`}
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          <img src="/Images/icons8-design-100.png" alt="" />
          {/* SKillCreate */}
        </NavLink>
        <NavLink
          to={`/admin/${id}/timeline/manage`}
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          <img src="/Images/icons8-delivery-time-48.png" alt="" />
          {/* TimelineCreate */}
        </NavLink>
        <NavLink
          to={`/admin/${id}/message`}
          className={({ isActive }) => (isActive ? "activeNav" : "")}
        >
          <img src="/Images/icons8-message-50 (1).png" alt="" />
          {/* Message */}
        </NavLink>
        <NavLink
          to={`/admin/${id}/edit`}
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
