import './ManageSkill.css';
import EditSkill from '../../components/EditSkill/EditSkill.jsx';
import { handleSkills } from '../../../src/utils/Apis.js';
import { toastContext } from '../../../src/Index.jsx';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminSkeleton from '../../components/AdminSkeleton/AdminSkeleton.jsx';

function ManageSkill() {

    const { id } = useParams();

    const { toast } = useContext(toastContext);
    const [isLoading, setLoading] = useState(true);

    const [skills, setSkills] = useState(null);

    useEffect(() => {
        async function getSkills() {
            try {
                setLoading(true);
                let data = await handleSkills(id);

                setSkills(data);
                console.log(data);


            } catch (error) {
                console.log(error);
                toast.error(error?.message || "An Error occurrred");
            }
            finally {
                setLoading(false);
            }
        }
        getSkills();
    }, [id])

    if (isLoading) return <AdminSkeleton />

    return (
        <div className="manageSkill">
            <div className="adminSkills">
                <h2>Skills</h2>
                <ul className="childSkill">
                    {skills?.map((value, index) => (

                        <EditSkill
                            key={index}
                            skill={value.name}
                            efficiency={value.efficiency}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ManageSkill