/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "devicon/devicon.min.css";
import "./EditSkill.css";
import { toastContext } from "../../../src/Index.jsx";
import { useEffect, useRef, useState, useContext } from "react";

export default function EditSkill({ skill, efficiency }) {

    const [editEnable, setEditEnable] = useState(false);
    const [value, setValue] = useState(efficiency);
    const allRef = useRef({
        options: null,
        input: null
    })

    const { toast } = useContext(toastContext);

    function handleToggleOptions() {
        let optionStyle = allRef.current.options.style;

        if (optionStyle.display == 'none') optionStyle.display = 'flex';
        else optionStyle.display = 'none';
    }

    function handleEditButton() {
        setEditEnable(true);
        handleToggleOptions();
    }

    function updateEfficiency() {
        if (!editEnable) return;
        if (value < 1 || value > 100) return toast.warning('Value must be in between 1 to 100');
        setEditEnable(false);
        toast.success("Updated");
    }

    useEffect(() => {
        allRef.current.options.style.display = 'none';
    }, [])

    return (
        <div className="editSkill">
            <div className="editSkillContainer" title={skill}>
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
                <div className="editSkillTop">{skill}</div>
                <div className="more">
                    <img src="/Images/icons8-more-24.png" alt="" style={{ transform: 'rotate(90deg)' }} onClick={handleToggleOptions} />
                    <div className="options" ref={el => allRef.current.options = el}>
                        <button onClick={handleEditButton}>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
            <div className="editSkillEfficiency">
                <label htmlFor="efficiency">Efficiency</label>
                <input
                    id="efficiency"
                    type="number"
                    ref={el => allRef.current.input = el}
                    value={value} readOnly={!editEnable}
                    style={{ color: editEnable ? "black" : "gray" }}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={updateEfficiency}
                />
            </div>
        </div>
    );
}
