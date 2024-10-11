/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import "./ProjectCard.css";
import getMarkdownText from "../../utils/ReadmeConverter.js";
import { useCallback, useState } from "react";
import { handleDeleteProject } from "../../utils/Apis.js";

export default function ProjectCard({
  name = "",
  thumbnail = "",
  _id = "",
  description = "",
  toast,
  setDeleted,
}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isOpenOption, setOpenOption] = useState(false);

  const [isDeleting, setDeleting] = useState(false);

  const deleteProject = useCallback(async () => {
    try {
      setDeleting(true);

      let { success, message } = await handleDeleteProject(_id);
      if (success) {
        setDeleted((prev) => !prev);
        toast.success(message);
      } else toast.warning(message);
    } catch (error) {
      toast.error(error.message || "An error occurred!");
    } finally {
      setDeleting(false);
    }
  }, [_id]);

  return (
    <div className="projectCard">
      <div
        className="img"
        onClick={() => navigate(`/admin/${id}/project/manage/${_id}/show`)}
        title="View project"
      >
        <img src={thumbnail} alt="" />
      </div>
      <div className="content">
        <div className="title">
          <div className="name">{name}</div>
          <div className="options">
            <img
              src="/Images/icons8-more-24.png"
              alt="options"
              onClick={() => setOpenOption((prev) => !prev)}
            />
            <div className="more">
              {isOpenOption ? (
                <>
                  <button
                    onClick={() =>
                      navigate(`/admin/${id}/project/manage/${_id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (!isDeleting) deleteProject();
                    }}
                  >
                    {isDeleting ? <span className="loader"></span> : "Delete"}
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div
          className="description"
          dangerouslySetInnerHTML={getMarkdownText(description)}
        />
      </div>
    </div>
  );
}
