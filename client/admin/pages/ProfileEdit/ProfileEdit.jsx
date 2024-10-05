import "./ProfileEdit.css";
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../Admin.jsx";
import { toastContext } from "../../../src/Index.jsx";
import AdminSkeleton from "../../components/AdminSkeleton/AdminSkeleton.jsx";
import AdminRole from "../../components/AdminRoles/AdminRole.jsx";
import { handleUpdateProfile } from "../../utils/Apis.js";
import { useParams } from "react-router-dom";

function ProfileEdit() {
  const { user } = useContext(UserContext);

  const { toast } = useContext(toastContext);

  let roleRef = useRef(null);

  const [edible, setEdible] = useState(false);

  const [isSubmit, setSubmit] = useState(false);

  const { id } = useParams();

  const [info, setInfo] = useState({
    name: user?.fullName,
    email: user?.email,
    phone: user?.phoneNumber,
    roles: user?.roles,
    headline: user?.headline,
    about: user?.aboutMe,
    avatar: user?.avatar,
    resume: user?.resume,

    portfolio:
      window.location.href.split("/")[0] +
      "//" +
      window.location.href.split("/")[1] +
      window.location.href.split("/")[2] +
      "/" +
      id,
    linkedin: user?.linkedin,
    github: user?.github,
    instagram: user?.instagram,
    twitter: user?.twitter,
    youtube: user?.youtube,
    facebook: user?.facebook,
  });

  //set text area height into its min-content
  useEffect(() => {
    let textarea = document.querySelectorAll("form>textarea");
    textarea.forEach((val) => {
      val.style.height = "auto";
      val.style.height = `${val.scrollHeight + 8}px`;
    });
  }, [info.headline, info.about]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    for (let i = 0; i < info.roles.length; i++) {
      if (info.roles[i] == "") {
        let allRole = roleRef.current?.querySelectorAll("input");
        let lastRole = allRole[allRole.length - 1];
        lastRole.focus();
        return toast.warning("Every role must be filled");
      }
    }

    setSubmit(true);
    setEdible(false);

    const formData = new FormData();

    // Append the non-file fields
    formData.append("fullName", info.name);
    formData.append("email", info.email);
    formData.append("phoneNumber", info.phone);
    formData.append("roles", JSON.stringify(info.roles));
    formData.append("headline", info.headline);
    formData.append("aboutMe", info.about);
    formData.append("linkedin", info.linkedin);
    formData.append("github", info.github);
    formData.append("instagram", info.instagram);
    formData.append("twitter", info.twitter);
    formData.append("facebook", info.facebook);
    formData.append("youtube", info.youtube);

    // Append the files if present
    const avatarFile = document.getElementById("avatarFile").files[0];
    const resumeFile = document.getElementById("resumeFile").files[0];

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    let { success, message } = await handleUpdateProfile(formData);

    setSubmit(false);

    if (success) toast.success(message);
    else toast.error(message);
  }

  if (!user) return <AdminSkeleton />;

  return (
    <div className="profileEdit">
      <h2>Profile</h2>
      <div className="imgResume">
        <div className="img">
          <span>Profile Image</span>
          <img
            src={info.avatar || "/Images/developer_5813665.png"}
            alt="Avater"
          />
          {edible ? (
            <>
              <label htmlFor="avatarFile">Upload Avatar</label>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="resume">
          <span>Resume</span>
          <img
            src={info.resume || "/Images/resume-eg.png"}
            alt="Resume"
            onClick={() =>
              window.open(info.resume || "/Images/resume-eg.png", "_blank")
            }
          />
          {edible ? (
            <>
              <label htmlFor="resumeFile">Upload Resume</label>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="info">
        <form onSubmit={handleFormSubmit}>
          <input
            type="file"
            accept="image/*"
            name=""
            id="avatarFile"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setInfo((prev) => ({
                  ...prev,
                  avatar: URL.createObjectURL(file),
                }));
              }
            }}
          />
          <input
            type="file"
            accept="image/*"
            name=""
            id="resumeFile"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setInfo((prev) => ({
                  ...prev,
                  resume: URL.createObjectURL(file),
                }));
              }
            }}
          />
          <label htmlFor="name">Full Name</label>
          <input
            readOnly={!edible}
            style={{ color: edible ? "black" : "gray" }}
            type="text"
            name="name"
            id="name"
            value={info.name}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <label htmlFor="email">Email</label>
          <input
            readOnly={!edible}
            style={{ color: edible ? "black" : "gray" }}
            type="email"
            name="email"
            id="email"
            value={info.email}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <label htmlFor="number">Phone Number</label>
          <input
            readOnly={!edible}
            style={{ color: edible ? "black" : "gray" }}
            type="number"
            name="number"
            id="number"
            value={info.phone}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, phone: e.target.value }))
            }
          />

          <label htmlFor="roles">
            Roles{" "}
            <span style={{ color: "gray", fontSize: "0.7rem" }}>
              (max 30char each box)
            </span>
          </label>
          <AdminRole
            roles={info.roles}
            edible={edible}
            setInfo={setInfo}
            toast={toast}
            roleRef={roleRef}
          />

          <label htmlFor="headline">Headline</label>
          <textarea
            readOnly={!edible}
            style={{ color: edible ? "black" : "gray" }}
            name="headline"
            id="headline"
            value={info.headline}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, headline: e.target.value }))
            }
          ></textarea>

          <label htmlFor="about">About</label>
          <textarea
            readOnly={!edible}
            style={{ color: edible ? "black" : "gray" }}
            name="about"
            id="about"
            value={info.about}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, about: e.target.value }))
            }
          ></textarea>

          {/* socical media */}
          <label htmlFor="portfolio">Portfolio</label>
          <input
            style={{ color: "gray" }}
            type="text"
            name="name"
            id="portfolio"
            value={info.portfolio}
            readOnly
          />

          <label htmlFor="linkedin">
            {" "}
            <img src="/Images/linkedin.png" alt="" width={25} /> Linkedin
          </label>
          <input
            readOnly={!edible}
            style={{ color: edible ? "black" : "gray" }}
            type="text"
            name="linkedin"
            id="linkedin"
            value={info.linkedin}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, linkedin: e.target.value }))
            }
          />

          <label htmlFor="github">
            <img src="/Images/github.png" alt="" width={25} /> Github
          </label>
          <input
            readOnly={!edible}
            style={{ color: edible ? "black" : "gray" }}
            type="text"
            name="github"
            id="github"
            value={info.github}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, github: e.target.value }))
            }
          />

          <label htmlFor="instagram">
            <img src="/Images/instagram.png" alt="" width={25} /> Instagram
          </label>
          <input
            readOnly={!edible}
            style={{ color: edible ? "black" : "gray" }}
            type="text"
            name="instagram"
            id="instagram"
            value={info.instagram}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, instagram: e.target.value }))
            }
          />

          <label htmlFor="twitter">
            <img src="/Images/twitter.png" alt="" width={25} /> Twitter
          </label>
          <input
            readOnly={!edible}
            style={{ color: edible ? "black" : "gray" }}
            type="text"
            name="twitter"
            id="twitter"
            value={info.twitter}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, twitter: e.target.value }))
            }
          />

          <label htmlFor="facebook">
            <img src="/Images/facebook.png" alt="" width={25} /> Facebook
          </label>
          <input
            readOnly={!edible}
            style={{ color: edible ? "black" : "gray" }}
            type="text"
            name="facebook"
            id="facebook"
            value={info.facebook}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, facebook: e.target.value }))
            }
          />
          <div className="buttons">
            {edible ? (
              <button type="submit">Save</button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (!isSubmit) setEdible(true);
                }}
              >
                {isSubmit ? <span className="loader"></span> : "Edit"}
              </button>
            )}
            {edible && !isSubmit ? (
              <button type="button" onClick={() => setEdible(false)}>
                Cancel
              </button>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEdit;
