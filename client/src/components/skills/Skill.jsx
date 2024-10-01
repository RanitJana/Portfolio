/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "devicon/devicon.min.css";
import "./Skill.css";
import { useEffect, useRef, useState } from "react";

export default function Skill({ skill, efficiency }) {
  const [isHover, setHover] = useState(false);

  function handleHover() {
    setHover(true);
  }

  const trackBarRef = useRef(null);

  useEffect(() => {
    let trackBar = trackBarRef.current;
    trackBar.style.right = `${100 - efficiency}%`;
  }, []);

  return (
    <div className="skillBox">
      <div
        className="skillContainer"
        onMouseOver={handleHover}
        onMouseLeave={() => setHover(false)}
        title={skill}
      >
        <i
          className={`
                    devicon-${skill}-plain-wordmark 
                    devicon-${skill}-original-wordmark
                    devicon-${skill}-line-wordmark
                    devicon-${skill}-wordmark
                    devicon-${skill}-plain 
                    devicon-${skill}-original 
                    devicon-${skill}-line 
                    devicon-${skill}
                    ${isHover ? "colored" : ""}
                `}
          style={{ fontSize: 50 }}
        ></i>
      </div>
      <div className="efficiency">
        <div className="top">{skill}</div>
        <div className="bottom">
          <div className="progressBar">
            <div ref={trackBarRef} className="trackBar">
              <div className="animationBar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
