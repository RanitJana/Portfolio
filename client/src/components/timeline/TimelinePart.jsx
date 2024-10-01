/* eslint-disable react/prop-types */
import "./TimelinePart.css";

function TimelinePart({ title, start, end, about }) {
  return (
    <div className="timelinePart">
      <div className="details">
        <div className="title">
          <h3>{title}</h3>
        </div>
        <div className="duration">
          {start}-{end}
        </div>
        <div className="about">{about}</div>
      </div>
      <div className="achievmentImage">
        <img src="/Images/achievement.png" alt="O" />
      </div>
    </div>
  );
}

export default TimelinePart;
