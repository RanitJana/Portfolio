/* eslint-disable react-hooks/exhaustive-deps */
import "./ManageSkill.css";
import EditSkill from "../../components/EditSkill/EditSkill.jsx";
import { handleSkills } from "../../../src/utils/Apis.js";
import { toastContext } from "../../../src/Index.jsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSkeleton from "../../components/AdminSkeleton/AdminSkeleton.jsx";
import SkillCreate from "../../components/SkillCreate/SkillCreate.jsx";

function ManageSkill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { toast } = useContext(toastContext);
  const [isLoading, setLoading] = useState(true);

  const [skills, setSkills] = useState(null);

  const [openAddBox, setAddBox] = useState(false);
  const [updateAfterAdd, setUpdateAfterAdd] = useState(false);

  useEffect(() => {
    async function getSkills() {
      try {
        setLoading(true);
        let data = await handleSkills(id);

        setSkills(data);
      } catch (error) {
        console.log(error);
        toast.error(error?.message || "An Error occurrred");
      } finally {
        setLoading(false);
      }
    }
    getSkills();
  }, [id, updateAfterAdd]);

  if (isLoading) return <AdminSkeleton />;

  return (
    <div className="manageSkill">
      {openAddBox ? (
        <SkillCreate
          setUpdateAfterAdd={setUpdateAfterAdd}
          setAddBox={setAddBox}
        />
      ) : (
        ""
      )}
      <div className="adminSkills">
        <div className="top">
          <h2>Skills</h2>
          <button onClick={() => setAddBox(true)}>Add</button>
        </div>
        {skills && skills.length > 0 ? (
          <ul className="childSkill">
            {skills.map((value, index) => (
              <EditSkill
                key={index}
                id={value._id}
                skill={value.name}
                efficiency={value.efficiency}
              />
            ))}
          </ul>
        ) : (
          <p className="noTimeline">
            <span>No Skill is found</span>
            <button onClick={() => navigate(`/admin/${id}/skill/create`)}>
              Add Skill
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default ManageSkill;
