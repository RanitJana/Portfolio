/* eslint-disable react-hooks/exhaustive-deps */
import "./ManageTimeline.css";
import TimelineCard from "../../components/TimelineCard/TimelineCard";
import { handleTimeline } from "../../../src/utils/Apis.js";
import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { toastContext } from "../../../src/Index.jsx";
import AdminSkeleton from "../../components/AdminSkeleton/AdminSkeleton.jsx";
import TimelineCreate from "../../components/TimelineCreate/TimelineCreate.jsx";

function ManageTimeline() {
  const { id } = useParams();

  const { toast } = useContext(toastContext);

  const [isLoading, setLoading] = useState(false);
  const [isAddOpen, setAddOpen] = useState(false);
  const [newTimeline, setNewTimeline] = useState(false);

  const [data, setData] = useState(null);
  const [deleteTimeline, setDeleteTimeline] = useState(false);

  const getAllTimeline = useCallback(async () => {
    try {
      setLoading(true);
      let data = await handleTimeline(id);

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
  }, [getAllTimeline, id, deleteTimeline, newTimeline]);

  if (isLoading) return <AdminSkeleton />;

  return (
    <div className="manageTimeline">
      {isAddOpen ? (
        <TimelineCreate
          setAddOpen={setAddOpen}
          setNewTimeline={setNewTimeline}
        />
      ) : (
        ""
      )}
      <div className="top">
        <h2>Timeline</h2>
        <button
          onClick={() => setAddOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.25rem",
          }}
        >
          <img
            src="/Images/icons8-add-100.png"
            alt=""
            width={20}
            style={{ filter: "invert(100%)" }}
          />
          <span>Add</span>
        </button>
      </div>
      <div className="bottom">
        {data && data.length > 0 ? (
          data.map((val) => {
            return (
              <TimelineCard
                key={val._id}
                title={val.title}
                description={val.description}
                from={val.from}
                to={val.to}
                id={val._id}
                setDeleteTimeline={setDeleteTimeline}
              />
            );
          })
        ) : (
          <p className="noTimeline" style={{ paddingTop: "1rem" }}>
            <span>No Timeline is found</span>
            <button
              onClick={() => setAddOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.25rem",
              }}
            >
              <img
                src="/Images/icons8-add-100.png"
                alt=""
                width={20}
                style={{ filter: "invert(100%)" }}
              />
              <span>Add</span>
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default ManageTimeline;
