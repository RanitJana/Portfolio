/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import "./ProjectAdd.css";
import { toastContext } from "../../../src/Index.jsx";
import { handlePostProject } from "../../utils/Apis.js";
import { useCallback, useContext, useEffect, useState } from "react";

function ProjectAdd() {

  const [info, setInfo] = useState(
    {
      name: "",
      description: "",
      tech: "",
      github: "",
      link: ""
    }
  );
  const { toast } = useContext(toastContext);

  const addProject = useCallback(async (e) => {
    try {
      e.preventDefault();

      // if(!name)
      let data = {};

      let response = await handlePostProject(data);

    } catch (error) {
      toast.error(error.message || "Please try again")
    }
  }, [])


  return (
    <div className="projectAdd">
      <div className="top"></div>
      <div className="bottom">
        <form onSubmit={addProject}>

          {/* thumbnail */}
          <label htmlFor="thumbnail">Upload thumbnail</label>
          <input type="file" name="" id="thumbnail" />

          {/* title */}
          <label htmlFor="name">Project Name</label>
          <input type="text" name="" id="name" value={info.name} onChange={e => setInfo(prev => ({ ...prev, name: e.target.value }))} />

          {/* description */}
          <label htmlFor="description">Project description</label>
          <textarea name="" id="description" value={info.description} onChange={e => setInfo(prev => ({ ...prev, description: e.target.value }))} ></textarea>

          {/* tech */}

          {/* github */}
          <label htmlFor="github">Github Link</label>
          <input type="text" name="" id="github" value={info.github} onChange={e => setInfo(prev => ({ ...prev, github: e.target.value }))} />

          {/* Deployment */}
          <label htmlFor="deployment">Deployment Link</label>
          <input type="text" name="" id="deployment" value={info.link} onChange={e => setInfo(prev => ({ ...prev, link: e.target.value }))} />

        </form>
      </div>
    </div>
  )
}

export default ProjectAdd;
