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

const handleVerify = async function () {
  try {
    let response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/v1/verify`,
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

export {
  handleLogin,
  handleSignUp,
  handleVerify,
  handleLogOut,
  handleGetMessage,
  handleDeleteMessage,
  handlePostSkill,
};
