import "./NavBar.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { handleLogOut } from "../../utils/Apis.js";
import { useContext, useRef, useEffect, useCallback, useState } from "react";
import { toastContext } from "../../../src/Index.jsx";
import VerifyLoading from "../VerifyLoading/VerifyLoading.jsx";

function NavBar() {
  const { toast } = useContext(toastContext);
  const navRef = useRef(null);
  const openRef = useRef(null);
  const blackScreenRef = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoggingOut, setLoggindOut] = useState(false);

  async function setLogOut() {
    try {
      setLoggindOut(true);

      let { message } = await handleLogOut();

      toast.success(message);

      navigate("/");
    } catch (error) {
      toast.error(error.message || "An error occured");
    } finally {
      setLoggindOut(false);
    }
  }

  function handleOpenNav() {
    navRef.current.classList.toggle("navBar--open");
    openRef.current.classList.toggle("rotated");

    if (blackScreenRef.current.style.scale == 1) {
      blackScreenRef.current.style.scale = 0;
    } else {
      blackScreenRef.current.style.scale = 1;
    }
  }

  const handleResize = useCallback(() => {
    blackScreenRef.current.style.scale = 0;

    if (window.innerWidth > 860) {
      navRef.current.classList.add("navBar--open");
      openRef.current.classList.add("rotated");
    } else {
      navRef.current.classList.remove("navBar--open");
      openRef.current.classList.remove("rotated");
    }
  }, []);

  const closeNav = useCallback((e) => {
    if (
      blackScreenRef.current.style.scale === "1" &&
      !navRef.current.contains(e.target)
    ) {
      handleOpenNav();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", closeNav);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", closeNav);
    };
  }, [closeNav, handleResize]);

  if (isLoggingOut) return <VerifyLoading />;

  return (
    <>
      <div className="blackScreen" ref={blackScreenRef}></div>
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
            <span>Home</span>
          </NavLink>
          <NavLink
            to={`/admin/${id}/project/manage`}
            className={({ isActive }) => (isActive ? "activeNav" : "")}
          >
            <img src="/Images/icons8-add-folder-50.png" alt="" />
            <span>Project</span>
          </NavLink>
          <NavLink
            to={`/admin/${id}/skill/manage`}
            className={({ isActive }) => (isActive ? "activeNav" : "")}
          >
            <img src="/Images/icons8-design-100.png" alt="" />
            <span>Skill</span>
          </NavLink>
          <NavLink
            to={`/admin/${id}/timeline/manage`}
            className={({ isActive }) => (isActive ? "activeNav" : "")}
          >
            <img src="/Images/icons8-delivery-time-48.png" alt="" />
            <span>Timeline</span>
          </NavLink>
          <NavLink
            to={`/admin/${id}/message`}
            className={({ isActive }) => (isActive ? "activeNav" : "")}
          >
            <img src="/Images/icons8-message-50 (1).png" alt="" />
            <span>Message</span>
          </NavLink>
          <NavLink
            to={`/admin/${id}/edit`}
            className={({ isActive }) => (isActive ? "activeNav" : "")}
          >
            <img src="/Images/icons8-user-100.png" alt="" />
            <span>Profile</span>
          </NavLink>
          <NavLink
            to={`/admin/${id}/password`}
            className={({ isActive }) => (isActive ? "activeNav" : "")}
          >
            <img src="/Images/icons8-password-100.png" alt="" />
            <span>Password</span>
          </NavLink>
          <button className="logout" onClick={setLogOut}>
            <img src="/Images/icons8-log-out-100.png" alt="" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
