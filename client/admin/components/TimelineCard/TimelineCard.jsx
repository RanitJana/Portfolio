/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./TimelineCard.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { handleUpdateTimeline } from "../../utils/Apis.js";
import { toastContext } from "../../../src/Index.jsx";

function TimelineCard({ title, description, from, to, id }) {
  const [edible, setEdible] = useState(false);

  const [data, setData] = useState({ title, description, from, to, id });

  const [isSubmit, setSubmit] = useState(false);

  const { toast } = useContext(toastContext);

  const allRefs = useRef({
    title: null,
    description: null,
    from: null,
    to: null,
  });

  // for edit section
  useEffect(() => {
    if (!edible) return;

    function handleFixHeight() {
      let descriptionElement = allRefs.current.description;
      descriptionElement.style.height = "auto";
      descriptionElement.style.height = `${descriptionElement.scrollHeight + 8}px`;
    }

    handleFixHeight();

    window.addEventListener("resize", handleFixHeight);

    return () => {
      window.removeEventListener("resize", handleFixHeight);
    };
  }, [allRefs.description, data.description, edible]);

  const updateTimeline = useCallback(async () => {
    if (data.title == "") {
      toast.warning("Fill all the fields");
      return allRefs.current.title.focus();
    }
    if (data.description == "") {
      toast.warning("Fill all the fields");
      return allRefs.current.description.focus();
    }
    if (data.from == "") {
      toast.warning("Fill all the fields");
      return allRefs.current.from.focus();
    }
    if (data.to == "") {
      toast.warning("Fill all the fields");
      return allRefs.current.to.focus();
    }

    try {
      setSubmit(true);

      let { success, message } = await handleUpdateTimeline(
        data.title,
        data.description,
        data.from,
        data.to,
        data.id
      );

      if (success) toast.success(message);
      else toast.warning(message);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred");
    } finally {
      setSubmit(false);
    }
  }, [data.from, data.id, data.title, data.description, data.to]);

  return (
    <div className="timelineCard">
      {edible ? (
        <>
          <label htmlFor="title">Title</label>
          <input
            ref={(el) => (allRefs.current.title = el)}
            type="text"
            id="title"
            className="title"
            value={data.title}
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <p>
            <label htmlFor="from">From</label>
            <input
              ref={(el) => (allRefs.current.from = el)}
              type="number"
              name=""
              id="from"
              className="from"
              value={data.from}
              onChange={(e) =>
                setData((prev) => ({ ...prev, from: e.target.value }))
              }
            />
            <label htmlFor="to">To</label>
            <input
              ref={(el) => (allRefs.current.to = el)}
              type="number"
              name=""
              id="to"
              className="to"
              value={data.to}
              onChange={(e) =>
                setData((prev) => ({ ...prev, to: e.target.value }))
              }
            />
          </p>
          <label htmlFor="description">Description</label>
          <textarea
            ref={(el) => (allRefs.current.description = el)}
            name=""
            id="description"
            value={data.description}
            onChange={(e) =>
              setData((prev) => ({ ...prev, description: e.target.value }))
            }
          ></textarea>
          <div className="buttons">
            <button
              onClick={() => {
                if (!isSubmit) updateTimeline();
              }}
            >
              {isSubmit ? <span className="loader"></span> : "Save"}
            </button>
            {!isSubmit ? (
              <button onClick={() => setEdible(false)}>Cancel</button>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <div className="show">
          <div className="title">{data.title}</div>
          <span className="duration">
            <span>{data.from}</span>-<span>{data.to}</span>
          </span>

          <div className="description">{data.description}</div>
          <div className="buttons">
            <button onClick={() => setEdible(true)}>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimelineCard;
