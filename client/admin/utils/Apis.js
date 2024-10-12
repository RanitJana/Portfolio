import axios from "axios";

const handleLogin = async function (emailOrPhone, password) {
  try {
    let response = (
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/v1/login`,
        { emailOrPhone, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
    ).data;

    return response;
  } catch (error) {
    return error.response.data;
  }
};

const handleSignUp = async function (
  fullName,
  email,
  phoneNumber,
  password,
  confirmPassword
) {
  try {
    let response = (
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/v1/signup`,
        { fullName, email, phoneNumber, password, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
    ).data;

    return response;
  } catch (error) {
    return error.response.data;
  }
};

const handleVerify = async function (id) {
  try {
    let response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/v1/verify`,
      {
        headers: {
          "Content-Type": "application/json",
          id: id,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const handleLogOut = async function () {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/v1/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const handleGetMessage = async function () {
  try {
    let response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/v1/message`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const handleDeleteMessage = async function (messageId) {
  if (!messageId) return;
  try {
    let response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URI}/v1/message`,
      {
        headers: {
          "Content-Type": "application/json",
          _id: messageId,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const handlePostSkill = async function (name, efficiency) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/v1/skill`,
      { name, efficiency },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const handleUpdateSkill = async function (id, efficiency) {
  try {
    let response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URI}/v1/skill`,
      { efficiency },
      {
        headers: {
          "Content-Type": "application/json",
          _id: id,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const handleDeleteSkill = async function (id) {
  try {
    let response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URI}/v1/skill`,
      {
        headers: {
          "Content-Type": "application/json",
          _id: id,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const handleUpdateProfile = async function (formData) {
  try {
    let response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URI}/v1/profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

const handleAddTimeline = async function (data) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/v1/timeline`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};

const handleUpdateTimeline = async function (title, description, from, to, id) {
  try {
    let response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URI}/v1/timeline`,
      {
        title,
        description,
        from,
        to,
      },
      {
        headers: {
          "Content-Type": "application/json",
          _id: id,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const handleDeleteTimeline = async function (id) {
  try {
    let response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URI}/v1/timeline`,
      {
        headers: {
          "Content-Type": "application/json",
          _id: id,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const handlePostProject = async function (data) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/v1/project`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const handleDeleteProject = async function (_id) {
  try {
    let response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URI}/v1/project`,
      {
        headers: {
          "Content-Type": "application/json",
          _id: _id,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const handleUpdateProject = async function (projectId, data) {
  try {
    let response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URI}/v1/project`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          _id: projectId,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const handleUpdatePassword = async function (data) {
  try {
    let response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URI}/v1/password`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

export {
  handleLogin,
  handleSignUp,
  handleVerify,
  handleLogOut,
  handleGetMessage,
  handleDeleteMessage,
  handlePostSkill,
  handleUpdateSkill,
  handleDeleteSkill,
  handleUpdateProfile,
  handleAddTimeline,
  handleUpdateTimeline,
  handleDeleteTimeline,
  handlePostProject,
  handleDeleteProject,
  handleUpdateProject,
  handleUpdatePassword,
};
