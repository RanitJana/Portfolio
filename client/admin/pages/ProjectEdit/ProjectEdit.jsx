/* eslint-disable react-hooks/exhaustive-deps */
import "../ProjectAdd/ProjectAdd.css";
import getMarkdownText from "../../utils/ReadmeConverter.js";
import { toastContext } from "../../../src/Index.jsx";
import { handleUpdateProject } from "../../utils/Apis.js";
import { handleSingleProject } from "../../../src/utils/Apis.js";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { verifyIcon, getIconName } from "../../utils/FindSkillIcon.js";
import { useParams } from "react-router-dom";
import AdminSkeleton from "../../components/AdminSkeleton/AdminSkeleton.jsx";

function ProjectEdit() {
  const [info, setInfo] = useState({
    name: "",
    description: "",
    tech: "",
    github: "",
    link: "",
  });

  const { projectId } = useParams();

  const [isLoading, setLoading] = useState(true);

  const [filteredSkills, setFilteredSkills] = useState([]);

  const [selectedSkillInput, setSelectedSkillInput] = useState(0);

  const [selectedImage, setSelectedImage] = useState("");

  const allRefs = useRef({
    previewDescription: null,
    thumbnail: null,
    name: null,
    description: null,
    github: null,
    link: null,
  });

  const [isSubmit, setSubmit] = useState(false);
  const { toast } = useContext(toastContext);

  const updateProject = useCallback(
    async (e) => {
      try {
        e.preventDefault();

        let thumbnail = document.querySelector("#thumbnail").files[0];

        if (!thumbnail && selectedImage == "")
          return toast.warning("Please add an thumbnail of your project");

        if (!info.name || info.name == "") {
          toast.warning("Please give your project name");
          return allRefs.current.name.focus();
        }

        if (!info.description || info.description == "") {
          toast.warning("Please write about your project!");
          return allRefs.current.description.focus();
        }

        for (let i = 0; i < info.tech.length; i++) {
          if (verifyIcon(info.tech[i]) == -1) {
            toast.warning(
              "please choose a valid technology in " + (i + 1) + "th field "
            );
            return document.querySelectorAll(".skillField input")[i].focus();
          }
        }

        if (!info.github || info.github == "") {
          toast.warning("Please provide github link");
          return allRefs.current.github.focus();
        }

        setSubmit(true);

        let formData = new FormData();
        if (thumbnail) formData.append("thumbnail", thumbnail);
        formData.append("name", info.name);
        formData.append("description", info.description);
        formData.append("tech", info.tech.join(","));
        formData.append("github", info.github);
        formData.append("link", info.link);

        const { success, message } = await handleUpdateProject(
          projectId,
          formData
        );

        if (success) toast.success(message);
        else toast.warning(message);
      } catch (error) {
        toast.error(error.message || "Please try again");
      } finally {
        setSubmit(false);
      }
    },
    [info]
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  function handleAddNewTech() {
    if (info.tech[info.tech.length - 1] == "") {
      let inputs = document.querySelectorAll(".skillField input");
      inputs[inputs.length - 1].focus();
      return toast.warning("Please fill the information");
    }
    let newArr = info.tech;
    newArr.push("");
    setInfo((prev) => ({ ...prev, tech: newArr }));
    setTimeout(() => {
      let inputs = document.querySelectorAll(".skillField input");
      inputs[inputs.length - 1].focus();
    }, 0);
  }

  function handleEraseSkill(index) {
    if (info.tech.length == 1)
      return toast.warning("Atleast one tech must be added!");
    let newTech = info.tech;
    newTech.splice(index, 1);
    setInfo((prev) => ({ ...prev, tech: newTech }));
  }

  function handleClear() {
    setSelectedImage("");
    setInfo({
      name: "",
      description: "",
      tech: ["html5"],
      github: "",
      link: "",
    });
  }

  useEffect(() => {
    let box = allRefs.current.description;
    function fixSize() {
      box.style.height = "auto";
      box.style.height = box.scrollHeight + "px";
    }
    if (box) fixSize();
  }, [info.description]);

  useEffect(() => {
    (async () => {
      try {
        let response = (await handleSingleProject(projectId)).data;
        setInfo({
          name: response.name,
          description: response.description,
          tech: response.tech.split(","),
          github: response.github,
          link: response.link,
        });

        setSelectedImage(response.thumbnail);

        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Please try to refresh the page");
      }
    })();
  }, [projectId]);

  if (isLoading) return <AdminSkeleton />;

  return (
    <div className="projectAdd">
      <div className="top">
        <button onClick={() => window.history.back()}>Back</button>
        <h2>Edit project</h2>
      </div>
      <div className="bottom">
        <form onSubmit={updateProject}>
          <div className="previewThumbnail">
            <img src={selectedImage} alt="" />
          </div>

          {/* thumbnail */}
          <label
            htmlFor="thumbnail"
            ref={(el) => (allRefs.current.thumbnail = el)}
            id="thumbnailLabel"
          >
            Upload thumbnail
          </label>
          <input
            readOnly={isSubmit}
            type="file"
            name=""
            id="thumbnail"
            onChange={handleImageChange}
          />

          {/* title */}
          <label htmlFor="name">Project Name</label>
          <input
            readOnly={isSubmit}
            ref={(el) => (allRefs.current.name = el)}
            type="text"
            name=""
            id="name"
            value={info.name}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          {/* previewDescription */}
          <div className="markdown-preview">
            <p>Description Preview</p>
            <div
              dangerouslySetInnerHTML={getMarkdownText(
                info.description || "##### Changes will be reflected here"
              )}
              ref={(el) => (allRefs.current.previewDescription = el)}
            />
          </div>

          {/* description */}
          <label htmlFor="description">
            <span>Project description</span>
            <span style={{ color: "gray", fontSize: "0.8rem" }}> (Readme)</span>
          </label>
          <textarea
            ref={(el) => (allRefs.current.description = el)}
            name=""
            id="description"
            value={info.description}
            onChange={(e) => {
              let preview = allRefs.current.previewDescription;
              setInfo((prev) => ({ ...prev, description: e.target.value }));

              setTimeout(() => {
                preview.scrollTop = preview.scrollHeight; // Scroll to the latest content
              }, 0);
            }}
          ></textarea>

          {/* tech */}
          <label htmlFor="tech">Technology uesd:</label>
          <div className="tech">
            {info.tech.map((val, index) => {
              return (
                <div className="skillField" key={index}>
                  <input
                    readOnly={isSubmit}
                    type="text"
                    name=""
                    id=""
                    value={val}
                    onFocus={() => setSelectedSkillInput(index)}
                    onChange={(e) => {
                      let newArr = info.tech;
                      newArr[index] = e.target.value.trim();
                      setInfo((prev) => ({ ...prev, tech: newArr }));
                      if (e.target.value == "") return setFilteredSkills([]);
                      setFilteredSkills(() => getIconName(e.target.value));
                    }}
                  />

                  <div
                    className="cancel"
                    onClick={() => handleEraseSkill(index)}
                  >
                    <img src="/Images/icons8-add-100.png" alt="" />
                  </div>

                  {index == selectedSkillInput && filteredSkills.length > 0 && (
                    <div className="list">
                      {filteredSkills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="list-item"
                          onClick={() => {
                            let newTech = info.tech;
                            newTech[index] = skill;
                            setInfo((prev) => ({ ...prev, tech: newTech }));
                            return setFilteredSkills([]);
                          }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="addTech" onClick={handleAddNewTech}>
              <img src="/Images/icons8-add-100.png" alt="" width="20" />
            </div>
          </div>

          {/* github */}
          <label htmlFor="github">Github Link</label>
          <input
            readOnly={isSubmit}
            ref={(el) => (allRefs.current.github = el)}
            type="text"
            name=""
            id="github"
            value={info.github}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, github: e.target.value }))
            }
          />

          {/* Deployment */}
          <label htmlFor="deployment">Deployment Link</label>
          <input
            readOnly={isSubmit}
            ref={(el) => (allRefs.current.link = el)}
            type="text"
            name=""
            id="deployment"
            value={info.link}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, link: e.target.value }))
            }
          />

          <div className="buttons">
            <button
              type="reset"
              onClick={() => {
                if (!isSubmit) handleClear();
              }}
            >
              Clear
            </button>
            <button
              type={isSubmit ? "button" : "submit"}
              onClick={(e) => {
                if (isSubmit) e.preventDefault();
              }}
            >
              {isSubmit ? <span className="loader"></span> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectEdit;
