import "./Nav.css";
import { globalContext } from "../../App.jsx";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const { sectionRef } = useContext(globalContext);

  function scrollToView(ref) {
    if (!ref) return;
    const y = ref.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y - 25, behavior: "smooth" });
  }

  const [text, setText] = useState("");
  const textRef = useRef(null);

  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li
          onMouseLeave={() => {
            textRef.current.style.opacity = 0;
          }}
          onMouseOver={() => {
            textRef.current.style.opacity = 1;
            setText("Home");
          }}
          onClick={() => navigate("/")}
        >
          <img src="/Images/icons8-home-48.png" alt="" />
        </li>
        <li
          onMouseLeave={() => {
            textRef.current.style.opacity = 0;
          }}
          onMouseOver={() => {
            textRef.current.style.opacity = 1;
            setText("Timeline");
          }}
          onClick={() => scrollToView(sectionRef.current.timelineRef)}
        >
          <img src="/Images/icons8-timeline-50.png" alt="" />
        </li>
        <li
          onMouseLeave={() => {
            textRef.current.style.opacity = 0;
          }}
          onMouseOver={() => {
            textRef.current.style.opacity = 1;
            setText("About");
          }}
          onClick={() => scrollToView(sectionRef.current.aboutRef)}
        >
          <img src="/Images/icons8-about-me-50.png" alt="" />
        </li>
        <li
          onMouseLeave={() => {
            textRef.current.style.opacity = 0;
          }}
          onMouseOver={() => {
            textRef.current.style.opacity = 1;
            setText("Skills");
          }}
          onClick={() => scrollToView(sectionRef.current.skillRef)}
        >
          <img src="/Images/icons8-skills-50.png" alt="" />
        </li>
        <li
          onMouseLeave={() => {
            textRef.current.style.opacity = 0;
          }}
          onMouseOver={() => {
            textRef.current.style.opacity = 1;
            setText("Projects");
          }}
          onClick={() => scrollToView(sectionRef.current.projectRef)}
        >
          <img src="/Images/icons8-projects-50.png" alt="" />
        </li>
        <li
          onMouseLeave={() => {
            textRef.current.style.opacity = 0;
          }}
          onMouseOver={() => {
            textRef.current.style.opacity = 1;
            setText("Contact");
          }}
          onClick={() => scrollToView(sectionRef.current.contactRef)}
        >
          <img src="/Images/icons8-contact-50.png" alt="" />
        </li>
      </ul>
      <div ref={textRef} className="text">
        {text.length > 0 ? text : ""}
      </div>
    </nav>
  );
}

export default Nav;
