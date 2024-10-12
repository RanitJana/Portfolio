import axios from "axios";

async function handleGetOtp(email) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/v1/verify/otp`,
      { email },
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
}

async function handleVerifyOtp(otp) {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/v1/verify/otp/verify`,
      { otp },
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
}

export { handleGetOtp, handleVerifyOtp };
