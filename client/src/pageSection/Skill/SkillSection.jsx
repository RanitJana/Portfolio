/* eslint-disable no-unused-vars */

import Skill from "../../components/skills/Skill.jsx";
import "./SkillSection.css";

import { useContext } from "react";
import { globalContext } from "../../App.jsx";

export default function SkillSection() {
  const { skills, sectionRef, isSkillLoading } = useContext(globalContext);

  return (
    <div
      className="skillSection"
      ref={(el) => (sectionRef.current.skillRef = el)}
    >
      <h2>Skills</h2>
      <div className="skills">
        {skills &&
          skills.length > 0 &&
          skills.map((skill, index) => (
            <Skill
              key={index}
              skill={skill.name}
              efficiency={skill.efficiency}
            />
          ))}
      </div>
      {skills && !skills.length ? (
        <div className="noSkill">
          <span>
            As a beginner, I have no coding skills yet, but Im eager to learn
            and grow.
          </span>
          <img src="/Images/icons8-sad-50.png" alt="" style={{}} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
