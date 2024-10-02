/* eslint-disable react-hooks/exhaustive-deps */
import "./ProfilePreview.css";
import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toastContext } from "../../../src/Index.jsx";
import { UserContext } from "../../Admin.jsx";
import { handleShare } from "../../utils/SharePortfolio.js";
import {
  handleProject,
  handleSkills,
  handleTimeline,
} from "../../../src/utils/Apis.js";
import AdminSkills from "../../components/AdminSkill/AdminSkills.jsx";
import AdminProjects from "../../components/AdminProjects/AdminProjects.jsx";
import AdminTimeline from "../../components/AdminTimeline/AdminTimeline.jsx";
import AdminSkeleton from "../../components/AdminSkeleton/AdminSkeleton.jsx";

function ProfilePreview() {
  const { user, id } = useContext(UserContext);
  const { toast } = useContext(toastContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    project: null,
    skill: null,
    timeline: null,
  });
  const [isLoading, setLoading] = useState(true);

  const getAllData = useCallback(async () => {
    try {
      setLoading(true);
      const [project, skill, timeline] = await Promise.all([
        handleProject(id),
        handleSkills(id),
        handleTimeline(id),
      ]);

      setData({ user, project, skill, timeline });
    } catch (error) {
      console.log(error);
      toast.error("Please try to refresh the page.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  async function sharePortfolio() {
    try {
      let title = `${user?.fullName}'s portfolio`;
      let text = `Checkout my brand new portfolio!`;
      let url = `${window.location.href.replace("/admin", "")}`;
      await handleShare(title, text, url);
      toast.success("Successfully shared.");
    } catch (error) {
      console.log(error);
      toast.error("Error sharing the page");
    }
  }

  useEffect(() => {
    if (id) {
      getAllData();
    }
  }, [id, getAllData]);

  if (isLoading) return <AdminSkeleton />;

  return (
    <div className="profilePreview">
      <div className="adminAbout">
        <div className="headline">
          <span>Headline : </span>
          <span>{user?.headline}</span>
        </div>
        <div className="about">
          <span>About : </span>
          <span>{user?.aboutMe}</span>
        </div>
        <div className="share">
          <button
            className="visitPortfolio"
            onClick={() => navigate(`/${user?._id}`)}
          >
            Visit Portfolio
          </button>
          <img
            src="/Images/icons8-share-50.png"
            alt=""
            onClick={sharePortfolio}
          />
        </div>
      </div>
      <div className="projectCount">
        <span>Project Completed</span>
        <span>{data?.project?.length || 0}</span>
        <button>Manage Projects</button>
      </div>
      <div className="skillCount">
        <span>Skills</span>
        <span>{data?.skill?.length || 0}</span>
        <button>Manage Skills</button>
      </div>
      <AdminProjects project={data?.project} />
      <div className="adminSkills">
        <h2>Skills</h2>
        <ul className="childSkill">
          {data?.skill?.map((value, index) => (
            <AdminSkills
              key={index}
              skill={value.name}
              efficiency={value.efficiency}
            />
          ))}
        </ul>
      </div>
      <AdminTimeline timeline={data?.timeline} />
    </div>
  );
}

export default ProfilePreview;
