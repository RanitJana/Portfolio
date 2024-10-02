import axios from "axios";

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const handleUser = async function (adminId) {
  if (!isValidObjectId(adminId))
    return { success: false, message: "Invalid user id" };
  try {
    let user = (
      await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/v1/profile/${adminId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
    ).data.admin;

    console.log(user);

    return user;
  } catch (error) {
    return error.response.data;
  }
};

const handleSkills = async function (adminId) {
  if (!isValidObjectId(adminId)) return [];
  try {
    let skill = (
      await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/v1/skill/${adminId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
    ).data.data;

    return skill;
  } catch (error) {
    return error.response.data;
  }
};

const handleTimeline = async function (adminId) {
  if (!isValidObjectId(adminId)) return [];
  try {
    let timeline = (
      await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/v1/timeline/${adminId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
    ).data.data;

    return timeline;
  } catch (error) {
    return error.response.data;
  }
};

const handleProject = async function (adminId) {
  if (!isValidObjectId(adminId)) return [];
  try {
    let project = (
      await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/v1/project/${adminId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
    ).data.data;

    return project;
  } catch (error) {
    return error.response.data;
  }
};

const handleSingleProject = async function (id) {
  try {
    if (!id) throw new Error();

    let project = (
      await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/v1/project/single/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
    ).data;

    return project;
  } catch (error) {
    return error.response.data;
  }
};

const handleSendMessage = async function (name, content, adminId) {
  try {
    let project = (
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/v1/message/${adminId}`,
        {
          sender: name,
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
    ).data;

    return project;
  } catch (error) {
    return error.response.data;
  }
};

export {
  handleUser,
  handleSkills,
  handleTimeline,
  handleProject,
  handleSendMessage,
  handleSingleProject,
};
