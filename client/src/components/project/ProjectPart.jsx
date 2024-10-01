/* eslint-disable react/prop-types */
import "./ProjectPart.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ProjectPart({
  name = "no title",
  thumbnail,
  description = "no description",
  projectId,
  onClick,
}) {
  const { id } = useParams();

  return (
    <Link
      to={`/${id}/project?id=${projectId}`}
      className="projectPart"
      onClick={onClick}
    >
      <div className="imgContainer">
        <img src={thumbnail} alt={name} title={name} />
      </div>
      <p className="name">{name}</p>
      <p className="description">{description}</p>
    </Link>
  );
}

export default ProjectPart;
