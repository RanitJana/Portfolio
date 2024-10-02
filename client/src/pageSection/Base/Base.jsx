/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./Base.css";
import { Link } from "react-router-dom";
import { handleUser } from "../../utils/Apis.js";
import BaseSkeleton from "../../skeleton/BaseSkeleton/BaseSkeleton.jsx";

function Base() {
  let profiles = [import.meta.env.VITE_DEFAULT_ADMIN_ID];
  let [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = [];

      let ids = JSON.parse(localStorage.getItem("id")) || {};

      for (let profile of profiles) {
        const admin = await handleUser(String(profile));
        if (admin) {
          fetchedUsers.push(admin);
        }
      }

      for (let key in ids) {
        if (key == import.meta.env.VITE_DEFAULT_ADMIN_ID) continue;
        const admin = await handleUser(String(key));
        if (admin) {
          fetchedUsers.push(admin);
        }
      }

      setUsers(fetchedUsers);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="allProfile">
      <h1>
        <span>Profiles</span>
        <Link to="/login" className="userLogin">
          Login
        </Link>
      </h1>
      {!isLoading ? (
        users?.map((user, index) => (
          <a
            href={`/${user?._id}`}
            key={index}
            className={`singleProfile ${index == 0 ? "owner" : ""}`}
          >
            {" "}
            {/*for typing animation perfect working..*/}
            <div className="img">
              <img
                src={user?.avatar || "/Images/developer_5813665.png"}
                alt=""
              />
            </div>
            <div>
              <div className="name">{user?.fullName}</div>
              <div className="headline">{user?.headline}</div>
            </div>
          </a>
        ))
      ) : (
        <>
          <BaseSkeleton />
          {/* <BaseSkeleton /> */}
        </>
      )}
    </div>
  );
}

export default Base;
