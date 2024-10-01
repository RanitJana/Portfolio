/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "devicon/devicon.min.css";
import { useEffect, useRef } from "react";

export default function AdminSkills({ skill, efficiency }) {
  const trackBarRef = useRef(null);

  useEffect(() => {
    let trackBar = trackBarRef.current;
    trackBar.style.right = `${100 - efficiency}%`;
  }, []);

  return (
    <div className="skillBox">
      <div className="skillContainer" title={skill}>
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
                    colored
                `}
          style={{ fontSize: 50 }}
        ></i>
      </div>
      <div className="efficiency">
        <div className="top">{skill}</div>
        <div className="bottom">
          <div className="progressBar">
            <div ref={trackBarRef} className="trackBar"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
