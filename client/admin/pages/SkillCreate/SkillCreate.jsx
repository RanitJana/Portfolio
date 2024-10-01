/* eslint-disable react-hooks/exhaustive-deps */
import "./SkillCreate.css";
import { useContext, useEffect, useState } from "react";
import { toastContext } from "../../../src/Index.jsx";
import { handlePostSkill } from "../../utils/Apis.js";
import { getIconName, verifyIcon } from "../../utils/FindSkillIcon.js";

function SkillCreate() {
  const { toast } = useContext(toastContext);

  const [isAdd, setAdd] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    efficiency: "",
  });
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [previewImage, setPreviewImage] = useState("");

  async function postSkill() {
    if (info.name === "") return toast.warning("Please select a skill");
    if (info.efficiency === "") return toast.warning("Please add efficiency");

    if (verifyIcon(info.name) == -1)
      return toast.warning("Please choose an skill from list");
    if (info.efficiency > 100 || info.efficiency < 1) {
      setInfo((prev) => ({ ...prev, efficiency: "" }));
      return toast.warning("Range must between 1 to 100");
    }
    try {
      setAdd(true);
      let response = await handlePostSkill(info.name, info.efficiency);
      toast.success(response.message);
      setInfo(() => ({ efficiency: "", name: "" }));
    } catch (error) {
      toast.error(`${error.message || "Please try again"}`);
    } finally {
      setAdd(false);
    }
  }

  const [click, setClick] = useState(false);

  const handleSkillClick = (skill) => {
    setClick(true);
    setPreviewImage(skill);
    setInfo((prev) => ({ ...prev, name: skill }));
    setFilteredSkills([]);
  };

  useEffect(() => {
    if (info.name.length == 0 || click) {
      setClick(false);
      return setFilteredSkills([]);
    }
    setPreviewImage("");
    let getIconNameRef = setTimeout(() => {
      clearTimeout(getIconNameRef);
      setFilteredSkills(getIconName(info.name));
    }, 500);

    return () => {
      clearTimeout(getIconNameRef);
    };
  }, [info.name]);

  return (
    <div className="skillCreate">
      <div className="container">
        <h2>Add a new skill</h2>
        <div className="skillImagePreview">
          {previewImage == "" ? (
            <span style={{ color: "gray", cursor: "default" }}>
              Choose an skill
            </span>
          ) : (
            <i
              className={`
            devicon-${previewImage}-plain-wordmark 
            devicon-${previewImage}-original-wordmark
            devicon-${previewImage}-line-wordmark
            devicon-${previewImage}-wordmark
            devicon-${previewImage}-plain 
            devicon-${previewImage}-original 
            devicon-${previewImage}-line 
            devicon-${previewImage}
            colored
            `}
              style={{ fontSize: 50 }}
            ></i>
          )}
        </div>
        <div className="title">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={info.name}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Eg. cplusplus"
          />
          {filteredSkills.length > 0 && (
            <div className="list">
              {filteredSkills.map((skill, index) => (
                <div
                  key={index}
                  className="list-item"
                  onClick={() => handleSkillClick(skill)}
                >
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="efficiency">
          <label htmlFor="efficiency">Efficiency</label>
          <input
            type="number"
            id="efficiency"
            value={info.efficiency}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, efficiency: e.target.value }))
            }
            placeholder="Eg. 86"
            min={1}
            max={100}
          />
        </div>
        <button
          onClick={() => {
            if (!isAdd) postSkill();
          }}
        >
          {isAdd ? <span className="loader"></span> : "Add Skill"}
        </button>
      </div>
    </div>
  );
}

export default SkillCreate;
