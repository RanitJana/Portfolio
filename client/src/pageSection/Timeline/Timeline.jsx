/* eslint-disable no-unused-vars */
import "./Timeline.css";
import TimelinePart from "../../components/timeline/TimelinePart.jsx";
import { useContext } from "react";
import { globalContext } from "../../App.jsx";

function Timeline() {
  const { timeline, sectionRef, isTimelineLoading } = useContext(globalContext);

  let defaultAbout =
    "I've started coding today, and it feels like the beginning of an exciting journey. With every line of code, I’m unlocking new possibilities and challenging myself to think differently. I know there’s a lot to learn, but I’m ready to dive in, make mistakes, and grow from them. Today's just the start, and I can't wait to see where this path takes me.";

  return (
    <div
      className="timeline"
      ref={(el) => (sectionRef.current.timelineRef = el)}
    >
      <h1>Timeline</h1>
      <div className="path">
        {timeline && timeline.length ? (
          timeline.map((value, index) => {
            return (
              <TimelinePart
                key={index}
                title={value.title}
                start={value.from}
                end={
                  new Date().getFullYear() == value.to ? "Present" : value.to
                }
                about={value.description}
              />
            );
          })
        ) : (
          <TimelinePart
            title={"Coding"}
            start={new Date().getFullYear()}
            end={"Present"}
            about={defaultAbout}
          />
        )}
      </div>
    </div>
  );
}

export default Timeline;
