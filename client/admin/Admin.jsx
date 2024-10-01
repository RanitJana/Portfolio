/* eslint-disable react-hooks/exhaustive-deps */
import "./Admin.css";
import { useEffect, useState, createContext } from "react";
import { handleVerify } from "./utils/Apis.js";
import { Outlet, useNavigate } from "react-router-dom";
import { handleUser } from "../src/utils/Apis.js";

import VerifyLoading from "./components/VerifyLoading/VerifyLoading.jsx";
// import getCookieValue from "./utils/GetCookieId.js";
import Cookies from 'js-cookie';

const UserContext = createContext();
export { UserContext };

function Admin() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  let id = Cookies.get('id');
  id = id ? JSON.parse(id)?.id : null;

  useEffect(() => {
    async function checkVerify() {
      try {
        setLoading(true);

        let validity = await handleVerify();

        if (!validity.success) navigate("/login");
        let newUser = await handleUser(id);
        setUser(newUser);
        // if (id) {
        // }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    checkVerify();
  }, []);

  return (
    <div className="admin">
      {isLoading ? (
        <VerifyLoading />
      ) : (
        <UserContext.Provider value={{ user, id }}>
          <Outlet />
        </UserContext.Provider>
      )}
    </div>
  );
}

export default Admin;
