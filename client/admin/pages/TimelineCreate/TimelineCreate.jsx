/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./TimelineCreate.css";
import { useCallback, useContext, useRef, useState } from "react";
import { toastContext } from "../../../src/Index.jsx";
import { useParams } from "react-router-dom";
import { handleAddTimeline } from "../../utils/Apis.js";

function TimelineCreate() {
  const { toast } = useContext(toastContext);
  const { id } = useParams();

  const [isLoading, setLoading] = useState(false);

  const [info, setInfo] = useState({
    title: "",
    description: "",
    from: "",
    to: "",
  });

  const allRefs = useRef({
    title: null,
    description: null,
    from: null,
    to: null,
  });

  function checkInputs() {
    if (info.title == "") {
      toast.warning("Please fill the title field");
      allRefs.current.title.focus();
      return false;
    }
    if (info.from == "") {
      toast.warning("Please fill ethe from field");
      allRefs.current.from.focus();
      return false;
    }
    if (info.to == "") {
      toast.warning("Please fill the to field");
      allRefs.current.to.focus();
      return false;
    }
    if (info.description == "") {
      toast.warning("Please fill the description field");
      allRefs.current.description.focus();
      return false;
    }
    return true;
  }

  const addTimeline = useCallback(
    async (e) => {
      e.preventDefault();

      if (!checkInputs()) return;

      try {
        setLoading(true);
        let data = {
          title: info.title,
          description: info.description,
          from: info.from,
          to: info.to,
        };

        let { success, message } = await handleAddTimeline(data);

        setInfo({
          title: "",
          description: "",
          from: "",
          to: "",
        });

        if (success) toast.success(message);
        else toast.warning(message);
      } catch (error) {
        console.log(error);
        toast.error(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [info.description, info.from, info.title, info.to]
  );

  return (
    <div className="adminTimelineAdd">
      <div className="timelineParent">
        <form onSubmit={addTimeline}>
          <h2>Add a new timeline</h2>

          <label htmlFor="title">Title</label>
          <input
            ref={(el) => (allRefs.current.title = el)}
            type="text"
            name=""
            id="title"
            value={info.title}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Add title"
          />

          <label htmlFor="from">From</label>
          <input
            ref={(el) => (allRefs.current.from = el)}
            type="number"
            name=""
            id="from"
            value={info.from}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, from: e.target.value }))
            }
            placeholder="eg. 2022"
          />

          <label htmlFor="to">To</label>
          <input
            ref={(el) => (allRefs.current.to = el)}
            type="number"
            name=""
            id="to"
            value={info.to}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, to: e.target.value }))
            }
            placeholder="eg. 2024"
          />

          <label htmlFor="description">Description</label>
          <input
            ref={(el) => (allRefs.current.description = el)}
            type="text"
            name=""
            id="description"
            value={info.description}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Add description"
          />

          {isLoading ? (
            <button type="button" onClick={(e) => e.preventDefault()}>
              {" "}
              <span className="loader"></span>{" "}
            </button>
          ) : (
            <button type="submit">Add</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default TimelineCreate;
