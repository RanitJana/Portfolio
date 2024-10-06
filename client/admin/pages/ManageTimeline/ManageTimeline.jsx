/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./ManageTimeline.css";
import TimelineCard from "../../components/TimelineCard/TimelineCard";
import { handleTimeline } from "../../../src/utils/Apis.js";
import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { toastContext } from "../../../src/Index.jsx";
import AdminSkeleton from "../../components/AdminSkeleton/AdminSkeleton.jsx";

function ManageTimeline() {
  const { id } = useParams();

  const { toast } = useContext(toastContext);

  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState(null);

  const getAllTimeline = useCallback(async () => {
    try {
      setLoading(true);
      let data = await handleTimeline(id);
      console.log(data);

      setData(data);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred!");
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    getAllTimeline();
  }, [getAllTimeline, id]);

  if (isLoading) return <AdminSkeleton />;

  return (
    <div className="manageTimeline">
      <div className="top">
        <h2>Timeline</h2>
        <button>Add</button>
      </div>
      <div className="bottom">
        {data && data.length > 0
          ? data.map((val) => {
              return (
                <TimelineCard
                  key={val._id}
                  title={val.title}
                  description={val.description}
                  from={val.from}
                  to={val.to}
                  id={val._id}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default ManageTimeline;
