/* eslint-disable no-unused-vars */
import "./TimelineCreate.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { toastContext } from "../../../src/Index.jsx";
import AdminSkeleton from "../../components/AdminSkeleton/AdminSkeleton.jsx";
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

  const addTimeline = useCallback(async () => {
    try {
      setLoading(true);
      let data = {
        title: info.title,
        description: info.description,
        from: info.from,
        to: info.to,
      };

      let { success, message } = await handleAddTimeline(data);

      if (success) toast.success(message);
      else toast.warning(message);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [info.description, info.from, info.title, info.to, toast]);

  return (
    <div className="adminTimelineAdd">
      <h2>Add a new timeline</h2>
    </div>
  );
}

export default TimelineCreate;
